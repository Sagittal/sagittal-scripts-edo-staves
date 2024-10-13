import { Count, Max } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { TILE_ROW_FOR_EDO } from "../constants"
import { DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET } from "../constants"

const MAX_SAGITTALS_PER_ROW_FOR_DEFAULT_ROW_COUNT: Max<Count<Sagittal>> =
    6 as Max<Count<Sagittal>>

const computeMaxSagittalsForTileRowCount = (
    tileRowCount: Count,
): Max<Count<Sagittal>> => {
    if (tileRowCount === TILE_ROW_FOR_EDO) return 0 as Max<Count<Sagittal>>
    if (
        tileRowCount ===
        DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET
    )
        return MAX_SAGITTALS_PER_ROW_FOR_DEFAULT_ROW_COUNT

    const tileRowCountForSagittals: Count = (tileRowCount -
        TILE_ROW_FOR_EDO) as Count
    const sizeProportionForThisTileRowCountIncrement: number =
        (tileRowCount + 1) / tileRowCount

    const maxSagittalsPerTileRow: Max<Count<Sagittal>> =
        ((computeMaxSagittalsForTileRowCount((tileRowCount - 1) as Count) /
            (tileRowCountForSagittals - 1)) *
            sizeProportionForThisTileRowCountIncrement) as Max<Count<Sagittal>>

    return (maxSagittalsPerTileRow * tileRowCountForSagittals) as Max<
        Count<Sagittal>
    >
}

export { computeMaxSagittalsForTileRowCount }
