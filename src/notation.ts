import { Edo, EdoStep } from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSagittals,
    computeSagitypes,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    Flavor,
    NonSubsetEdoNotationDefinition,
    parseEdoNotationName,
    Sagittal,
    Sagitype,
    Spelling,
} from "@sagittal/system"
import { computeDefaultSingleSpellings } from "./sentence"

const computeNotation = (edoNotationName: EdoNotationName, flavor: Flavor) => {
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const sagitypes: Sagitype[] = computeSagitypes(
        EDO_NOTATION_DEFINITIONS[edoNotationName] as NonSubsetEdoNotationDefinition,
    )
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellings: Spelling[] = computeDefaultSingleSpellings({
        edoNotationName,
        fifthStep,
        sagittals,
        flavor,
        limmaStep,
    })

    return {
        edo,
        sagitypes,
        fifthStep,
        sharpStep,
        limmaStep,
        sagittals,
        defaultSingleSpellings,
    }
}

export { computeNotation }
