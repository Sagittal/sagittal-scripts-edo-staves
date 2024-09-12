import { computeRange, Count, Index, max, Max } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { NoteCountsByStave, SituationReC4 } from "../types"
import { Note, Stave } from "../../types"

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

// TODO: dry all the stuff up in here with spacing.ts in the extractAndGather folder

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

    let furthestNoteAligned: Index<Note> = 0 as Index<Note>
    const alignedEdoStepNotationAreCs: boolean[][] = noteCountsByStave.map(
        (noteCountByStave: Count<Note>): boolean[] => {
            const edoStepNotationAreC4sStave: boolean[] =
                edoStepNotationAreC4s.slice(
                    furthestNoteAligned,
                    furthestNoteAligned + noteCountByStave,
                )

            furthestNoteAligned = (furthestNoteAligned +
                noteCountByStave) as Index<Note>

            return edoStepNotationAreC4sStave
        },
    )

    const maxStaveLength: Max<Count<Note>> = max(...noteCountsByStave)
    const columnHasC4s: boolean[] = computeRange(maxStaveLength).map(
        (columnIndex: number): boolean => {
            const columnAreC4s = alignedEdoStepNotationAreCs.map(
                (alignedEdoStepNotationAreCsStave) => {
                    return alignedEdoStepNotationAreCsStave[columnIndex]
                },
            )

            return columnAreC4s.some((isC: boolean): boolean => isC)
        },
    )

    return computeColumnHasC4(columnHasC4s, edoStep, noteCountsByStave)
        ? SituationReC4.ALIGNED_WITH_A_C4
        : SituationReC4.NEITHER
}

export { computeSituationReC4 }
