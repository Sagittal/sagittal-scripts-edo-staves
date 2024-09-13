import { Index } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { NoteCountsByStave, SituationReC4 } from "../types"
import { Stave } from "../../types"
import { computeResultByEdoStepNotationColumn } from "./column"

const computeColumnHasC4 = (
    columnHasC4s: boolean[],
    step: EdoStep,
    noteCountsByStave: NoteCountsByStave,
): boolean => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    while (noteCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - noteCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnHasC4s[cursor] as boolean
}

const computeSituationReC4 = ({
    edoStepNotationAreC4s,
    edoStep,
    noteCountsByStave,
}: {
    edoStepNotationAreC4s: boolean[]
    edoStep: EdoStep
    noteCountsByStave: NoteCountsByStave
}): SituationReC4 => {
    if (edoStepNotationAreC4s[edoStep]) return SituationReC4.IS_C4

    const columnHasC4s: boolean[] = computeResultByEdoStepNotationColumn(
        edoStepNotationAreC4s,
        noteCountsByStave,
        (columnAreC4s: boolean[]): boolean =>
            columnAreC4s.some((isC4: boolean): boolean => !!isC4),
        false,
    )

    return computeColumnHasC4(columnHasC4s, edoStep, noteCountsByStave)
        ? SituationReC4.ALIGNED_WITH_A_C4
        : SituationReC4.NEITHER
}

export { computeSituationReC4 }
