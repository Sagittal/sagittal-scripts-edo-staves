import { Maybe, Index, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import { Flavor, Sagittal, computeAccidentalSagitype } from "@sagittal/system"
import { EdoStepNotation, Link, Whorl } from "./types"
import { NOMINALS, SAGITTAL_HALF_FLAT, SAGITTAL_HALF_SHARP } from "./constants"

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

const handleEvoSZ = (sagittal: Sagittal) =>
    JSON.stringify(sagittal) == JSON.stringify(SAGITTAL_HALF_SHARP) ? 
        "t" : 
        JSON.stringify(sagittal) == JSON.stringify(SAGITTAL_HALF_FLAT) ?
            "d" :
            computeAccidentalSagitype(sagittal)

const computeSagitypeString = (maybeSagittal: Maybe<Sagittal>, { flavor }: { flavor: Flavor }): string =>
    !maybeSagittal ?
        "" :
        flavor == Flavor.EVO_SZ ?
            handleEvoSZ(maybeSagittal) :
            computeAccidentalSagitype(maybeSagittal)

const computeWhorlString = (whorl: Whorl, { flavor }: { flavor: Flavor }) =>
    whorl == Whorl.NATURAL || flavor == Flavor.REVO ?
        "" :
        whorl

const resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation = (
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }
): Record<any, string>[] => {
    return edoStepNotations.map(({ linkIndex, sagittalIndex }: EdoStepNotation): Record<any, string> => {
        const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        const { nominal, whorl }: Link = LINKS[linkIndex]

        return {
            nominalString: nominal,
            whorlString: computeWhorlString(whorl, { flavor }),
            sagitypeString: computeSagitypeString(maybeSagittal, { flavor }),
        }
    })
}

export {
    resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation,
}
