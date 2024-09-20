import { Octals } from "staff-code"
import { Index, Max } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Stave } from "../../types"
import { Folding } from "../types"
import { computeResultByColumn } from "./column"

const computeColumnWidths = (
    widths: Octals[],
    folding: Folding,
): Max<Octals>[] =>
    computeResultByColumn(
        widths,
        folding,
        (columnWidths: Octals[]) => Math.max(...columnWidths) as Max<Octals>,
        0 as Octals,
    )

const computeColumnWidth = ({
    folding,
    widths,
    step,
}: {
    folding: Folding
    widths: Octals[]
    step: EdoStep
}): Octals => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    const columnWidths: Max<Octals>[] = computeColumnWidths(widths, folding)

    while (folding[staveIndex] <= cursor) {
        cursor = (cursor - folding[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnWidths[cursor] as Octals
}

const computeLefthandSpacing = ({
    widths,
    step,
    folding,
}: {
    folding: Folding
    widths: Octals[]
    step: EdoStep
}): Octals =>
    (computeColumnWidth({ folding, widths, step }) - widths[step]) as Octals

export { computeLefthandSpacing }
