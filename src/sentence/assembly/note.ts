import { Code, computeCodewordWidth, Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { Clause, Word } from "@sagittal/general"
import { AssemblyState } from "./types"

const NOTE_WIDTH: Octals = computeCodewordWidth("ntqrup" as Code & Word) // "nt" is only an alias. the width is 13

const computeNoteAndRighthandSpaceClause = ({ assemblyState, subsetExcluded }: { assemblyState: AssemblyState, subsetExcluded: boolean }): Code & Clause => {
    assemblyState.noteCount++

    return subsetExcluded ?
        `${NOTE_WIDTH}; ${COLUMN_BUFFER_WIDTH}; ` as Code & Clause :
        `nt; ${COLUMN_BUFFER_WIDTH}; ` as Code & Clause
}

export {
    computeNoteAndRighthandSpaceClause,
}