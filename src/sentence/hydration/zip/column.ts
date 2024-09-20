import { computeRange, Count, Index, max, Max } from "@sagittal/general"
import { Folding } from "../types"
import { EdoStep } from "@sagittal/system"

const alignParametersByColumn = <T>(
    diagramStepParameters: T[],
    folding: Folding,
): T[][] => {
    let furthestStepAligned: Index<EdoStep> = 0 as Index<EdoStep>

    return folding.map((stepCountByStave: Count<EdoStep>): T[] => {
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
    alignedDiagramStepParameters: T[][],
    folding: Folding,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] => {
    const maxStaveLength: Max<Count<EdoStep>> = max(...folding)

    return computeRange(maxStaveLength).map((columnIndex: number): U => {
        const diagramStepParametersColumn: T[] =
            alignedDiagramStepParameters.map(
                (alignedDiagramStepParametersStave: T[]): T =>
                    alignedDiagramStepParametersStave[columnIndex] ||
                    fallbackValue,
            )

        return columnFunction(diagramStepParametersColumn)
    })
}

const computeResultByColumn = <T, U>(
    diagramStepParameters: T[],
    folding: Folding,
    columnFunction: (column: T[]) => U,
    fallbackValue: T,
): U[] =>
    applyByColumns(
        alignParametersByColumn(diagramStepParameters, folding),
        folding,
        columnFunction,
        fallbackValue,
    )

export { computeResultByColumn }
