import { Io, Sentence } from "@sagittal/general"
import { Flavor, Sagittal, Sagitype } from "@sagittal/system"
import {
    EdoStepNotation,
    Edo,
    EdoStep,
    EdoStepNotationPossibilities,
    EdoNotationDefinition,
    NonSubsetNotationDefinition,
} from "./types"
import { computeFifthStep, computeSharpStep } from "./steps"
import { EDO_NOTATION_DEFINITIONS } from "./definitions"
import { computeEdoStepNotationPossibilitesList } from "./possibilities"
import { chooseOneEdoStepNotationPerEdoStep } from "./choose"
import { resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./staffCode"
import { computeSagittals } from "./sagittals"
import { isSubsetNotation, computeSubsetSagitypes, computeSubsetEdoStepNotations } from "./subset"
import { computeIsLimmaFraction } from "./limmaFraction"

const computeSagitypes = (edoNotationDefinition: EdoNotationDefinition): Sagitype[] =>
    isSubsetNotation(edoNotationDefinition) ?
        computeSubsetSagitypes(edoNotationDefinition) :
        edoNotationDefinition.sagitypes

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor): Io & Sentence => {
    const edoNotationDefinition = EDO_NOTATION_DEFINITIONS[edo]
    const sagitypes = computeSagitypes(edoNotationDefinition)
    const notationEdo = isSubsetNotation(edoNotationDefinition) ? edoNotationDefinition.subset : edo
    const fifthStep: EdoStep = computeFifthStep(notationEdo)
    const sharpStep: EdoStep = computeSharpStep(notationEdo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })
    const edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[] = computeEdoStepNotationPossibilitesList({
        edo: notationEdo,
        fifthStep,
        sagittals,
        flavor,
        isLimmaFraction: computeIsLimmaFraction(notationEdo)
    })
    let edoStepNotations: EdoStepNotation[] = chooseOneEdoStepNotationPerEdoStep(edoStepNotationPossibilitiesList, { sharpStep, flavor })

    if (isSubsetNotation(edoNotationDefinition)) {
        edoStepNotations = computeSubsetEdoStepNotations({ subsetNotationDefinition: edoNotationDefinition, edo, edoStepNotations })
    }

    const intermediateStringForm = resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation(edoStepNotations, { sagittals, flavor })

    return assembleAsStaffCodeInputSentence(intermediateStringForm)
}

export {
    computeStaffCodeInputSentence,
}
