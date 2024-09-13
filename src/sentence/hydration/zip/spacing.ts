import { Octals } from "staff-code"
import { Index, Max } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Stave } from "../../types"
import { StepCountsByStave } from "../types"
import { computeResultByEdoStepNotationColumn } from "./column"

const computeColumnWidths = (
    edoStepNotationWidths: Octals[],
    stepCountsByStave: StepCountsByStave,
): Max<Octals>[] =>
    computeResultByEdoStepNotationColumn(
        edoStepNotationWidths,
        stepCountsByStave,
        (columnWidths: Octals[]) => Math.max(...columnWidths) as Max<Octals>,
        0 as Octals,
    )

const computeColumnWidth = ({
    stepCountsByStave,
    edoStepNotationWidths,
    step,
}: {
    stepCountsByStave: StepCountsByStave
    edoStepNotationWidths: Octals[]
    step: EdoStep
}): Octals => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    const columnWidths: Max<Octals>[] = computeColumnWidths(
        edoStepNotationWidths,
        stepCountsByStave,
    )

    while (stepCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - stepCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnWidths[cursor] as Octals
}

const computeLefthandSpacing = ({
    edoStepNotationWidths,
    step,
    stepCountsByStave,
}: {
    stepCountsByStave: StepCountsByStave
    edoStepNotationWidths: Octals[]
    step: EdoStep
}): Octals =>
    (computeColumnWidth({ stepCountsByStave, edoStepNotationWidths, step }) -
        edoStepNotationWidths[step]) as Octals

export { computeLefthandSpacing }
