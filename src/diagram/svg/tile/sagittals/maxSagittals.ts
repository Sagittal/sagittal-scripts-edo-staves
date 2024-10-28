import { Count, Max, Multiplier } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { TILE_ROW_FOR_EDO } from "../constants"
import { DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET } from "../constants"
import { TileRow } from "../types"

const MAX_SAGITTALS_PER_TILE_ROW_FOR_DEFAULT_TILE_ROW_COUNT: Max<Count<Sagittal>> = 6 as Max<Count<Sagittal>>

const computeMaxSagittalsForTileRowCount = (tileRowCount: Count<TileRow>): Max<Count<Sagittal>> => {
    if (tileRowCount === TILE_ROW_FOR_EDO) return 0 as Max<Count<Sagittal>>
    if (tileRowCount === DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET)
        return MAX_SAGITTALS_PER_TILE_ROW_FOR_DEFAULT_TILE_ROW_COUNT

    const sagittalTileRowCount: Count<TileRow<Sagittal>> = (tileRowCount - TILE_ROW_FOR_EDO) as Count<
        TileRow<Sagittal>
    >
    const multiplierForThisTileRowCountIncrement: Multiplier = ((tileRowCount + 1) /
        tileRowCount) as Multiplier

    const maxSagittalsPerTileRow: Max<Count<Sagittal>> = ((computeMaxSagittalsForTileRowCount(
        (tileRowCount - 1) as Count<TileRow>,
    ) /
        (sagittalTileRowCount - 1)) *
        multiplierForThisTileRowCountIncrement) as Max<Count<Sagittal>>

    return (maxSagittalsPerTileRow * sagittalTileRowCount) as Max<Count<Sagittal>>
}

export { computeMaxSagittalsForTileRowCount }
