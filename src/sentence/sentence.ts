import { Edo, EdoStep, Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    Sagitype,
    EdoNotationDefinition,
    computeFifthStep,
    computeSharpStep,
    computeSagittals,
    isSubsetNotation,
    SubsetFactor,
    computeSubsetFactor,
    NonSubsetEdoNotationDefinition,
    computeLimmaStep,
    Spelling,
    EdoNotationName,
    parseEdoNotationName,
    EDO_NOTATION_DEFINITIONS,
    computeSagitypes,
} from "@sagittal/system"
import { assembleAsStaffCodeInputSentence } from "./assembly"
import { computeDefaultSpellings } from "./chaining"
import { computeDiagramSteps, DiagramStep } from "./hydration"
import { computeIsExtraLargeEdo } from "./hydration"

const doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edoNotationName: EdoNotationName,
    flavor: Flavor,
    subsetFactor?: SubsetFactor,
): Io & Sentence => {
    const sagitypes: Sagitype[] = computeSagitypes(
        EDO_NOTATION_DEFINITIONS[edoNotationName] as NonSubsetEdoNotationDefinition,
    )
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellings: Spelling[] = computeDefaultSpellings({
        edoNotationName,
        fifthStep,
        sagittals,
        flavor,
        limmaStep,
    })

    const isExtraLargeEdo: boolean = computeIsExtraLargeEdo(edo, { fifthStep })

    const diagramSteps: DiagramStep[] = computeDiagramSteps(defaultSingleSpellings, {
        sagittals,
        flavor,
        edo,
        fifthStep,
        subsetFactor,
        sharpStep,
        limmaStep,
        isExtraLargeEdo,
    })

    return assembleAsStaffCodeInputSentence(diagramSteps, { isExtraLargeEdo })
}

const computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edoNotationName: EdoNotationName,
    flavor: Flavor,
): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition)) {
        const supersetEdoNotationName: EdoNotationName = edoNotationDefinition.supersetEdoNotationName

        const edo: Edo = parseEdoNotationName(edoNotationName).edo
        const supersetEdo: Edo = parseEdoNotationName(supersetEdoNotationName).edo

        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            supersetEdoNotationName,
            flavor,
            computeSubsetFactor({ edo, supersetEdo }),
        )
    } else {
        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(edoNotationName, flavor)
    }
}

export { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence }
