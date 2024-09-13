import { Code, computeCodewordWidth, Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { Clause, Word } from "@sagittal/general"
import { AssemblyState } from "./types"
import { SituationReC4 } from "../hydration"

const NOTE_WIDTH: Octals = computeCodewordWidth("ntqrup" as Code & Word) // "nt" is only an alias. the width is 13
const DO_NOT_TOUCH_LEDGER_LINE_SPACING: Octals = 2 as Octals

const computeNoteAndRighthandSpaceClause = ({
    assemblyState,
    subsetExcluded,
    situationReC4,
}: {
    assemblyState: AssemblyState
    subsetExcluded: boolean
    situationReC4: SituationReC4
}): Code & Clause => {
    assemblyState.stepCount++

    const maybeLedgerLineAvoidanceSpacing: Code & Clause =
        situationReC4 === SituationReC4.IS_C4
            ? (`${DO_NOT_TOUCH_LEDGER_LINE_SPACING}; ` as Code & Clause)
            : ("" as Code & Clause)

    const maybeNote: Code & Clause = subsetExcluded
        ? (`${NOTE_WIDTH}; ` as Code & Clause)
        : ("nt; " as Code & Clause)

    return `${maybeLedgerLineAvoidanceSpacing}${maybeNote}${COLUMN_BUFFER_WIDTH}; ` as Code &
        Clause
}

export { computeNoteAndRighthandSpaceClause }
