import { Io, Sentence } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { EdoStepNotation, Edo, EdoStep, EdoStepNotationPossibilities } from "./types"
import { computeFifthStep, computeSharpStep } from "./steps"
import { EDO_SAGITYPES } from "./edoSagitypes"
import { computeEdoStepNotationPossibilitesList } from "./possibilities"
import { chooseOneEdoStepNotationPerEdoStep } from "./choose"
import { resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./staffCode"
import { computeSagittals } from "./sagittals"

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor): Io & Sentence => {
    const sagitypes = EDO_SAGITYPES[edo]
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals(sagitypes, sharpStep)
    const edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[] = computeEdoStepNotationPossibilitesList(edo, fifthStep, sagittals)
    const edoStepNotations: EdoStepNotation[] = chooseOneEdoStepNotationPerEdoStep(edoStepNotationPossibilitiesList, sharpStep, sagittals)
    // TODO: CLEANUP add this type back 
    const intermediateStringForm = resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation(edoStepNotations, sagittals, flavor)

    return assembleAsStaffCodeInputSentence(intermediateStringForm)
}

export {
    computeStaffCodeInputSentence,
}
