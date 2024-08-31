import {
    Sagittal,
    parseSagitype,
    Sagitype,
    Flavor,
    computeSymbolClassIdAndSectionFromSagittal,
    computeRevoAccidentalFromCaptureZone,
    SECTION_P1T,
} from "@sagittal/system";
import { EdoStep } from "./types";

// const computeRequiredRevoSagittalCount = (sharpStep: EdoStep) => sharpStep % 2 == 0 ?
//     Math.floor(sharpStep / 2) - 1 :
//     Math.floor(sharpStep / 2)

const computeSagittals = (
    { sagitypes, flavor, sharpStep }: { sagitypes: Sagitype[], flavor: Flavor, sharpStep: EdoStep }
): Sagittal[] => {
    let sagittals: Sagittal[] = sagitypes.map(parseSagitype)

    if (flavor == Flavor.EVO) {
        return sagittals
    }

    // sagittals.slice(0, computeRequiredRevoSagittalCount(sharpStep)).reverse().forEach((sagittal: Sagittal): void => {
    //     const [symbolClassId, _] = computeSymbolClassIdAndSectionFromSagittal(sagittal)
    //     sagittals.push(computeRevoAccidentalFromCaptureZone(symbolClassId, SECTION_P1T))
    // })

    // sagittals.push(parseSagitype("/||\\" as Sagitype))

    // sagittals.slice().forEach((sagittal: Sagittal): void => {
    //     const [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(sagittal)
    //     sagittals.push(computeRevoAccidentalFromCaptureZone(symbolClassId, { ...section, shifted: true }))
    // })

    return sagittals
}

export {
    computeSagittals,
}
