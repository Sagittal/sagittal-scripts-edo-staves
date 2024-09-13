import { computeRange, Count, Index, max, Max } from "@sagittal/general"
import { StepCountsByStave } from "../types"
import { EdoStep } from "@sagittal/system"

const alignEdoStepNotationDataByColumn = <T>(
    edoStepNotationData: T[],
    stepCountsByStave: StepCountsByStave,
): T[][] => {
    let furthestStepAligned: Index<EdoStep> = 0 as Index<EdoStep>

    return stepCountsByStave.map((stepCountByStave: Count<EdoStep>): T[] => {
        const edoStepNotationDataStave: T[] = edoStepNotationData.slice(
            furthestStepAligned,
            furthestStepAligned + stepCountByStave,
        )

        furthestStepAligned = (furthestStepAligned +
            stepCountByStave) as Index<EdoStep>

        return edoStepNotationDataStave
    })
}

const applyByEdoStepNotationColumns = <T, U>(
    alignedEdoStepNotationData: T[][],
    stepCountsByStave: StepCountsByStave,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] => {
    const maxStaveLength: Max<Count<EdoStep>> = max(...stepCountsByStave)

    return computeRange(maxStaveLength).map((columnIndex: number): U => {
        const edoStepNotationDataColumn: T[] = alignedEdoStepNotationData.map(
            (alignedEdoStepNotationDataStave: T[]): T =>
                alignedEdoStepNotationDataStave[columnIndex] || fallbackValue,
        )

        return columnFunction(edoStepNotationDataColumn)
    })
}

const computeResultByEdoStepNotationColumn = <T, U>(
    edoStepNotationData: T[],
    stepCountsByStave: StepCountsByStave,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] =>
    applyByEdoStepNotationColumns(
        alignEdoStepNotationDataByColumn(
            edoStepNotationData,
            stepCountsByStave,
        ),
        stepCountsByStave,
        columnFunction,
        fallbackValue,
    )

export { computeResultByEdoStepNotationColumn }
