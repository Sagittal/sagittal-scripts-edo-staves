import { Code } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { Clause } from "@sagittal/general"
import { NotationState } from "./types"

const computeNoteAndRighthandSpaceClause = ({ notationState }: { notationState: NotationState }): Code & Clause => {
    notationState.noteCount++

    return `nt; ${COLUMN_BUFFER_WIDTH}; ` as Code & Clause
}

export {
    computeNoteAndRighthandSpaceClause,
}
