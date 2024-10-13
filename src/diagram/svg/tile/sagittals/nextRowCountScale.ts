import { Count, max, Max } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { computeSagittalCountsByRow } from "./sagittalCountsByRow"

// This computes the scale factor for sizing sagittals down as much as (but no further than) the size of sagittals
// at their max size at the sagittal per row count for the next row count but before actually adding the next row

const computeDownToNextRowCountsScaleFactor = (
    sagittalCount: Count<Sagittal>,
): number => {
    let sagittalRowCount: Count = 1 as Count
    let maxFullSizeSagittalsPerRow: Max<Count<Sagittal>> = 4 as Max<
        Count<Sagittal>
    >
    let maxSagittalsPerRow: Max<Count<Sagittal>> = 6 as Max<Count<Sagittal>>

    while (sagittalCount > sagittalRowCount * maxSagittalsPerRow) {
        sagittalRowCount++
        maxFullSizeSagittalsPerRow = ((maxFullSizeSagittalsPerRow *
            (sagittalRowCount + 1)) /
            (sagittalRowCount + 0)) as Max<Count<Sagittal>>
        maxSagittalsPerRow = ((maxSagittalsPerRow * (sagittalRowCount + 2)) /
            (sagittalRowCount + 1)) as Max<Count<Sagittal>>
    }

    if (sagittalCount > sagittalRowCount * maxFullSizeSagittalsPerRow) {
        const sagittalCountsByRow: Count<Sagittal>[] =
            computeSagittalCountsByRow({
                sagittalRowCount,
                sagittalCount,
            })

        const maxSagittalRowCount: Max<Count<Sagittal>> = max(
            ...sagittalCountsByRow,
        )

        return maxSagittalRowCount / maxFullSizeSagittalsPerRow
    }

    return 1
}

export { computeDownToNextRowCountsScaleFactor }
