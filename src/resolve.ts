import { Maybe, Index, ZERO_ONE_INDEX_DIFF, deepEquals, isUndefined, Word } from "@sagittal/general"
import { Flavor, Sagittal, computeAccidentalSagitype, EdoStepNotation, Link, Whorl, NOMINALS, SAGITTAL_SEMIFLAT, SAGITTAL_SEMISHARP, Sagitype } from "@sagittal/system"
import { IntermediateForm } from "./types"
import { Code } from "staff-code/dist/package/cjs/bin"

const REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D: Index<Link> = -17 as Index<Link>

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

const handleDiacritics = (sagitype: Sagitype): (Code & Word)[] => {
    return sagitype.split(/(``|,,|`|,|'|\.)/) as (Code & Word)[]
    // sagitypeString
    // .replace(/'/g, "' ; ")
    // .replace(/\./g, ". ; ")
    // .replace(/``/g, "`` ; ")
    // .replace(/,,/g, ",, ; ")
    // .replace(/`/g, "` ; ")
    // .replace(/,/g, ", ; ")
}

const computeSagitypeCodewords = (maybeSagittal: Maybe<Sagittal>): (Code & Word)[] =>
    isUndefined(maybeSagittal) ?
        [] :
        handleDiacritics(computeAccidentalSagitype(maybeSagittal)) // TODO: use Sagittal<Flavor> where possible

const computeWhorlCodewords = (whorl: Whorl, { flavor }: { flavor: Flavor }): (Code & Word)[] =>
    flavor === Flavor.REVO ?
        [] :
        whorl === Whorl.NATURAL ?
            [] :
            [whorl as Code & Word]

const handleGeneralSagitypeAndWhorlStrings = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagitypeCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } =>
({
    sagitypeCodewords: computeSagitypeCodewords(maybeSagittal),
    whorlCodewords: computeWhorlCodewords(whorl, { flavor })
})

const computeEvoSZSagitypeAndWhorlStrings = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagitypeCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } => {
    const isHalfSharp = deepEquals(maybeSagittal, SAGITTAL_SEMISHARP);
    const isHalfFlat = deepEquals(maybeSagittal, SAGITTAL_SEMIFLAT);

    if (whorl === Whorl.DOUBLE_SHARP && isHalfFlat) {
        return { sagitypeCodewords: [], whorlCodewords: ["t#" as Code & Word] };
    } else if (whorl === Whorl.SHARP && (isHalfSharp || isHalfFlat)) {
        return { sagitypeCodewords: [], whorlCodewords: isHalfSharp ? ["t#" as Code & Word] : ["t" as Code & Word] };
    } else if (whorl === Whorl.NATURAL && (isHalfSharp || isHalfFlat)) {
        return { sagitypeCodewords: [], whorlCodewords: isHalfSharp ? ["t" as Code & Word] : ["d" as Code & Word] };
    } else if (whorl === Whorl.FLAT && (isHalfSharp || isHalfFlat)) {
        return { sagitypeCodewords: [], whorlCodewords: isHalfSharp ? ["d" as Code & Word] : ["db" as Code & Word] };
    } else if (whorl === Whorl.DOUBLE_FLAT && isHalfFlat) {
        return { sagitypeCodewords: [], whorlCodewords: ["db" as Code & Word] }; // TODO: constantize these codewords
    } else {
        return handleGeneralSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor })
    }
}

const computeSagitypeAndWhorlStrings = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagitypeCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } =>
    flavor === Flavor.EVO_SZ ?
        computeEvoSZSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor }) :
        handleGeneralSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor })

const resolveEdoStepNotationsToIntermediateFormsOfActualFinalVisualNotation = (
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }
): IntermediateForm[] => {
    return edoStepNotations.map(({ linkIndex, sagittalIndex }: EdoStepNotation): IntermediateForm => {
        const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        const { nominal, whorl }: Link = LINKS[linkIndex]

        const { sagitypeCodewords, whorlCodewords } = computeSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor })

        return {
            nominal,
            whorlCodewords,
            sagitypeCodewords,
        }
    })
}

export {
    resolveEdoStepNotationsToIntermediateFormsOfActualFinalVisualNotation,
}
