import { Count, max, Max } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { computeSagittalCountsByTileRow } from "./sagittalCountsByTileRow"
import { TileRow } from "../types"
import { Scaler } from "../../types"

// This computes the scale factor for sizing sagittals down as much as (but no further than) the size of sagittals
// at their max size at the sagittal per row count for the next row count but before actually adding the next row

const computeDownToNextTileRowCountsScaler = (
    sagittalCount: Count<Sagittal>,
): Scaler => {
    let sagittalTileRowCount: Count<TileRow<Sagittal>> = 1 as Count<
        TileRow<Sagittal>
    >
    let maxFullSizeSagittalsPerTileRow: Max<Count<Sagittal>> = 4 as Max<
        Count<Sagittal>
    >
    let maxSagittalsPerTileRow: Max<Count<Sagittal>> = 6 as Max<Count<Sagittal>>

    while (sagittalCount > sagittalTileRowCount * maxSagittalsPerTileRow) {
        sagittalTileRowCount++
        maxFullSizeSagittalsPerTileRow = ((maxFullSizeSagittalsPerTileRow *
            (sagittalTileRowCount + 1)) /
            (sagittalTileRowCount + 0)) as Max<Count<Sagittal>>
        maxSagittalsPerTileRow = ((maxSagittalsPerTileRow *
            (sagittalTileRowCount + 2)) /
            (sagittalTileRowCount + 1)) as Max<Count<Sagittal>>
    }

    if (sagittalCount > sagittalTileRowCount * maxFullSizeSagittalsPerTileRow) {
        const sagittalCountsByRow: Count<Sagittal>[] =
            computeSagittalCountsByTileRow({
                sagittalTileRowCount,
                sagittalCount,
            })

        const maxSagittalTileRowCount: Max<Count<Sagittal>> = max(
            ...sagittalCountsByRow,
        )

        return maxSagittalTileRowCount / maxFullSizeSagittalsPerTileRow
    }

    return 1
}

export { computeDownToNextTileRowCountsScaler }
