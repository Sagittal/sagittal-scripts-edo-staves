import { Octals } from "staff-code"
import { Index, Max, computeRange, Count, max, Word } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Note, Stave } from "../../types"
import { NoteCountsByStave } from "../types"

const computeColumnWidths = (
    edoStepNotationWidths: Octals[],
    noteCountsByStave: NoteCountsByStave,
): Max<Octals>[] => {
    let furthestNoteAligned: Index<Note> = 0 as Index<Note>
    const alignedEdoStepNotationWidths: Octals[][] = noteCountsByStave.map(
        (noteCountByStave: Count<Note>): Octals[] => {
            const edoStepNotationWidthStave: Octals[] =
                edoStepNotationWidths.slice(
                    furthestNoteAligned,
                    furthestNoteAligned + noteCountByStave,
                )

            furthestNoteAligned = (furthestNoteAligned +
                noteCountByStave) as Index<Note>

            return edoStepNotationWidthStave
        },
    )
    const maxStaveLength: Max<Count<Note>> = max(...noteCountsByStave)
    return computeRange(maxStaveLength).map(
        (columnIndex: number): Max<Octals> => {
            const columnWidths = alignedEdoStepNotationWidths.map(
                (alignedEdoStepNotationWidthStave) => {
                    return alignedEdoStepNotationWidthStave[columnIndex] || 0
                },
            )

            return Math.max(...columnWidths) as Max<Octals>
        },
    )
}

const computeColumnWidth = ({
    noteCountsByStave,
    edoStepNotationWidths,
    step,
}: {
    noteCountsByStave: NoteCountsByStave
    edoStepNotationWidths: Octals[]
    step: EdoStep
}): Octals => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    const columnWidths: Max<Octals>[] = computeColumnWidths(
        edoStepNotationWidths,
        noteCountsByStave,
    )

    while (noteCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - noteCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnWidths[cursor] as Octals
}

const computeLefthandSpacing = ({
    edoStepNotationWidths,
    step,
    noteCountsByStave,
}: {
    noteCountsByStave: NoteCountsByStave
    edoStepNotationWidths: Octals[]
    step: EdoStep
}): Octals =>
    (computeColumnWidth({ noteCountsByStave, edoStepNotationWidths, step }) -
        edoStepNotationWidths[step]) as Octals

export { computeLefthandSpacing }
