import { computeRange, Count, Index, max, Max } from "@sagittal/general"
import { Note } from "../../types"
import { NoteCountsByStave } from "../types"

const alignEdoStepNotationDataByColumn = <T>(
    edoStepNotationData: T[],
    noteCountsByStave: NoteCountsByStave,
): T[][] => {
    let furthestNoteAligned: Index<Note> = 0 as Index<Note>

    return noteCountsByStave.map((noteCountByStave: Count<Note>): T[] => {
        const edoStepNotationDataStave: T[] = edoStepNotationData.slice(
            furthestNoteAligned,
            furthestNoteAligned + noteCountByStave,
        )

        furthestNoteAligned = (furthestNoteAligned +
            noteCountByStave) as Index<Note>

        return edoStepNotationDataStave
    })
}

const applyByEdoStepNotationColumns = <T, U>(
    alignedEdoStepNotationData: T[][],
    noteCountsByStave: NoteCountsByStave,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] => {
    const maxStaveLength: Max<Count<Note>> = max(...noteCountsByStave)

    return computeRange(maxStaveLength).map((columnIndex: number): U => {
        const edoStepNotationDataColumn: T[] = alignedEdoStepNotationData.map(
            (alignedEdoStepNotationDataStave: T[]): T =>
                alignedEdoStepNotationDataStave[columnIndex] || fallbackValue,
        )

        return columnFunction(edoStepNotationDataColumn)
    })
}

const computeResultByEdoStepNotationColumn = <T, U>(
    edoStepNotationData: T[],
    noteCountsByStave: NoteCountsByStave,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] =>
    applyByEdoStepNotationColumns(
        alignEdoStepNotationDataByColumn(edoStepNotationData, noteCountsByStave),
        noteCountsByStave,
        columnFunction,
        fallbackValue,
    )

export { computeResultByEdoStepNotationColumn }

// TODO: not sure why it's note counts instead of step counts.
// like, do we really need the Note type ?
