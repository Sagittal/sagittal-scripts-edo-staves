import { Edo, Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    EdoNotationDefinition,
    isSubsetNotation,
    SubsetFactor,
    computeSubsetFactor,
    Spelling,
    EdoNotationName,
    parseEdoNotationName,
    EDO_NOTATION_DEFINITIONS,
} from "@sagittal/system"
import { computeNotation } from "../notation"
import { assembleAsStaffCodeInputSentence } from "./assembly"
import { computeDefaultSingleSpellings } from "./chaining"
import { computeDiagramSteps, DiagramStep } from "./hydration"
import { computeIsExtraLargeEdo } from "./hydration"

const doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edoNotationName: EdoNotationName,
    flavor: Flavor,
    subsetFactor?: SubsetFactor,
): Io & Sentence => {
    const { edo, sharpStep, fifthStep, sagittals, limmaStep } = computeNotation(edoNotationName, flavor)

    const defaultSingleSpellings: Spelling[] = computeDefaultSingleSpellings({
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
