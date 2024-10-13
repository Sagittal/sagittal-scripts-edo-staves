import { Max, max, Px } from "@sagittal/general"
import { getGroupWidth } from "../../width"
import { NodeElement } from "../../types"
import { AVAILABLE_WIDTH_FOR_SAGITTALS } from "../../constants"
import { computeExistingTransform } from "../../shift"

const SCALE_TRANSFORM_ADJUSTMENT_FACTOR: number = 25

const ensureSagittalsWithinAvailableWidth = (
    sagittalRowGroupElements: NodeElement<SVGGElement>[],
) => {
    const sagittalsWidths: Px[] = sagittalRowGroupElements.map(
        (sagittalRowGroupElement: NodeElement<SVGGElement>) =>
            getGroupWidth(sagittalRowGroupElement),
    )
    const maxSagittalsWidth: Max<Px> = max(...sagittalsWidths)

    if (maxSagittalsWidth > AVAILABLE_WIDTH_FOR_SAGITTALS) {
        sagittalRowGroupElements.forEach(
            (sagittalRowGroupElement: NodeElement<SVGGElement>): void => {
                const scaleFactorToKeepSagittalsWithinAvailableWidth: number =
                    AVAILABLE_WIDTH_FOR_SAGITTALS / maxSagittalsWidth

                const xTransformAdjustment: Px = ((1 -
                    scaleFactorToKeepSagittalsWithinAvailableWidth) *
                    SCALE_TRANSFORM_ADJUSTMENT_FACTOR) as Px
                const yTransformAdjustment: Px = ((1 -
                    scaleFactorToKeepSagittalsWithinAvailableWidth) *
                    SCALE_TRANSFORM_ADJUSTMENT_FACTOR) as Px

                const { xTransformExisting, yTransformExisting } =
                    computeExistingTransform(sagittalRowGroupElement)
                const xTransformNew: Px = (xTransformExisting +
                    xTransformAdjustment) as Px
                const yTransformNew: Px = (yTransformExisting +
                    yTransformAdjustment) as Px

                sagittalRowGroupElement.setAttribute(
                    "transform",
                    `translate(${xTransformNew} ${yTransformNew}) scale(${scaleFactorToKeepSagittalsWithinAvailableWidth})`,
                )
            },
        )
    }
}

export { ensureSagittalsWithinAvailableWidth }
