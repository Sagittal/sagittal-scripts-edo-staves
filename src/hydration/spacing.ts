import { Octals } from "staff-code"
import { Index, Max, isUndefined, computeRange, Count, max, Column } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Note, Stave } from "../types"
import { NoteCountsByStave } from "./types"

const computeColumnWidths = (edoStepNotationWidths: Octals[], noteCountsByStave: NoteCountsByStave): Max<Octals>[] => {
    const maxStaveLength: Max<Count<Note>> = max(...noteCountsByStave)

    let cursor: EdoStep = 0 as EdoStep
    const initialStepsOfEachStave: EdoStep[] = noteCountsByStave.map((staveNoteCount: Count<Note>): EdoStep => {
        const cursorBeforeIncrementing: EdoStep = cursor
        cursor = cursor + staveNoteCount as EdoStep

        return cursorBeforeIncrementing
    })

    return computeRange(maxStaveLength).map((columnIndex: number): Max<Octals> => {
        const columnIndices: Index<Column>[] = initialStepsOfEachStave.map(
            (initialStepOfStave: EdoStep): Index<Column> =>
                initialStepOfStave + columnIndex as Index<Column>
        )
        
        const columnWidths: Octals[] = columnIndices.map(
            (columnIndex: Index<Column>) =>
                isUndefined(edoStepNotationWidths[columnIndex]) ?
                    0 as Octals :
                    edoStepNotationWidths[columnIndex]
        )

        return Math.max(...columnWidths) as Max<Octals>
    })
}

const computeColumnWidth = (
    { noteCountsByStave, edoStepNotationWidths, step }: {
        noteCountsByStave: NoteCountsByStave,
        edoStepNotationWidths: Octals[],
        step: EdoStep
    }
): Octals => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    const columnWidths: Max<Octals>[] = computeColumnWidths(edoStepNotationWidths, noteCountsByStave)

    while (noteCountsByStave[staveIndex] <= cursor) {
        cursor = cursor - noteCountsByStave[staveIndex] as EdoStep
        staveIndex++
    }

    return columnWidths[cursor] as Octals
}

const computeLefthandSpacing = (
    { edoStepNotationWidths, step, noteCountsByStave }: {
        noteCountsByStave: NoteCountsByStave,
        edoStepNotationWidths: Octals[],
        step: EdoStep,
    }
): Octals =>
    computeColumnWidth({ noteCountsByStave, edoStepNotationWidths, step }) - edoStepNotationWidths[step] as Octals

export {
    computeLefthandSpacing,
}
