import { Index } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import { StepCountsByStave, SituationReC4 } from "../types"
import { Stave } from "../../types"
import { computeResultByEdoStepNotationColumn } from "./column"

const computeColumnHasC4 = (
    columnHasC4s: boolean[],
    step: EdoStep,
    stepCountsByStave: StepCountsByStave,
): boolean => {
    let cursor: EdoStep = step
    let staveIndex: Index<Stave> = 0 as Index<Stave>

    while (stepCountsByStave[staveIndex] <= cursor) {
        cursor = (cursor - stepCountsByStave[staveIndex]) as EdoStep
        staveIndex++
    }

    return columnHasC4s[cursor] as boolean
}

const computeSituationReC4 = ({
    edoStepNotationAreC4s,
    edoStep,
    stepCountsByStave,
}: {
    edoStepNotationAreC4s: boolean[]
    edoStep: EdoStep
    stepCountsByStave: StepCountsByStave
}): SituationReC4 => {
    if (edoStepNotationAreC4s[edoStep]) return SituationReC4.IS_C4

    const columnHasC4s: boolean[] = computeResultByEdoStepNotationColumn(
        edoStepNotationAreC4s,
        stepCountsByStave,
        (columnAreC4s: boolean[]): boolean =>
            columnAreC4s.some((isC4: boolean): boolean => !!isC4),
        false,
    )

    return computeColumnHasC4(columnHasC4s, edoStep, stepCountsByStave)
        ? SituationReC4.ALIGNED_WITH_A_C4
        : SituationReC4.NEITHER
}

export { computeSituationReC4 }
