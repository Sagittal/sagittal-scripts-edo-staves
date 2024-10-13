import { Count, Index } from "@sagittal/general"
import { Sagittal, Sagitype } from "@sagittal/system"
import { TILE_ROW_FOR_EDO } from "../constants"
import { computeSagittalCountsByRow } from "./sagittalCountsByRow"

const computeSagitypesByRow = (
    sagitypes: Sagitype[],
    tileRowCount: Count,
): Sagitype[][] => {
    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>

    const sagittalRowCount: Count = (tileRowCount - TILE_ROW_FOR_EDO) as Count

    const sagittalCountsByRow: Count<Sagittal>[] = computeSagittalCountsByRow({
        sagittalRowCount,
        sagittalCount,
    })

    return sagittalCountsByRow.reduce(
        (
            sagitypesByRow: Sagitype[][],
            sagittalRowCount: Count<Sagittal>,
            sagittalRowIndex: number,
        ): Sagitype[][] => {
            const startingSagitypeIndex: Index<Sagitype> = sagittalCountsByRow
                .slice(0, sagittalRowIndex)
                .reduce(
                    (sum: number, current: number): number => sum + current,
                    0,
                ) as Index<Sagitype>
            const endingSagitypeIndex: Index<Sagitype> =
                (startingSagitypeIndex + sagittalRowCount) as Index<Sagitype>
            const sagitypesForRow: Sagitype[] = sagitypes.slice(
                startingSagitypeIndex,
                endingSagitypeIndex,
            )
            sagitypesByRow.push(sagitypesForRow)
            return sagitypesByRow
        },
        [] as Sagitype[][],
    )
}

export { computeSagitypesByRow }
