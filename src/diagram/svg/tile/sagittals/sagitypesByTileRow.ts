import { Count, Decimal, Index } from "@sagittal/general"
import { Sagittal, Sagitype } from "@sagittal/system"
import { TILE_ROW_FOR_EDO } from "../constants"
import { computeSagittalCountsByTileRow } from "./sagittalCountsByTileRow"
import { TileRow } from "../types"

const computeSagitypesByTileRow = (
    sagitypes: Sagitype[],
    tileRowCount: Count<TileRow>,
): Sagitype[][] => {
    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>

    const sagittalTileRowCount: Count<TileRow<Sagittal>> = (tileRowCount -
        TILE_ROW_FOR_EDO) as Count<TileRow<Sagittal>>

    const sagittalCountsByTileRow: Count<Sagittal>[] =
        computeSagittalCountsByTileRow({
            sagittalTileRowCount,
            sagittalCount,
        })

    return sagittalCountsByTileRow.reduce(
        (
            sagitypesByTileRow: Sagitype[][],
            sagittalTileRowCount: Count<Sagittal>,
            sagittalTileRowIndex: number,
        ): Sagitype[][] => {
            const startingSagitypeIndex: Index<Sagitype> =
                sagittalCountsByTileRow
                    .slice(0, sagittalTileRowIndex)
                    .reduce(
                        (
                            sum: Count<Sagittal>,
                            current: Count<Sagittal>,
                        ): Count<Sagittal> =>
                            (sum + current) as Count<Sagittal>,
                        0 as Count<Sagittal>,
                    ) as Decimal<{ integer: true }> as Index<Sagitype>
            const endingSagitypeIndex: Index<Sagitype> =
                (startingSagitypeIndex +
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
