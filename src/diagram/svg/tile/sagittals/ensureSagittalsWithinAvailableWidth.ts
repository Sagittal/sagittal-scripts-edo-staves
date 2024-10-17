import { Max, max, Px } from "@sagittal/general"
import { getGroupWidth } from "../../width"
import { NodeElement, Scaler } from "../../types"
import { AVAILABLE_WIDTH_FOR_SAGITTALS } from "../../constants"
import { furtherTransform } from "../../transform"

const TRANSLATION_ADJUSTMENT_SCALER: Scaler = 25 as Scaler

const ensureSagittalsWithinAvailableWidth = (
    sagittalTileRowGroupElements: NodeElement<SVGGElement>[],
): void => {
    const sagittalsWidths: Px[] = sagittalTileRowGroupElements.map(
        (sagittalRowGroupElement: NodeElement<SVGGElement>) =>
            getGroupWidth(sagittalRowGroupElement),
    )
    const maxSagittalsWidth: Max<Px> = max(...sagittalsWidths)

    if (maxSagittalsWidth > AVAILABLE_WIDTH_FOR_SAGITTALS) {
        const scalerToKeepSagittalsWithinAvailableWidth: Scaler =
            (AVAILABLE_WIDTH_FOR_SAGITTALS / maxSagittalsWidth) as Scaler

        sagittalTileRowGroupElements.forEach(
            (sagittalRowGroupElement: NodeElement<SVGGElement>): void => {
                const xTranslation: Px = ((1 -
                    scalerToKeepSagittalsWithinAvailableWidth) *
                    TRANSLATION_ADJUSTMENT_SCALER) as Px
                const yTranslation: Px = ((1 -
                    scalerToKeepSagittalsWithinAvailableWidth) *
                    TRANSLATION_ADJUSTMENT_SCALER) as Px

                furtherTransform(sagittalRowGroupElement, {
                    xTranslation,
                    yTranslation,
                    scale: scalerToKeepSagittalsWithinAvailableWidth,
                })
            },
        )
    }
}

export { ensureSagittalsWithinAvailableWidth }
