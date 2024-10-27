import { EdoStep, Index } from "@sagittal/general"
import { Folding, SituationReC4 } from "../types"
import { Stave } from "../../types"
import { computeResultByColumn } from "./column"

const computeColumnHasC4 = (columnHasC4s: boolean[], step: EdoStep, folding: Folding): boolean => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    while (folding[staveIndex] <= cursor) {
        cursor = (cursor - folding[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnHasC4s[cursor] as boolean
}

const computeSituationReC4 = ({
    areC4s,
    edoStep,
    folding,
}: {
    areC4s: boolean[]
    edoStep: EdoStep
    folding: Folding
}): SituationReC4 => {
    if (areC4s[edoStep]) return SituationReC4.IS_C4

    const columnHasC4s: boolean[] = computeResultByColumn(
        areC4s,
        folding,
        (columnAreC4s: boolean[]): boolean => columnAreC4s.some((isC4: boolean): boolean => !!isC4),
        false,
    )

    return computeColumnHasC4(columnHasC4s, edoStep, folding)
        ? SituationReC4.ALIGNED_WITH_A_C4
        : SituationReC4.NEITHER
}

export { computeSituationReC4 }
