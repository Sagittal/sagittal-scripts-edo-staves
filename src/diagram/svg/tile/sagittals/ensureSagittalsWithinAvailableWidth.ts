import { Max, max, Multiplier, Px } from "@sagittal/general"
import { AVAILABLE_WIDTH_FOR_SAGITTALS } from "../../constants"
import { furtherTransform } from "../../transform"
import { NodeElement } from "../../types"
import { getGroupWidth } from "../../width"

const TRANSLATION_ADJUSTMENT_MULTIPLIER: Multiplier = 25 as Multiplier

const ensureSagittalsWithinAvailableWidth = (
    sagittalTileRowGroupElements: NodeElement<SVGGElement>[],
): void => {
    const sagittalsWidths: Px[] = sagittalTileRowGroupElements.map(
        (sagittalRowGroupElement: NodeElement<SVGGElement>) => getGroupWidth(sagittalRowGroupElement),
    )
    const maxSagittalsWidth: Max<Px> = max(...sagittalsWidths)

    if (maxSagittalsWidth > AVAILABLE_WIDTH_FOR_SAGITTALS) {
        const multiplierToKeepSagittalsWithinAvailableWidth: Multiplier = (AVAILABLE_WIDTH_FOR_SAGITTALS /
            maxSagittalsWidth) as Multiplier

        sagittalTileRowGroupElements.forEach((sagittalRowGroupElement: NodeElement<SVGGElement>): void => {
            const xTranslation: Px = ((1 - multiplierToKeepSagittalsWithinAvailableWidth) *
                TRANSLATION_ADJUSTMENT_MULTIPLIER) as Px
            const yTranslation: Px = ((1 - multiplierToKeepSagittalsWithinAvailableWidth) *
                TRANSLATION_ADJUSTMENT_MULTIPLIER) as Px

            furtherTransform(sagittalRowGroupElement, {
                xTranslation,
                yTranslation,
                scale: multiplierToKeepSagittalsWithinAvailableWidth,
            })
        })
    }
}

export { ensureSagittalsWithinAvailableWidth }
