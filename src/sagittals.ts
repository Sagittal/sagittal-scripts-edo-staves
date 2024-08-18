import { Maybe } from "@sagittal/general"
import { Sagittal, Shafts, computeApotomeComplement, Sagitype, parseSagitype } from "@sagittal/system"
import { EdoStep } from "./types"

const computeSagittals = (sagitypes: Sagitype[], sharpStep: EdoStep): Sagittal[] => {
    const sagittals: Sagittal[] = sagitypes.map(parseSagitype)

    // ESSACs
    const extraSingleShaftApotomeComplements: Sagittal[] = sagittals
        .map(computeApotomeComplement)
        .reverse()
        .filter((maybeSagittal: Maybe<Sagittal>): boolean => !maybeSagittal || maybeSagittal.shafts == Shafts.SINGLE) as Sagittal[]

    return sagittals
        .concat(extraSingleShaftApotomeComplements)
        .slice(0, Math.ceil(sharpStep / 2))
}

export {
    computeSagittals,
}
