import { Code } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { Clause } from "@sagittal/general"
import { NotationState } from "./types"

const computeNoteAndRighthandSpaceClause = ({ notationState, subsetExcluded }: { notationState: NotationState, subsetExcluded: boolean }): Code & Clause => {
    notationState.noteCount++

    // console.log(computeCodewordWidth("ntqrup"))

    return subsetExcluded ?
        `13; ${COLUMN_BUFFER_WIDTH}; ` as Code & Clause :
        `nt; ${COLUMN_BUFFER_WIDTH}; ` as Code & Clause  // TODO: make a thing for that 13 p[er comment above]
}

export {
    computeNoteAndRighthandSpaceClause,
}
