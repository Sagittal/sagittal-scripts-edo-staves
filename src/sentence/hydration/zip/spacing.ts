import { Octals } from "staff-code"
import { Index, Max } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Stave } from "../../types"
import { NoteCountsByStave } from "../types"
import { computeResultByEdoStepNotationColumn } from "./column"

const computeColumnWidths = (
    edoStepNotationWidths: Octals[],
    noteCountsByStave: NoteCountsByStave,
): Max<Octals>[] =>
    computeResultByEdoStepNotationColumn(
        edoStepNotationWidths,
        noteCountsByStave,
        (columnWidths: Octals[]) => Math.max(...columnWidths) as Max<Octals>,
        0 as Octals,
    )

const computeColumnWidth = ({
    noteCountsByStave,
    edoStepNotationWidths,
    step,
}: {
    noteCountsByStave: NoteCountsByStave
    edoStepNotationWidths: Octals[]
    step: EdoStep
}): Octals => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    const columnWidths: Max<Octals>[] = computeColumnWidths(
        edoStepNotationWidths,
        noteCountsByStave,
    )

    while (noteCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - noteCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnWidths[cursor] as Octals
}

const computeLefthandSpacing = ({
    edoStepNotationWidths,
    step,
    noteCountsByStave,
}: {
    noteCountsByStave: NoteCountsByStave
    edoStepNotationWidths: Octals[]
    step: EdoStep
}): Octals =>
    (computeColumnWidth({ noteCountsByStave, edoStepNotationWidths, step }) -
        edoStepNotationWidths[step]) as Octals

export { computeLefthandSpacing }
