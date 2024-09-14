import { Octals, Code } from "staff-code"
import {
    Maybe,
    Index,
    ZERO_ONE_INDEX_DIFF,
    deepEquals,
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
    SAGITTAL_SEMIFLAT,
    SAGITTAL_SEMISHARP,
    Sagitype,
    SubsetFactor,
    Nominal,
    EdoStep,
    Edo,
} from "@sagittal/system"
import { EdoStepNotationIndices } from "../../chaining"
import { EdoStepNotationCodewords } from "../types"
import { computeWidth } from "./spacing"
import { computeIsC4 } from "./c4"

const REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D: Index<Link> = -17 as Index<Link>

const SZ_SESQUISHARP: Code & Word = "t#" as Code & Word
const SZ_SEMISHARP: Code & Word = "t" as Code & Word
const SZ_SEMIFLAT: Code & Word = "d" as Code & Word
const SZ_SESQUIFLAT: Code & Word = "d" as Code & Word

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

const handleDiacritics = (sagitype: Sagitype): (Code & Word)[] =>
    sagitype.split(/(``|,,|`|,|'|\.)/).filter(Boolean) as (Code & Word)[] // .filter(Boolean) filters out empty strings

const computeSagittalCodewords = (
    maybeSagittal: Maybe<Sagittal>,
): (Code & Word)[] =>
    isUndefined(maybeSagittal)
        ? []
        : handleDiacritics(computeAccidentalSagitype(maybeSagittal))

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
    sagittals,
    maybeSagittal,
    whorl,
    flavor,
}: {
    sharpStep: EdoStep
    sagittals: Sagittal[]
    maybeSagittal: Maybe<Sagittal>
    whorl: Whorl
    flavor: Flavor
}): { sagittalCodewords: (Code & Word)[]; whorlCodewords: (Code & Word)[] } => {
    const sagittalSemisharpIsHalfApotome: boolean =
        isEven(sharpStep) &&
        deepEquals(
            sagittals[sharpStep / 2 - ZERO_ONE_INDEX_DIFF],
            SAGITTAL_SEMISHARP,
        )

    if (!sagittalSemisharpIsHalfApotome) {
        return handleGeneralSagittalAndWhorlCodewords({
            maybeSagittal,
            whorl,
            flavor,
        })
    }

    const isHalfSharp: boolean = deepEquals(maybeSagittal, SAGITTAL_SEMISHARP)
    const isHalfFlat: boolean = deepEquals(maybeSagittal, SAGITTAL_SEMIFLAT)

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
              sagittals,
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

const extractEdoStepNotationParameters = (
    { linkIndex, sagittalIndex }: EdoStepNotationIndices,
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
    codewords: EdoStepNotationCodewords
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

export { extractEdoStepNotationParameters }