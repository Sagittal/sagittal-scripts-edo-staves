import { Octals } from "staff-code"
import { isUndefined, computeRange, Count, max, Max } from "@sagittal/general"
import { Note } from "../types"
import { IntermediateFormWithSimpleWidth } from "./types"

const computeColumnWidths = (patternedIntermediateFormsWithSimpleWidths: IntermediateFormWithSimpleWidth[][]): Max<Octals>[] => {
    const maxLineLength: Max<Count<Note>> = max(...patternedIntermediateFormsWithSimpleWidths.map((line: IntermediateFormWithSimpleWidth[]) => line.length as Count<Note>))

    return computeRange(maxLineLength).map((columnIndex: number): Max<Octals> =>
        patternedIntermediateFormsWithSimpleWidths.reduce(
            (maximumWidthOfNotationInThisColumn: Max<Octals>, patternedIntermediateFormsWithSimpleWidthsStave: IntermediateFormWithSimpleWidth[]): Max<Octals> => {
                const maybePatternedIntermediateForm = patternedIntermediateFormsWithSimpleWidthsStave[columnIndex]
                const width = isUndefined(maybePatternedIntermediateForm) ? 0 : maybePatternedIntermediateForm.width

                return Math.max(maximumWidthOfNotationInThisColumn, width) as Max<Octals>
            },
            0 as Max<Octals>
        )
    )
}

export {
    computeColumnWidths,
}
