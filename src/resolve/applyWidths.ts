import { Octals } from "staff-code"
import { Index, Max, Column } from "@sagittal/general"
import { IntermediateForm, IntermediateFormWithSimpleWidth } from "./types"

const computeLefthandSpacingForAlignment = (
    { columnWidths, columnIndex, intermediateFormWithSimpleWidth }: {
        columnWidths: Max<Octals>[],
        columnIndex: Index<Column>,
        intermediateFormWithSimpleWidth: IntermediateFormWithSimpleWidth,
    }
): Octals =>
    columnWidths[columnIndex] - intermediateFormWithSimpleWidth.width as Octals

const applyColumnWidths = (patternedIntermediateFormsWithSimpleWidths: IntermediateFormWithSimpleWidth[][], columnWidths: Max<Octals>[]): IntermediateForm[][] =>
    patternedIntermediateFormsWithSimpleWidths.map((patternedIntermediateFormsWithSimpleWidthsStave: IntermediateFormWithSimpleWidth[]): IntermediateForm[] =>
        patternedIntermediateFormsWithSimpleWidthsStave.map((intermediateFormWithSimpleWidth: IntermediateFormWithSimpleWidth, columnIndex: number): IntermediateForm => ({
            ...intermediateFormWithSimpleWidth,
            lefthandSpacingForAlignment: computeLefthandSpacingForAlignment({ columnWidths, columnIndex: columnIndex as Index<Column>, intermediateFormWithSimpleWidth })
        })
        )
    )

export {
    applyColumnWidths,
}
