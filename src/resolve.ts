import { Maybe, Index, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    computeAccidentalSagitype,
    computeSymbolClassIdAndSectionFromSagittal,
    Section,
    SECTION_N2T,
    SECTION_N2A,
    SECTION_N1T,
    SECTION_N1A,
    SECTION_P1A,
    SECTION_P1T,
    SECTION_P2A,
    SECTION_P2T,
    computeRevoAccidentalFromCaptureZone
} from "@sagittal/system"
import { Spelling, Link, Whorl, Nominal } from "./types"
import { LINKS, REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT } from "./constants"
import { computeSagittalFromFlacco } from "@sagittal/system/dist/cjs/accidental"

const computePositiveOrNegativeOrNullSagittal = (sagittals: Sagittal[], sagittalIndex: Index<Sagittal>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return { ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF], down: true }
    }

    return undefined
}

// const naturalOrNothing = (
//     { naturalRequiredOnPlainNominal, sagittalPresent }: { naturalRequiredOnPlainNominal: boolean, sagittalPresent: boolean }
// ) =>
//     naturalRequiredOnPlainNominal && !sagittalPresent ?
//         Whorl.NATURAL :
//         " "

// const revoVersionOfWhorlOrNothing = ({ sagittalPresent, whorl }: { sagittalPresent: boolean, whorl: Whorl }) =>
//     sagittalPresent ?
//         " " :
//         REVO_VERSION_OF_WHORL[whorl]


const computeSagitypeString = (maybeSagittal: Maybe<Sagittal>, flavor: Flavor, whorl: Whorl): string => {
    // if (flavor == Flavor.EVO) {
        return !maybeSagittal ? "" : computeAccidentalSagitype(maybeSagittal)
    // }

    // let [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(maybeSagittal)

    // let targetSection: Section
    // if (whorl == Whorl.DOUBLE_FLAT) {
    //     targetSection = SECTION_N2T
    // } else if (whorl == Whorl.FLAT) {
    //     if (maybeSagittal?.down) {
    //         targetSection = SECTION_N2A
    //     } else {
    //         targetSection = SECTION_N1T
    //     }
    // } else if (whorl == Whorl.NATURAL) {
    //     if (!maybeSagittal) {
    //         return ""
    //     } else if (maybeSagittal?.down) {
    //         targetSection = SECTION_N1A
    //     } else {
    //         targetSection = SECTION_P1A
    //     }
    // } else if (whorl == Whorl.SHARP) {
    //     if (maybeSagittal?.down) {
    //         targetSection = SECTION_P1T
    //     } else {
    //         targetSection = SECTION_P2A
    //     }
    // } else {
    //     targetSection = SECTION_P2T
    // }

    // if (section.mirrored) {
    //     targetSection = { ...targetSection, mirrored: !targetSection.mirrored }
    // }

    // return computeAccidentalSagitype(computeRevoAccidentalFromCaptureZone(symbolClassId, targetSection))
}

const resolveSpellingsToIntermediateStringFormOfActualFinalVisualNotation = (
    spellings: Spelling[],
    { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }
): Record<any, string>[] => {
    // let currentNominal: Nominal
    // let naturalRequiredOnPlainNominal: boolean
    return spellings.map(({ linkIndex, sagittalIndex }: Spelling): Record<any, string> => {
        const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        const { nominal, whorl }: Link = LINKS[linkIndex + REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT]
        // const sagittalPresent: boolean = !!maybeSagittal

        // if (nominal != currentNominal) {
        //     currentNominal = nominal
        // naturalRequiredOnPlainNominal = false
        // }
        // if (sagittalPresent || whorl != Whorl.NATURAL) naturalRequiredOnPlainNominal = true

        const sagitypeString: string =
            computeSagitypeString(maybeSagittal, flavor, whorl)


        const whorlString: string = whorl == Whorl.NATURAL || flavor == Flavor.REVO ?
            " " :
            whorl

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
