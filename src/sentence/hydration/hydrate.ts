import { Index, Max } from "@sagittal/general"
import { Edo, EdoStep, Flavor, Sagittal, SubsetFactor } from "@sagittal/system"
import { Note, Stave } from "../types"
import { EdoStepNotationIndices } from "../chaining"
import { NoteCountsByStave, HydrationState, EdoStepNotation } from "./types"
import { computeNoteCountsByStave } from "./noteCountsByStave"
import { zipEdoStepNotationPropertiesAndComputeLefthandSpacing } from "./zip"
import { gatherEdoStepNotationParameters } from "./gather"

const hydrateEdoStepNotations = (
    edoStepNotationIndicesList: EdoStepNotationIndices[],
    { sagittals, flavor, subsetFactor, edo, fifthStep }: {
        sagittals: Sagittal[],
        flavor: Flavor,
        subsetFactor?: SubsetFactor,
        edo: Edo,
        fifthStep: EdoStep,
    }
): EdoStepNotation[] => {
    const noteCountsByStave: NoteCountsByStave = computeNoteCountsByStave({ edo, fifthStep })

    const maxStaveIndex: Max<Index<Stave>> = noteCountsByStave.length - 1 as Max<Index<Stave>>

    const hydrationState: HydrationState = {
        noteInStaveIndex: 0 as Index<Note>,
        staveIndex: 0 as Index<Stave>,
        step: 0 as EdoStep,
        edoStepNotationCodewordsList: [],
        edoStepNotationWidths: [],
        edoStepNotationNominals: [],
        edoStepNotationSubsetExclusions: [],
        edoStepNotationStaveIndices: [],
    }

    edoStepNotationIndicesList.forEach((edoStepNotationIndices: EdoStepNotationIndices): void => {
        gatherEdoStepNotationParameters(
            edoStepNotationIndices,
            { sagittals, flavor, subsetFactor, hydrationState, maxStaveIndex, noteCountsByStave }
        )
    })

    return zipEdoStepNotationPropertiesAndComputeLefthandSpacing({
        noteCountsByStave,
        edoStepNotationCodewordsList: hydrationState.edoStepNotationCodewordsList,
        edoStepNotationWidths: hydrationState.edoStepNotationWidths,
        edoStepNotationNominals: hydrationState.edoStepNotationNominals,
        edoStepNotationSubsetExclusions: hydrationState.edoStepNotationSubsetExclusions,
        edoStepNotationStaveIndices: hydrationState.edoStepNotationStaveIndices,
    })
}

export {
    hydrateEdoStepNotations,
}
