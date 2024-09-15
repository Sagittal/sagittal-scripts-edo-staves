import { computeRange, Count, Index, max, Max } from "@sagittal/general"
import { StepCountsByStave } from "../types"
import { EdoStep } from "@sagittal/system"

const alignParametersByColumn = <T>(
    diagramStepParameters: T[],
    stepCountsByStave: StepCountsByStave,
): T[][] => {
    let furthestStepAligned: Index<EdoStep> = 0 as Index<EdoStep>

    return stepCountsByStave.map((stepCountByStave: Count<EdoStep>): T[] => {
        const diagramStepParametersStave: T[] = diagramStepParameters.slice(
            furthestStepAligned,
            furthestStepAligned + stepCountByStave,
        )

        furthestStepAligned = (furthestStepAligned +
            stepCountByStave) as Index<EdoStep>

        return diagramStepParametersStave
    })
}

const applyByColumns = <T, U>(
    aligneddiagramStepParameters: T[][],
    stepCountsByStave: StepCountsByStave,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] => {
    const maxStaveLength: Max<Count<EdoStep>> = max(...stepCountsByStave)

    return computeRange(maxStaveLength).map((columnIndex: number): U => {
        const diagramStepParametersColumn: T[] = aligneddiagramStepParameters.map(
            (aligneddiagramStepParametersStave: T[]): T =>
                aligneddiagramStepParametersStave[columnIndex] || fallbackValue,
        )

        return columnFunction(diagramStepParametersColumn)
    })
}

const computeResultByColumn = <T, U>(
    diagramStepParameters: T[],
    stepCountsByStave: StepCountsByStave,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] =>
    applyByColumns(
        alignParametersByColumn(
            diagramStepParameters,
            stepCountsByStave,
        ),
        stepCountsByStave,
        columnFunction,
        fallbackValue,
    )

export { computeResultByColumn }
