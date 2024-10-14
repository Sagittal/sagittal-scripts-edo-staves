import { Octals, Code } from "staff-code"
import {
    Maybe,
    Index,
    ZERO_ONE_INDEX_DIFF,
    abs,
    isUndefined,
    Word,
    dividesEvenly,
    isEven,
} from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    computeAccidentalSagitype,
    Link,
    Whorl,
    NOMINALS,
    SubsetFactor,
    Nominal,
    EdoStep,
    Edo,
    Spelling,
} from "@sagittal/system"
import { Codewords } from "../types"
import { computeWidth } from "./spacing"
import { computeIsC4 } from "./c4"
import { splitAccents } from "../../../accents"

const REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D: Index<Link> = -17 as Index<Link>

const SZ_SESQUISHARP: Code & Word = "t#" as Code & Word
const SZ_SEMISHARP: Code & Word = "t" as Code & Word
const SZ_SEMIFLAT: Code & Word = "d" as Code & Word
const SZ_SESQUIFLAT: Code & Word = "db" as Code & Word

const LINKS: Record<Index<Link>, Link> = Object.values(Whorl)
    .map((whorl) => NOMINALS.map((nominal) => ({ whorl, nominal })))
    .flat()
    .reduce(
        (
            links: Record<Index<Link>, Link>,
            link: Link,
            index: number,
        ): Record<Index<Link>, Link> => {
            links[
                (index + REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D) as Index<Link>
            ] = link
            return links
        },
        {} as Record<Index<Link>, Link>,
    )

const computePositiveOrNegativeOrNullSagittal = (
    sagittals: Sagittal[],
    sagittalIndex: Index<Sagittal>,
): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return {
            ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF],
            down: true,
        }
    }

    return undefined
}

const computeSagittalCodewords = (
    maybeSagittal: Maybe<Sagittal>,
): (Code & Word)[] =>
    isUndefined(maybeSagittal)
        ? []
        : splitAccents(computeAccidentalSagitype(maybeSagittal))

const computeWhorlCodewords = (
    whorl: Whorl,
    { flavor }: { flavor: Flavor },
): (Code & Word)[] =>
    flavor === Flavor.REVO
        ? []
        : whorl === Whorl.NATURAL
        ? []
        : [whorl as Code & Word]

const handleGeneralSagittalAndWhorlCodewords = ({
    maybeSagittal,
    whorl,
    flavor,
}: {
    maybeSagittal: Maybe<Sagittal>
    whorl: Whorl
    flavor: Flavor
}): {
    sagittalCodewords: (Code & Word)[]
    whorlCodewords: (Code & Word)[]
} => ({
    sagittalCodewords: computeSagittalCodewords(maybeSagittal),
    whorlCodewords: computeWhorlCodewords(whorl, { flavor }),
})

const computeEvoSZSagittalAndWhorlCodewords = ({
    sharpStep,
    sagittalIndex,
    maybeSagittal,
    whorl,
    flavor,
}: {
    sharpStep: EdoStep
    maybeSagittal: Maybe<Sagittal>
    whorl: Whorl
        flavor: Flavor
        sagittalIndex: Index<Sagittal>
}): { sagittalCodewords: (Code & Word)[]; whorlCodewords: (Code & Word)[] } => {
    if (!isEven(sharpStep) || isUndefined(maybeSagittal)) {
        return handleGeneralSagittalAndWhorlCodewords({
            maybeSagittal,
            whorl,
            flavor,
        })
    }

    const isHalfApotome = sharpStep / 2 === abs(sagittalIndex)
    const isHalfSharp: boolean = isHalfApotome && !maybeSagittal.down
    const isHalfFlat: boolean = isHalfApotome && !!maybeSagittal.down

    if (whorl === Whorl.DOUBLE_SHARP && isHalfFlat) {
        return { sagittalCodewords: [], whorlCodewords: [SZ_SESQUISHARP] }
    } else if (whorl === Whorl.SHARP && (isHalfSharp || isHalfFlat)) {
        return {
            sagittalCodewords: [],
            whorlCodewords: isHalfSharp ? [SZ_SESQUISHARP] : [SZ_SEMISHARP],
        }
    } else if (whorl === Whorl.NATURAL && (isHalfSharp || isHalfFlat)) {
        return {
            sagittalCodewords: [],
            whorlCodewords: isHalfSharp ? [SZ_SEMISHARP] : [SZ_SEMIFLAT],
        }
    } else if (whorl === Whorl.FLAT && (isHalfSharp || isHalfFlat)) {
        return {
            sagittalCodewords: [],
            whorlCodewords: isHalfSharp ? [SZ_SEMIFLAT] : [SZ_SESQUIFLAT],
        }
    } else if (whorl === Whorl.DOUBLE_FLAT && isHalfFlat) {
        return { sagittalCodewords: [], whorlCodewords: [SZ_SESQUIFLAT] }
    } else {
        return handleGeneralSagittalAndWhorlCodewords({
            maybeSagittal,
            whorl,
            flavor,
        })
    }
}

const computeSagittalAndWhorlCodewords = ({
    sharpStep,
    sagittals,
    sagittalIndex,
    whorl,
    flavor,
}: {
    sharpStep: EdoStep
    sagittals: Sagittal[]
    sagittalIndex: Index<Sagittal>
    whorl: Whorl
    flavor: Flavor
}): { sagittalCodewords: (Code & Word)[]; whorlCodewords: (Code & Word)[] } => {
    const maybeSagittal: Maybe<Sagittal> =
        computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)

    return flavor === Flavor.EVO_SZ
        ? computeEvoSZSagittalAndWhorlCodewords({
              sharpStep,
              sagittalIndex,
              maybeSagittal,
              whorl,
              flavor,
          })
        : handleGeneralSagittalAndWhorlCodewords({
              maybeSagittal,
              whorl,
              flavor,
          })
}

const extractDiagramStepParameters = (
    { linkIndex, sagittalIndex }: Spelling,
    {
        sharpStep,
        step,
        sagittals,
        flavor,
        subsetFactor,
        edo,
    }: {
        sharpStep: EdoStep
        step: EdoStep
        sagittals: Sagittal[]
        flavor: Flavor
        subsetFactor?: SubsetFactor
        edo: Edo
    },
): {
    codewords: Codewords
    width: Octals
    nominal: Nominal
    subsetExcluded?: boolean
    isC: boolean
} => {
    const { whorl, nominal }: Link = LINKS[linkIndex]
    const codewords: {
        sagittalCodewords: (Code & Word)[]
        whorlCodewords: (Code & Word)[]
    } = computeSagittalAndWhorlCodewords({
        sharpStep,
        sagittals,
        sagittalIndex,
        whorl,
        flavor,
    })
    const isC: boolean = computeIsC4(step, { linkIndex, edo })

    if (!isUndefined(subsetFactor) && !dividesEvenly(step, subsetFactor)) {
        return {
            codewords,
            width: 0 as Octals,
            nominal,
            subsetExcluded: true,
            isC,
        }
    } else {
        return { codewords, width: computeWidth(codewords), nominal, isC }
    }
}

export { extractDiagramStepParameters }
