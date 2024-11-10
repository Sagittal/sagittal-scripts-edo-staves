import { Count, Max } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { TileRow } from "../types"

const computeSagittalCountsByTileRow = ({
    sagittalTileRowCount,
    sagittalCount,
}: {
    sagittalTileRowCount: Count<TileRow<Sagittal>>
    sagittalCount: Count<Sagittal>
}): Count<Sagittal>[] => {
    const sagittalCountByTileRow: Count<Sagittal>[] = []
    let remainingSagittalCount: Count<Sagittal> = sagittalCount

    const maxSagittalsPerRow: Max<Count<Sagittal>> = Math.ceil(sagittalCount / sagittalTileRowCount) as Max<
        Count<Sagittal>
    >

    while (remainingSagittalCount > 0) {
        if (remainingSagittalCount > maxSagittalsPerRow) {
            sagittalCountByTileRow.push(maxSagittalsPerRow)
            remainingSagittalCount = (remainingSagittalCount - maxSagittalsPerRow) as Count<Sagittal>
        } else {
            sagittalCountByTileRow.push(remainingSagittalCount)
            remainingSagittalCount = 0 as Count<Sagittal>
        }
    }

    return sagittalCountByTileRow
}

export { computeSagittalCountsByTileRow }
