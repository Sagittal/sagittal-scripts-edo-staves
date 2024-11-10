import { Count, Decimal, Index, Integer } from "@sagittal/general"
import { Sagittal, Sagitype } from "@sagittal/system"
import { TILE_ROW_FOR_EDO } from "../constants"
import { TileRow } from "../types"
import { computeSagittalCountsByTileRow } from "./sagittalCountsByTileRow"

const computeSagitypesByTileRow = (sagitypes: Sagitype[], tileRowCount: Count<TileRow>): Sagitype[][] => {
    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>

    const sagittalTileRowCount: Count<TileRow<Sagittal>> = (tileRowCount - TILE_ROW_FOR_EDO) as Count<
        TileRow<Sagittal>
    >

    const sagittalCountsByTileRow: Count<Sagittal>[] = computeSagittalCountsByTileRow({
        sagittalTileRowCount,
        sagittalCount,
    })

    return sagittalCountsByTileRow.reduce(
        (
            sagitypesByTileRow: Sagitype[][],
            sagittalTileRowCount: Count<Sagittal>,
            sagittalTileRowIndex: number,
        ): Sagitype[][] => {
            const startingSagitypeIndex: Index<Sagitype> = sagittalCountsByTileRow
                .slice(0, sagittalTileRowIndex)
                .reduce(
                    (sum: Count<Sagittal>, current: Count<Sagittal>): Count<Sagittal> =>
                        (sum + current) as Count<Sagittal>,
                    0 as Count<Sagittal>,
                ) as Decimal<Integer> as Index<Sagitype>
            const endingSagitypeIndex: Index<Sagitype> = (startingSagitypeIndex +
                sagittalTileRowCount) as Index<Sagitype>
            const sagitypesForTileRow: Sagitype[] = sagitypes.slice(
                startingSagitypeIndex,
                endingSagitypeIndex,
            )
            sagitypesByTileRow.push(sagitypesForTileRow)
            return sagitypesByTileRow
        },
        [] as Sagitype[][],
    )
}

export { computeSagitypesByTileRow }
