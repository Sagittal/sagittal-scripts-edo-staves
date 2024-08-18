import { Maybe, Index, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import {
    Flavor,
    Section,
    Sagittal,
    computeAccidentalSagitype,
    computeSymbolClassIdAndSectionFromSagittal,
    computeRevoAccidentalFromCaptureZone,
    SECTION_N1A,
    SECTION_N1T,
    SECTION_N2A,
    SECTION_N2T,
    SECTION_P1A,
    SECTION_P1T,
    SECTION_P2A,
    SECTION_P2T,
} from "@sagittal/system"
import { EdoStepNotation, Link, Whorl, Nominal } from "./types"
import { LINKS, REVO_VERSION_OF_WHORL, REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT } from "./constants"

const computeSagitypeString = (sagittal: Sagittal, flavor: Flavor, whorl: Whorl): string => {
    if (flavor == Flavor.EVO) {
        return computeAccidentalSagitype(sagittal)
    }

    let [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(sagittal)

    let targetSection: Section
    if (whorl == Whorl.DOUBLE_FLAT) {
        targetSection = SECTION_N2T
    } else if (whorl == Whorl.FLAT) {
        if (sagittal.down) {
            targetSection = SECTION_N2A
        } else {
            targetSection = SECTION_N1T
        }
    } else if (whorl == Whorl.NATURAL) {
        if (sagittal.down) {
            targetSection = SECTION_N1A
        } else {
            targetSection = SECTION_P1A
        }
    } else if (whorl == Whorl.SHARP) {
        if (sagittal.down) {
            targetSection = SECTION_P1T
        } else {
            targetSection = SECTION_P2A
        }
    } else {
        targetSection = SECTION_P2T
    }

    if (section.mirrored) {
        targetSection = { ...targetSection, mirrored: !targetSection.mirrored }
    }

    return computeAccidentalSagitype(computeRevoAccidentalFromCaptureZone(symbolClassId, targetSection))
}

const computePositiveOrNegativeOrNullSagittal = (sagittals: Sagittal[], sagittalIndex: Index<Sagittal>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return { ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF], down: true }
    }

    return undefined
}

const naturalOrNothing = (naturalRequiredOnPlainNominal: boolean, sagittalPresent: boolean) =>
    naturalRequiredOnPlainNominal && !sagittalPresent ?
        Whorl.NATURAL :
        " "

const revoVersionOfWhorlOrNothing = (sagitalPresent: boolean, whorl: Whorl) =>
    sagitalPresent ?
        " " :
        REVO_VERSION_OF_WHORL[whorl]


const resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation = (
    edoStepNotations: EdoStepNotation[],
    sagittals: Sagittal[],
    flavor: Flavor
): Record<any, string>[] => {
    let currentNominal: Nominal
    let naturalRequiredOnPlainNominal: boolean
    return edoStepNotations.map(({ linkIndex, sagittalIndex }: EdoStepNotation): Record<any, string> => {
        const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        const { nominal, whorl }: Link = LINKS[linkIndex + REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT]
        const sagitalPresent: boolean = !!maybeSagittal

        if (nominal != currentNominal) {
            currentNominal = nominal
            naturalRequiredOnPlainNominal = false
        }
        if (sagitalPresent || whorl != Whorl.NATURAL) naturalRequiredOnPlainNominal = true

        const sagitypeString: string = maybeSagittal ? computeSagitypeString(maybeSagittal, flavor, whorl) : ""

        const whorlString: string = whorl == Whorl.NATURAL ?
            naturalOrNothing(naturalRequiredOnPlainNominal, sagitalPresent) :
            flavor == Flavor.EVO ?
                whorl :
                revoVersionOfWhorlOrNothing(sagitalPresent, whorl)

        return {
            nominalString: nominal,
            whorlString,
            sagitypeString,
        }
    })
}

export {
    resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation,
}
