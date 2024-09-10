import { Octals } from "staff-code"
import { Index, Decimal, Max } from "@sagittal/general"
import {
    EdoStep,
    Flavor,
    Nominal,
    Sagittal,
    SubsetFactor,
} from "@sagittal/system"
import { Note, Stave } from "../types"
import { EdoStepNotationIndices } from "../chaining"
import {
    NoteCountsByStave,
    HydrationState,
    EdoStepNotationCodewords,
} from "./types"
import { extractEdoStepNotationParameters } from "./extract"

const gatherEdoStepNotationParameters = (
    edoStepNotationIndices: EdoStepNotationIndices,
    {
        sagittals,
        flavor,
        subsetFactor,
        hydrationState,
        maxStaveIndex,
        noteCountsByStave,
        sharpStep,
    }: {
        sagittals: Sagittal[]
        flavor: Flavor
        subsetFactor?: SubsetFactor
        hydrationState: HydrationState
        maxStaveIndex: Max<Index<Stave>>
        noteCountsByStave: NoteCountsByStave
        sharpStep: EdoStep
    },
): void => {
    const {
        codewords,
        width,
        nominal,
        subsetExcluded,
    }: {
        codewords: EdoStepNotationCodewords
        width: Octals
        nominal: Nominal
        subsetExcluded?: true
    } = extractEdoStepNotationParameters(edoStepNotationIndices, {
        step: hydrationState.step,
        sagittals,
        flavor,
        subsetFactor,
        sharpStep,
    })
    hydrationState.edoStepNotationCodewordsList.push(codewords)
    hydrationState.edoStepNotationWidths.push(width)
    hydrationState.edoStepNotationNominals.push(nominal)
    hydrationState.edoStepNotationSubsetExclusions.push(subsetExcluded)
    hydrationState.edoStepNotationStaveIndices.push(hydrationState.staveIndex)

    hydrationState.noteInStaveIndex++
    hydrationState.step++

    if (
        hydrationState.staveIndex < maxStaveIndex &&
        hydrationState.noteInStaveIndex ===
            (noteCountsByStave[hydrationState.staveIndex] as Decimal<{
                integer: true
            }> as Index<Note>)
    ) {
        hydrationState.staveIndex++
        hydrationState.noteInStaveIndex = 0 as Index<Note>
    }
}

export { gatherEdoStepNotationParameters }
