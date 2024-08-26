import { Maybe, Index, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import { Flavor, Sagittal, computeAccidentalSagitype } from "@sagittal/system"
import { Spelling, Link, Whorl, Nominal } from "./types"
import { LINKS, REVO_VERSION_OF_WHORL, REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT } from "./constants"

const computePositiveOrNegativeOrNullSagittal = (sagittals: Sagittal[], sagittalIndex: Index<Sagittal>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return { ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF], down: true }
    }

    return undefined
}

const naturalOrNothing = (
    { naturalRequiredOnPlainNominal, sagittalPresent }: { naturalRequiredOnPlainNominal: boolean, sagittalPresent: boolean }
) =>
    naturalRequiredOnPlainNominal && !sagittalPresent ?
        Whorl.NATURAL :
        " "

const revoVersionOfWhorlOrNothing = ({ sagittalPresent, whorl }: { sagittalPresent: boolean, whorl: Whorl }) =>
    sagittalPresent ?
        " " :
        REVO_VERSION_OF_WHORL[whorl]


const resolveSpellingsToIntermediateStringFormOfActualFinalVisualNotation = (
    spellings: Spelling[],
    { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }
): Record<any, string>[] => {
    let currentNominal: Nominal
    let naturalRequiredOnPlainNominal: boolean
    return spellings.map(({ linkIndex, sagittalIndex }: Spelling): Record<any, string> => {
        const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        const { nominal, whorl }: Link = LINKS[linkIndex + REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT]
        const sagittalPresent: boolean = !!maybeSagittal

        if (nominal != currentNominal) {
            currentNominal = nominal
            naturalRequiredOnPlainNominal = false
        }
        if (sagittalPresent || whorl != Whorl.NATURAL) naturalRequiredOnPlainNominal = true

        const sagitypeString: string = maybeSagittal ? computeAccidentalSagitype(maybeSagittal) : ""

        const whorlString: string = whorl == Whorl.NATURAL ?
            naturalOrNothing({ naturalRequiredOnPlainNominal, sagittalPresent }) :
            flavor == Flavor.EVO ?
                whorl :
                revoVersionOfWhorlOrNothing({ sagittalPresent, whorl })

        return {
            nominalString: nominal,
            whorlString,
            sagitypeString,
        }
    })
}

export {
    resolveSpellingsToIntermediateStringFormOfActualFinalVisualNotation,
}
