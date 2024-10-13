import { Count, max, Max } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { computeSagittalCountsByRow } from "./needThisOut"

// TODO: shorten this name and then put this in a comment
const computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow =
    (sagittalCount: Count<Sagittal>): number => {
        // return 1

        let sagittalRowCount = 1
        let maxFullSizeSagittalsPerRow = 4
        let maxSagittalsPerRow = 6

        while (sagittalCount > sagittalRowCount * maxSagittalsPerRow) {
            sagittalRowCount++
            maxFullSizeSagittalsPerRow *=
                (sagittalRowCount + 1) / (sagittalRowCount + 0) // first time, 4 needs to go to 6, so times 3/2. next time, 6 goes to 8, so 4/3
            maxSagittalsPerRow *=
                (sagittalRowCount + 2) / (sagittalRowCount + 1) // first time, 6 needs to go to 8, so times 4/3. next time, 8 goes to 10, so 5/4
        }
        //  tile row count would be clearer bc already 1 more
        // console.log("")
        // console.log("####sagittalCount", sagittalCount)
        // console.log("sagittalRowCount", sagittalRowCount)
        // console.log("maxFullSizeSagittalsPerRow", maxFullSizeSagittalsPerRow)
        // console.log("maxSagittalsPerRow", maxSagittalsPerRow)

        if (sagittalCount > sagittalRowCount * maxFullSizeSagittalsPerRow) {
            const sagittalCountsByRow: Count<Sagittal>[] =
                computeSagittalCountsByRow({
                    sagittalRowCount,
                    sagittalCount,
                })
            // const sagitypesByRow: Sagitype[][] = computeSagitypesByRow(
            //     sagitypes,
            //     sagittalCountsByRow,
            // )
            const maxSagittalRowCount: Max<Count<Sagittal>> = max(
                // TODO extract cuz used out there too
                ...sagittalCountsByRow,
            )

            return maxSagittalRowCount / maxFullSizeSagittalsPerRow
        }

        return 1
    }

export { computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow }
