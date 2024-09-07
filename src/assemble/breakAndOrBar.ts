import { Code } from "staff-code"
import { Clause, Count, Word, Index, Decimal } from "@sagittal/general"
import { Note } from "../types"
import { NoteCountByStavePattern } from "../alignment"
import { computeNominalCodeword } from "./nominal"
import { CLEF } from "./constants"
import { AlignedColumn, NotationState } from "./types"

const BARLINE: Code & Clause = "en; bl " as Code & Clause
const STAVE_BREAK: Code & Clause = "nl; " as Code & Clause

const computeTimeToBreakStaves = (noteCount: Count<Note>, noteCountByStavePattern: NoteCountByStavePattern): boolean => {
    let timeToBreakStaves: boolean = false
    let cursor: Index<AlignedColumn> = 0 as Index<AlignedColumn>
    noteCountByStavePattern.forEach((staveNoteCount: Count<Note>): void => {
        cursor = cursor + staveNoteCount as Index<AlignedColumn>

        if (noteCount === cursor as Decimal<{ integer: true }> as Count<Note>) timeToBreakStaves = true
    })

    return timeToBreakStaves
}

const computeBreakAndOrBarClause = (
    { sagittalCodewords, whorlCodewords, notationState, noteCountByStavePattern }: {
        sagittalCodewords: (Code & Word)[],
        whorlCodewords: (Code & Word)[],
        notationState: NotationState,
        noteCountByStavePattern: NoteCountByStavePattern,
    }
) =>
    computeTimeToBreakStaves(notationState.noteCount, noteCountByStavePattern) ?
        `${BARLINE}${STAVE_BREAK}${CLEF}${computeNominalCodeword(notationState)} ` as Code & Clause :
        sagittalCodewords.length === 0 && whorlCodewords.length === 0 && notationState.noteCount !== 0 ?
            `${BARLINE}` as Code & Clause :
            "" as Code & Clause

export {
    computeBreakAndOrBarClause,
}
