import { Octals } from "staff-code"
import { Index, Max, Column, isUndefined, computeRange, Count, max, Maybe } from "@sagittal/general"
import { Note } from "../types"
import { HydratedEdoStepNotation, PartiallyHydratedEdoStepNotation } from "./types"

const computeLefthandSpacing = (
    { columnWidths, columnIndex, partiallyHydratedEdoStepNotation }: {
        columnWidths: Max<Octals>[],
        columnIndex: Index<Column>,
        partiallyHydratedEdoStepNotation: PartiallyHydratedEdoStepNotation,
    }
): Octals =>
    columnWidths[columnIndex] - partiallyHydratedEdoStepNotation.width as Octals

const computeColumnWidths = (alignedAndPartiallyHydratedEdoStepNotations: PartiallyHydratedEdoStepNotation[][]): Max<Octals>[] => {
    const maxStaveLength: Max<Count<Note>> = max(...alignedAndPartiallyHydratedEdoStepNotations.map(
        (alignedAndPartiallyHydratedEdoStepNotationsStave: PartiallyHydratedEdoStepNotation[]) =>
            alignedAndPartiallyHydratedEdoStepNotationsStave.length as Count<Note>
    ))

    return computeRange(maxStaveLength).map((columnIndex: number): Max<Octals> =>
        alignedAndPartiallyHydratedEdoStepNotations.reduce(
            (maximumWidthOfNotationInThisColumn: Max<Octals>, alignedAndPartiallyHydratedEdoStepNotationsStave: PartiallyHydratedEdoStepNotation[]): Max<Octals> => {
                const partiallyHydratedEdoStepNotation: Maybe<PartiallyHydratedEdoStepNotation> = alignedAndPartiallyHydratedEdoStepNotationsStave[columnIndex]
                const width = isUndefined(partiallyHydratedEdoStepNotation) ? 0 : partiallyHydratedEdoStepNotation.width

                return Math.max(maximumWidthOfNotationInThisColumn, width) as Max<Octals>
            },
            0 as Max<Octals>
        )
    )
}

const fullyHydrateEdoStepNotations = (alignedAndPartiallyHydratedEdoStepNotations: PartiallyHydratedEdoStepNotation[][]): HydratedEdoStepNotation[][] => {
    const columnWidths: Max<Octals>[] = computeColumnWidths(alignedAndPartiallyHydratedEdoStepNotations)

    return alignedAndPartiallyHydratedEdoStepNotations.map((alignedAndPartiallyHydratedEdoStepNotationsStave: PartiallyHydratedEdoStepNotation[]): HydratedEdoStepNotation[] =>
        alignedAndPartiallyHydratedEdoStepNotationsStave.map((partiallyHydratedEdoStepNotation: PartiallyHydratedEdoStepNotation, columnIndex: number): HydratedEdoStepNotation => ({
            ...partiallyHydratedEdoStepNotation,
            lefthandSpacing: computeLefthandSpacing({ columnWidths, columnIndex: columnIndex as Index<Column>, partiallyHydratedEdoStepNotation })
        })
        )
    )
}

export {
    fullyHydrateEdoStepNotations,
}
