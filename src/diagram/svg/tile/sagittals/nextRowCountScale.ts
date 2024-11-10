import { Count, max, Max, Multiplier } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { TileRow } from "../types"
import { NEUTRAL_MULTIPLIER } from "./constants"
import { computeSagittalCountsByTileRow } from "./sagittalCountsByTileRow"

// This computes the scale factor for sizing sagittals down as much as (but no further than) the size of sagittals
// at their max size at the sagittal per row count for the next row count but before actually adding the next row

const computeDownToNextTileRowCountsMultiplier = (sagittalCount: Count<Sagittal>): Multiplier => {
    let sagittalTileRowCount: Count<TileRow<Sagittal>> = 1 as Count<TileRow<Sagittal>>
    let maxFullSizeSagittalsPerTileRow: Max<Count<Sagittal>> = 4 as Max<Count<Sagittal>>
    let maxSagittalsPerTileRow: Max<Count<Sagittal>> = 6 as Max<Count<Sagittal>>

    while (sagittalCount > sagittalTileRowCount * maxSagittalsPerTileRow) {
        sagittalTileRowCount++
        maxFullSizeSagittalsPerTileRow = ((maxFullSizeSagittalsPerTileRow * (sagittalTileRowCount + 1)) /
            (sagittalTileRowCount + 0)) as Max<Count<Sagittal>>
        maxSagittalsPerTileRow = ((maxSagittalsPerTileRow * (sagittalTileRowCount + 2)) /
            (sagittalTileRowCount + 1)) as Max<Count<Sagittal>>
    }

    if (sagittalCount > sagittalTileRowCount * maxFullSizeSagittalsPerTileRow) {
        const sagittalCountsByRow: Count<Sagittal>[] = computeSagittalCountsByTileRow({
            sagittalTileRowCount,
            sagittalCount,
        })

        const maxSagittalTileRowCount: Max<Count<Sagittal>> = max(...sagittalCountsByRow)

        return (maxSagittalTileRowCount / maxFullSizeSagittalsPerTileRow) as Multiplier
    }

    return NEUTRAL_MULTIPLIER
}

export { computeDownToNextTileRowCountsMultiplier }
