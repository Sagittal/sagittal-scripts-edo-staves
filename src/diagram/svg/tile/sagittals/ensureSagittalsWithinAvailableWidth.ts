import { Max, max, Px } from "@sagittal/general"
import { getGroupWidth } from "../../width"
import { NodeElement, Scaler } from "../../types"
import { AVAILABLE_WIDTH_FOR_SAGITTALS } from "../../constants"
import { furtherTransform } from "../../transform"
import { NEUTRAL_SCALER } from "./constants"

const TRANSLATION_ADJUSTMENT_SCALER: Scaler = 25 as Scaler

const ensureSagittalsWithinAvailableWidthAndGetScaler = (
    sagittalTileRowGroupElements: NodeElement<SVGGElement>[],
): Scaler => {
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

        return 1 / scalerToKeepSagittalsWithinAvailableWidth as Scaler
    } else {
        return NEUTRAL_SCALER
    }
}

export { ensureSagittalsWithinAvailableWidthAndGetScaler }
