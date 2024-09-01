import { Io, Sentence } from "@sagittal/general"
import { Flavor, Sagittal, Sagitype } from "@sagittal/system"
import { EdoStepNotation, Edo, EdoStep, EdoNotationDefinition, Nominal } from "./types"
import { computeFifthStep, computeSharpStep } from "./steps"
import { EDO_NOTATION_DEFINITIONS } from "./definitions"
import { computeEdoStepNotations } from "./edoStepNotations"
import { resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./staffCode"
import { computeSagittals } from "./sagittals"
import { isSubsetNotation, computeSubsetSagitypes, computeSubsetEdoStepNotations } from "./subset"

const computeSagitypes = (edoNotationDefinition: EdoNotationDefinition): Sagitype[] =>
    isSubsetNotation(edoNotationDefinition) ?
        computeSubsetSagitypes(edoNotationDefinition) :
        edoNotationDefinition.sagitypes

const computeStaffCodeInputSentence = (inputEdo: Edo, flavor: Flavor, { root }: { root: Nominal } = { root: Nominal.C }): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[inputEdo]
    const sagitypes: Sagitype[] = computeSagitypes(edoNotationDefinition)
    const edo: Edo = isSubsetNotation(edoNotationDefinition) ? edoNotationDefinition.supersetEdo : inputEdo
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })

    let edoStepNotations: EdoStepNotation[] = computeEdoStepNotations({ edo, fifthStep, sagittals, flavor, root })
    if (isSubsetNotation(edoNotationDefinition)) edoStepNotations = computeSubsetEdoStepNotations({ edo, subsetEdo: inputEdo, edoStepNotations })

    const intermediateStringForm = resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation(edoStepNotations, { sagittals, flavor })

    // TODO: here is where we'd:
    // - compute which alignment pattern this EDO will use
    // - arrange the intermediate stringform into an array of arrays according to it
    // - for each column, determine the max width
    // - then modify the `assemble...` function below to take this width and staff breaks into account

    return assembleAsStaffCodeInputSentence(intermediateStringForm, { root })
}

export {
    computeStaffCodeInputSentence,
}
