import { Code, computeCodewordWidth, Octals } from "staff-code"
import {
    Index,
    Max,
    isUndefined,
    computeRange,
    Count,
    max,
    Column,
    Word,
} from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { Note, Stave } from "../types"
import { NoteCountsByStave } from "./types"

const computeColumnWidths = (
    edoStepNotationWidths: Octals[],
    noteCountsByStave: NoteCountsByStave,
): Max<Octals>[] => {
    let furthestNoteAligned: Index<Note> = 0 as Index<Note>
    const alignedEdoStepNotationWidths: Octals[][] = noteCountsByStave.map(
        (noteCountByStave: Count<Note>): Octals[] => {
            return edoStepNotationWidths.slice(
                furthestNoteAligned,
                (furthestNoteAligned += noteCountByStave),
            )
            // furthestNoteAligned += noteCountByStave
            // return answer
        },
    )
    const maxStaveLength: Max<Count<Note>> = max(...noteCountsByStave)
    return computeRange(maxStaveLength).map(
        (columnIndex: number): Max<Octals> => {
            const columnWidths = alignedEdoStepNotationWidths.map((alignedEdoStepNotationWidthStave) => {
                return alignedEdoStepNotationWidthStave[columnIndex] || 0
            })

            return Math.max(...columnWidths) as Max<Octals>
        },
    )

    // TODO: this has a bug. it allows as you go to the right,
    // if some row other than the last row has fewer than the max cols,
    // then you'll just wrap to the next row instead of actually finding undefined

    // const maxStaveLength: Max<Count<Note>> = max(...noteCountsByStave)

    // let cursor: EdoStep = 0 as EdoStep
    // const initialStepsOfEachStave: EdoStep[] = noteCountsByStave.map(
    //     (staveNoteCount: Count<Note>): EdoStep => {
    //         const cursorBeforeIncrementing: EdoStep = cursor
    //         cursor = (cursor + staveNoteCount) as EdoStep

    //         return cursorBeforeIncrementing
    //     },
    // )

    // return computeRange(maxStaveLength).map(
    //     (columnIndex: number): Max<Octals> => {
    //         const columnIndices: Index<Column>[] = initialStepsOfEachStave.map(
    //             (initialStepOfStave: EdoStep): Index<Column> =>
    //                 (initialStepOfStave + columnIndex) as Index<Column>,
    //         )

    //         const columnWidths: Octals[] = columnIndices.map(
    //             (columnIndex: Index<Column>) =>
    //                 isUndefined(edoStepNotationWidths[columnIndex])
    //                     ? (0 as Octals)
    //                     : edoStepNotationWidths[columnIndex],
    //         )

    //         return Math.max(...columnWidths) as Max<Octals>
    //     },
    // )
}

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

const computeWidth = ({
    sagittalCodewords,
    whorlCodewords,
}: {
    sagittalCodewords: (Code & Word)[]
    whorlCodewords: (Code & Word)[]
}) => {
    const whorlWidth: Octals = whorlCodewords.reduce(
        (totalWidth: Octals, whorlCodeword: Code & Word): Octals =>
            (totalWidth + computeCodewordWidth(whorlCodeword)) as Octals,
        0 as Octals,
    )
    const sagittalWidth: Octals = sagittalCodewords.reduce(
        (totalWidth: Octals, sagittalCodeword: Code & Word): Octals =>
            (totalWidth + computeCodewordWidth(sagittalCodeword)) as Octals,
        0 as Octals,
    )

    return (whorlWidth + sagittalWidth) as Octals
}

export { computeLefthandSpacing, computeWidth }
