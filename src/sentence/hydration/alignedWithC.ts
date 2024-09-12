import { computeRange, Count, Index, max, Max } from "@sagittal/general"
import { Edo, EdoStep, Link } from "@sagittal/system"
import { NoteCountsByStave } from "./types"
import { Note, Stave } from "../types"

const C_LINK_INDICES: Index<Link>[] = [/*-16, -9, */ -2, 5, 12] as Index<Link>[] // TODO: make good

const computeIsC4 = (linkIndex: Index<Link>, step: EdoStep, edo: Edo): boolean =>
    C_LINK_INDICES.includes(linkIndex) && step < edo / 2 

const computeColumnHasC4 = (
    columnHasC4s: boolean[],
    step: EdoStep,
    noteCountsByStave: NoteCountsByStave,
): boolean => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    // const columnWidths: Max<Octals>[] = computeColumnWidths(
    //     edoStepNotationWidths,
    //     noteCountsByStave,
    // )

    while (noteCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - noteCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }
    // console.log(columnHasC4s[cursor])

    return columnHasC4s[cursor] as boolean
}
// TODO: I don't think we should combine stuff from the zip and extract/gather steps. I think we should make subfolders with parallel named files
const computeIsAlignedWithC4 = ({
    edoStepNotationAreC4s,
    edoStep,
    noteCountsByStave,
}: {
    edoStepNotationAreC4s: boolean[]
    edoStep: EdoStep
    noteCountsByStave: NoteCountsByStave
}): boolean => {
    // TODO: dry up with spacing.ts

    let furthestNoteAligned: Index<Note> = 0 as Index<Note>
    const alignedEdoStepNotationAreCs: boolean[][] = noteCountsByStave.map(
        (noteCountByStave: Count<Note>): boolean[] => {
            return edoStepNotationAreC4s.slice(
                furthestNoteAligned,
                (furthestNoteAligned += noteCountByStave),
            )
            // furthestNoteAligned += noteCountByStave
            // return answer
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

            return columnAreC4s.some((isC) => !!isC) as boolean
        },
    )

    // console.log("columnHasC4s: ", columnHasC4s)

    return computeColumnHasC4(columnHasC4s, edoStep, noteCountsByStave)

    // return false
}

export { computeIsC4, computeIsAlignedWithC4 }
