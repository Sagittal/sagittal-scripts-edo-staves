import { Octals } from "staff-code"
import { Index, Max } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Stave } from "../../types"
import { StepCountsByStave } from "../types"
import { computeResultByColumn } from "./column"

const computeColumnWidths = (
    widths: Octals[],
    stepCountsByStave: StepCountsByStave,
): Max<Octals>[] =>
    computeResultByColumn(
        widths,
        stepCountsByStave,
        (columnWidths: Octals[]) => Math.max(...columnWidths) as Max<Octals>,
        0 as Octals,
    )

const computeColumnWidth = ({
    stepCountsByStave,
    widths,
    step,
}: {
    stepCountsByStave: StepCountsByStave
    widths: Octals[]
    step: EdoStep
}): Octals => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    const columnWidths: Max<Octals>[] = computeColumnWidths(
        widths,
        stepCountsByStave,
    )

    while (stepCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - stepCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnWidths[cursor] as Octals
}

const computeLefthandSpacing = ({
    widths,
    step,
    stepCountsByStave,
}: {
    stepCountsByStave: StepCountsByStave
    widths: Octals[]
    step: EdoStep
}): Octals =>
    (computeColumnWidth({ stepCountsByStave, widths, step }) -
        widths[step]) as Octals

export { computeLefthandSpacing }
