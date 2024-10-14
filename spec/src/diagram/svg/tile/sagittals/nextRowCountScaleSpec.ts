import { computeRange, Count } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { computeDownToNextTileRowCountsScaler } from "../../../../../../src/diagram/svg/tile/sagittals/nextRowCountScale"
import { Scaler } from "../../../../../../src/diagram/svg/types"

const EXPECTED_DOWN_TO_NEXT_ROW_COUNTS_SCALERS: Scaler[] = [
    4 / 4, // 0
    4 / 4, // 1
    4 / 4, // 2
    4 / 4, // 3
    4 / 4, // 4
    5 / 4, // 5
    6 / 4, // 6
    6 / 6, // 7
    6 / 6, // 8
    6 / 6, // 9
    6 / 6, // 10
    6 / 6, // 11
    6 / 6, // 12
    7 / 6, // 13
    7 / 6, // 14
    8 / 6, // 15
    8 / 6, // 16
    8 / 8, // 17
    8 / 8, // 18
    8 / 8, // 19
    8 / 8, // 20
    8 / 8, // 21
    8 / 8, // 22
    8 / 8, // 23
    8 / 8, // 24
    9 / 8, // 25
    9 / 8, // 26
    9 / 8, // 27
    10 / 8, // 28
    10 / 8, // 29
    10 / 8, // 30
    10 / 10, // 31
    // ...
] as Scaler[]

describe("computeDownToNextTileRowCountsScaler", (): void => {
    it("computes the correct down-to-next-row-count's scale factor for each sagittal count (up to the ones I've manually documented here anyway)", (): void => {
        computeRange(31 as Count<Sagittal>).forEach(
            (sagittalCount: Count<Sagittal>): void => {
                const expectedDownToNextTileRowCountsScaler: Scaler =
                    EXPECTED_DOWN_TO_NEXT_ROW_COUNTS_SCALERS[sagittalCount]
                const actualDownToNextTileRowCountsScaler: Scaler =
                    computeDownToNextTileRowCountsScaler(sagittalCount)

                expect(actualDownToNextTileRowCountsScaler)
                    .withContext(
                        `Expected scale factor for sagittal count of ${sagittalCount} to be ${expectedDownToNextTileRowCountsScaler}, but instead found ${actualDownToNextTileRowCountsScaler}`,
                    )
                    .toBe(expectedDownToNextTileRowCountsScaler)
            },
        )
    })
})