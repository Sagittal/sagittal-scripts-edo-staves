import { Count } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"

const computeSagittalCountsByRow = ({
    sagittalRowCount,
    sagittalCount,
}: {
    sagittalRowCount: Count
    sagittalCount: Count<Sagittal>
}): Count<Sagittal>[] => {
    const sagittalCountByRow: Count<Sagittal>[] = []
    let remainingSagittalCount: Count<Sagittal> = sagittalCount

    const sagittalsPerRow: Count<Sagittal> = Math.ceil(
        sagittalCount / sagittalRowCount,
    ) as Count<Sagittal>

    while (remainingSagittalCount > 0) {
        if (remainingSagittalCount > sagittalsPerRow) {
            sagittalCountByRow.push(sagittalsPerRow)
            remainingSagittalCount = (remainingSagittalCount -
                sagittalsPerRow) as Count<Sagittal>
        } else {
            sagittalCountByRow.push(remainingSagittalCount)
            remainingSagittalCount = 0 as Count<Sagittal>
        }
    }

    return sagittalCountByRow
}

export { computeSagittalCountsByRow }
