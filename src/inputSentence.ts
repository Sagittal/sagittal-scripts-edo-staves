import { Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    Sagitype,
    EdoStepNotation,
    Edo,
    EdoStep,
    EdoNotationDefinition,
    Nominal,
    computeFifthStep,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    computeSagittals,
    isSubsetNotation,
    computeSubsetSagitypes,
    computeSubsetEdoStepNotations
} from "@sagittal/system"
import { computeEdoStepNotations } from "./edoStepNotations"
import { resolveEdoStepNotationsToIntermediateStringFormOfActualFinalVisualNotation } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./staffCode"

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

    const subsetFactor = edo / inputEdo

    const wholeStep = 2 * fifthStep % edo
    const limmaStep = (wholeStep + edo - sharpStep) % edo
    const THING = [
        { whole: 1, limma: 0 }, // large
        { whole: 1, limma: 1 }, // medium-large
        { whole: 2, limma: 1 }, // medium-medium
        { whole: 3, limma: 2 }, // medium-small
        { whole: 5, limma: 2 }, // small
    ]
    const MAX = 18
    const THING_TYPES = ["large", "large-medium", "medium-medium", "small-medium", "small"]

    let chosenThingIndex = 0
    THING.forEach((thing, thingIndex) => {
        if ((thing.whole * wholeStep + thing.limma * limmaStep) / subsetFactor <= MAX) {
            chosenThingIndex = thingIndex
        }
    })
    // if (chosenThingIndex == undefined) chosenThingIndex = 4
    // console.log("edo: ", inputEdo, " CD: ", wholeStep, "EF: ", limmaStep, " thing: ", THING_TYPES[chosenThingIndex])

    return assembleAsStaffCodeInputSentence(intermediateStringForm, { root })
}

export {
    computeStaffCodeInputSentence,
}
