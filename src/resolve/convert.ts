import { computeCodewordWidth, Octals, Code } from "staff-code"
import { Maybe, Index, ZERO_ONE_INDEX_DIFF, deepEquals, isUndefined, Word } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    computeAccidentalSagitype,
    EdoStepNotation,
    Link,
    Whorl,
    NOMINALS,
    SAGITTAL_SEMIFLAT,
    SAGITTAL_SEMISHARP,
    Sagitype,
} from "@sagittal/system"
import { IntermediateFormWithSimpleWidth } from "./types"

const REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D: Index<Link> = -17 as Index<Link>

const SZ_SESQUISHARP: Code & Word = "t#" as Code & Word
const SZ_SEMISHARP: Code & Word = "t" as Code & Word
const SZ_SEMIFLAT: Code & Word = "d" as Code & Word
const SZ_SESQUIFLAT: Code & Word = "d" as Code & Word

const LINKS: Record<Index<Link>, Link> = Object.values(Whorl)
    .map(whorl => NOMINALS
        .map(nominal => ({ whorl, nominal }))
    )
    .flat()
    .reduce(
        (links: Record<Index<Link>, Link>, link: Link, index: number): Record<Index<Link>, Link> => {
            links[index + REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D as Index<Link>] = link
            return links
        },
        {} as Record<Index<Link>, Link>
    )

const computePositiveOrNegativeOrNullSagittal = (sagittals: Sagittal[], sagittalIndex: Index<Sagittal>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return { ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF], down: true }
    }

    return undefined
}

const handleDiacritics = (sagitype: Sagitype): (Code & Word)[] =>
    sagitype.split(/(``|,,|`|,|'|\.)/) as (Code & Word)[]

const computeSagittalCodewords = (maybeSagittal: Maybe<Sagittal>): (Code & Word)[] =>
    isUndefined(maybeSagittal) ?
        [] :
        handleDiacritics(computeAccidentalSagitype(maybeSagittal))

const computeWhorlCodewords = (whorl: Whorl, { flavor }: { flavor: Flavor }): (Code & Word)[] =>
    flavor === Flavor.REVO ?
        [] :
        whorl === Whorl.NATURAL ?
            [] :
            [whorl as Code & Word]

const handleGeneralSagitypeAndWhorlCodewords = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } =>
({
    sagittalCodewords: computeSagittalCodewords(maybeSagittal),
    whorlCodewords: computeWhorlCodewords(whorl, { flavor })
})

const computeEvoSZSagitypeAndWhorlCodewords = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } => {
    const isHalfSharp = deepEquals(maybeSagittal, SAGITTAL_SEMISHARP);
    const isHalfFlat = deepEquals(maybeSagittal, SAGITTAL_SEMIFLAT);

    if (whorl === Whorl.DOUBLE_SHARP && isHalfFlat) {
        return { sagittalCodewords: [], whorlCodewords: [SZ_SESQUISHARP] };
    } else if (whorl === Whorl.SHARP && (isHalfSharp || isHalfFlat)) {
        return { sagittalCodewords: [], whorlCodewords: isHalfSharp ? [SZ_SESQUISHARP] : [SZ_SEMISHARP] };
    } else if (whorl === Whorl.NATURAL && (isHalfSharp || isHalfFlat)) {
        return { sagittalCodewords: [], whorlCodewords: isHalfSharp ? [SZ_SEMISHARP] : [SZ_SEMIFLAT] };
    } else if (whorl === Whorl.FLAT && (isHalfSharp || isHalfFlat)) {
        return { sagittalCodewords: [], whorlCodewords: isHalfSharp ? [SZ_SEMIFLAT] : [SZ_SESQUIFLAT] };
    } else if (whorl === Whorl.DOUBLE_FLAT && isHalfFlat) {
        return { sagittalCodewords: [], whorlCodewords: [SZ_SESQUIFLAT] };
    } else {
        return handleGeneralSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor })
    }
}

const computeSagitypeAndWhorlCodewords = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } =>
    flavor === Flavor.EVO_SZ ?
        computeEvoSZSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor }) :
        handleGeneralSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor })

const computeWidth = ({ sagittalCodewords, whorlCodewords }: { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] }) => {
    const whorlWidth: Octals = whorlCodewords.reduce(
        (totalWidth: Octals, whorlCodeword: Code & Word): Octals => totalWidth + computeCodewordWidth(whorlCodeword) as Octals,
        0 as Octals
    )
    const sagitypeWidth: Octals = sagittalCodewords.reduce(
        (totalWidth: Octals, sagitypeCodeword: Code & Word): Octals => totalWidth + computeCodewordWidth(sagitypeCodeword) as Octals,
        0 as Octals
    )

    return whorlWidth + sagitypeWidth as Octals
}

const convertToPatternedIntermediateFormsWithSimpleWidth = (patternedEdoStepNotations: EdoStepNotation[][], { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }): IntermediateFormWithSimpleWidth[][] =>
    patternedEdoStepNotations.map((patternedEdoStaveNotationsStave: EdoStepNotation[]): IntermediateFormWithSimpleWidth[] => 
        patternedEdoStaveNotationsStave.map(({ linkIndex, sagittalIndex }: EdoStepNotation): IntermediateFormWithSimpleWidth => {
            const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
            const { nominal, whorl }: Link = LINKS[linkIndex]
            const { sagittalCodewords, whorlCodewords } = computeSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor })
            const width = computeWidth({ sagittalCodewords, whorlCodewords })

            return {
                nominal,
                whorlCodewords,
                sagittalCodewords,
                width,
            }
        })
    )

export {
    convertToPatternedIntermediateFormsWithSimpleWidth,
}
