import { Octals } from "staff-code"
import { Count, Max, Index, Decimal } from "@sagittal/general"
import { Note } from "../types"
import { NoteCountByStavePattern } from "../alignment"
import { AlignedColumn } from "./types"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { NotationState } from "./types"

const getColumnIndex = (noteCount: Count<Note>, noteCountByStavePattern: NoteCountByStavePattern): Index<AlignedColumn> => {
    let columnIndex: Index<AlignedColumn> = 0 as Index<AlignedColumn>

    let cursor: Index<AlignedColumn> = noteCount as Decimal<{ integer: true }> as Index<AlignedColumn>

    noteCountByStavePattern.forEach((staveNoteCount: Count<Note>): void => {
        if (columnIndex) return

        if (staveNoteCount <= cursor) {
            cursor = cursor - staveNoteCount as Decimal<{ integer: true }> as Index<AlignedColumn>
        } else {
            columnIndex = cursor
        }
    })

    return columnIndex
}

const getColumnWidth = ({ columnWidths, noteCountByStavePattern, notationState }: {
    columnWidths: Max<Octals>[],
    noteCountByStavePattern: NoteCountByStavePattern,
    notationState: NotationState,
}): Octals =>
    columnWidths[getColumnIndex(notationState.noteCount, noteCountByStavePattern)] as Octals

const computeLefthandSpaceClause = (
    { columnWidths, noteCountByStavePattern, notationState }: {
        columnWidths: Max<Octals>[],
        noteCountByStavePattern: NoteCountByStavePattern,
        notationState: NotationState,
    }
) =>
    `${getColumnWidth({ columnWidths, noteCountByStavePattern, notationState }) + COLUMN_BUFFER_WIDTH}; `

export {
    computeLefthandSpaceClause,
}
