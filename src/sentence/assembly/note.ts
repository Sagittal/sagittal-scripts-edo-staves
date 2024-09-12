import { Code, computeCodewordWidth, Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { Clause, Word } from "@sagittal/general"
import { AssemblyState } from "./types"
import { Nominal } from "@sagittal/system"

const NOTE_WIDTH: Octals = computeCodewordWidth("ntqrup" as Code & Word) // "nt" is only an alias. the width is 13
const DO_NOT_TOUCH_LEDGER_LINE_SPACING: Octals = 2 as Octals

const computeNoteAndRighthandSpaceClause = ({
    assemblyState,
    subsetExcluded,
    nominal,
}: {
    assemblyState: AssemblyState
    subsetExcluded: boolean
    nominal: Nominal
}): Code & Clause => {
    assemblyState.noteCount++

    const isC4: boolean =
        assemblyState.reachedC5 === false && nominal === Nominal.C // TODO: clean this up and dry up and consant up with spacing.ts

    return subsetExcluded
        ? (`${isC4 ? `${DO_NOT_TOUCH_LEDGER_LINE_SPACING}; ` : ""}${NOTE_WIDTH}; ${COLUMN_BUFFER_WIDTH}; ` as Code &
              Clause)
        : (`${isC4 ? `${DO_NOT_TOUCH_LEDGER_LINE_SPACING}; ` : ""}nt; ${COLUMN_BUFFER_WIDTH}; ` as Code &
              Clause)
}

export { computeNoteAndRighthandSpaceClause }
