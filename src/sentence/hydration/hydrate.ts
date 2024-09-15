import { Index, Max } from "@sagittal/general"
import { Edo, EdoStep, Flavor, Sagittal, SubsetFactor } from "@sagittal/system"
import { Stave } from "../types"
import { EdoStepNotationIndices } from "../chaining"
import { StepCountsByStave, HydrationState, EdoStepNotation } from "./types"
import { computeStepCountsByStave } from "./stepCountsByStave"
import { zipEdoStepNotationPropertiesAndComputeLefthandSpacing } from "./zip"
import { gatherEdoStepNotationParameters } from "./extractAndGather"

const hydrateEdoStepNotations = (
    edoStepNotationIndicesList: EdoStepNotationIndices[],
    {
        sagittals,
        flavor,
        subsetFactor,
        edo,
        fifthStep,
        sharpStep,
        limmaStep,
    }: {
        sagittals: Sagittal[]
        flavor: Flavor
        subsetFactor?: SubsetFactor
        edo: Edo
        fifthStep: EdoStep
        sharpStep: EdoStep
        limmaStep: EdoStep
    },
): EdoStepNotation[] => {
    const stepCountsByStave: StepCountsByStave = computeStepCountsByStave({
        edo,
        fifthStep,
        limmaStep,
    })

    const maxStaveIndex: Max<Index<Stave>> = (stepCountsByStave.length -
        1) as Max<Index<Stave>>

    const hydrationState: HydrationState = {
        stepInStaveIndex: 0 as Index<EdoStep>,
        staveIndex: 0 as Index<Stave>,
        step: 0 as EdoStep,
        edoStepNotationCodewordsList: [],
        edoStepNotationWidths: [],
        edoStepNotationNominals: [],
        edoStepNotationSubsetExclusions: [],
        edoStepNotationStaveIndices: [],
        edoStepNotationAreC4s: [],
    }

    edoStepNotationIndicesList.forEach(
        (edoStepNotationIndices: EdoStepNotationIndices): void => {
            gatherEdoStepNotationParameters(edoStepNotationIndices, {
                sagittals,
                flavor,
                subsetFactor,
                hydrationState,
                maxStaveIndex,
                stepCountsByStave,
                sharpStep,
                edo,
            })
        },
    )

    return zipEdoStepNotationPropertiesAndComputeLefthandSpacing({
        stepCountsByStave,
        edoStepNotationCodewordsList:
            hydrationState.edoStepNotationCodewordsList,
        edoStepNotationWidths: hydrationState.edoStepNotationWidths,
        edoStepNotationNominals: hydrationState.edoStepNotationNominals,
        edoStepNotationSubsetExclusions:
            hydrationState.edoStepNotationSubsetExclusions,
        edoStepNotationStaveIndices: hydrationState.edoStepNotationStaveIndices,
        edoStepNotationAreC4s: hydrationState.edoStepNotationAreC4s,
    })
}

export { hydrateEdoStepNotations }
