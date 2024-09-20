import { Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    Sagitype,
    Edo,
    EdoStep,
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
    EdoName,
    parseEdoName,
    EDO_NOTATION_DEFINITIONS,
} from "@sagittal/system"
import { computeDefaultSpellings } from "./chaining"
import { computeDiagramSteps, DiagramStep } from "./hydration"
import { assembleAsStaffCodeInputSentence } from "./assembly"
import { computeIsExtraLargeEdo } from "./hydration/extraLarge"

const doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edoName: EdoName,
    flavor: Flavor,
    subsetFactor?: SubsetFactor,
): Io & Sentence => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edoName] as NonSubsetEdoNotationDefinition
    ).sagitypes
    const fifthStep: EdoStep = computeFifthStep(edoName)
    const edo: Edo = parseEdoName(edoName).edo
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellings: Spelling[] = computeDefaultSpellings({
        edoName,
        fifthStep,
        sagittals,
        flavor,
        limmaStep,
    })

    const isExtraLargeEdo: boolean = computeIsExtraLargeEdo(edo, { fifthStep })

    const diagramSteps: DiagramStep[] = computeDiagramSteps(
        defaultSingleSpellings,
        {
            sagittals,
            flavor,
            edo,
            fifthStep,
            subsetFactor,
            sharpStep,
            limmaStep,
            isExtraLargeEdo,
        },
    )

    return assembleAsStaffCodeInputSentence(diagramSteps, { isExtraLargeEdo })
}

const computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edoName: EdoName,
    flavor: Flavor,
): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]

    if (isSubsetNotation(edoNotationDefinition)) {
        const supersetEdoName: EdoName = edoNotationDefinition.supersetEdoName

        const edo: Edo = parseEdoName(edoName).edo
        const supersetEdo: Edo = parseEdoName(supersetEdoName).edo

        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            supersetEdoName,
            flavor,
            computeSubsetFactor({ edo, supersetEdo }),
        )
    } else {
        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            edoName,
            flavor,
        )
    }
}

export { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence }
