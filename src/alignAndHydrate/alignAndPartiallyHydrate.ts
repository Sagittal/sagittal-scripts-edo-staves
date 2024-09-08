import { Index, Decimal, Max, max } from "@sagittal/general"
import { Edo, EdoStep, EdoStepNotation, Flavor, Sagittal, SubsetFactor } from "@sagittal/system"
import { Note, Stave } from "../types"
import { PartiallyHydratedEdoStepNotation, Alignment, AlignmentState } from "./types"
import { partiallyHydrateEdoStepNotation } from "./partiallyHydrate"
import { computeAlignment } from "./alignment"

const alignAndPartiallyHydrateEdoStepNotation = (
    alignedAndPartiallyHydratedEdoStepNotations: PartiallyHydratedEdoStepNotation[][],
    edoStepNotation: EdoStepNotation,
    { sagittals, flavor, subsetFactor, alignmentState, maxStaveIndex, alignment }: {
        sagittals: Sagittal[],
        flavor: Flavor,
        subsetFactor?: SubsetFactor,
        alignmentState: AlignmentState,
        maxStaveIndex: Max<Index<Stave>>,
        alignment: Alignment,
    }
): void => {
    const partiallyHydratedEdoStepNotation: PartiallyHydratedEdoStepNotation = partiallyHydrateEdoStepNotation(
        edoStepNotation,
        { noteIndex: alignmentState.noteIndex, sagittals, flavor, subsetFactor }
    )
    alignedAndPartiallyHydratedEdoStepNotations[alignmentState.staveIndex].push(partiallyHydratedEdoStepNotation)

    alignmentState.noteInStaveIndex++
    alignmentState.noteIndex++

    if (alignmentState.staveIndex < maxStaveIndex && alignmentState.noteInStaveIndex === alignment[alignmentState.staveIndex] as Decimal<{ integer: true }> as Index<Note>) {
        alignmentState.staveIndex++
        alignedAndPartiallyHydratedEdoStepNotations[alignmentState.staveIndex] = []
        alignmentState.noteInStaveIndex = 0 as Index<Note>
    }
}

const alignAndPartiallyHydrateEdoStepNotations = (
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor, subsetFactor, edo, fifthStep }: {
        sagittals: Sagittal[],
        flavor: Flavor,
        subsetFactor?: SubsetFactor,
        edo: Edo,
        fifthStep: EdoStep,
    }
): PartiallyHydratedEdoStepNotation[][] => {
    const alignment: Alignment = computeAlignment({ edo, fifthStep })

    const alignedAndPartiallyHydratedEdoStepNotations: PartiallyHydratedEdoStepNotation[][] = [[]]
    const maxStaveIndex: Max<Index<Stave>> = alignment.length - 1 as Max<Index<Stave>>

    const alignmentState: AlignmentState = {
        noteInStaveIndex: 0 as Index<Note>,
        staveIndex: 0 as Index<Stave>,
        noteIndex: 0 as Index<Note>,
    }

    edoStepNotations.forEach((edoStepNotation: EdoStepNotation): void => {
        alignAndPartiallyHydrateEdoStepNotation(
            alignedAndPartiallyHydratedEdoStepNotations,
            edoStepNotation,
            { sagittals, flavor, subsetFactor, alignmentState, maxStaveIndex, alignment }
        )
    })

    return alignedAndPartiallyHydratedEdoStepNotations
}

export {
    alignAndPartiallyHydrateEdoStepNotations,
}
