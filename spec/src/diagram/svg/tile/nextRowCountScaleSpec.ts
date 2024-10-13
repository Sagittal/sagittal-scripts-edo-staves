import { computeRange, Count } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow } from "../../../../../src/diagram/svg/tile/nextRowCountScale"

const FUCK_IT_HERE_ARE_THE_THINGS: number[] = [
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
    10 / 10 // 31
    // ...
]

describe("computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow", (): void => {
    it("computes the correct scale factor for each sagittal count (up to the ones I've manually documented here anyway)", (): void => {
        computeRange(31 as Count<Sagittal>).forEach(
            (sagittalCount: Count<Sagittal>): void => {
                const expected = FUCK_IT_HERE_ARE_THE_THINGS[sagittalCount]
                const actual =
                    computeScaleFactorForSizingSagittalsDownAsMuchAsTheSizeOfThatAtTheMaxSagittalPerRowCountForTheNextRowCountButBeforeAddingTheNextRow(
                        sagittalCount,
                    )

                expect(actual)
                    .withContext(
                        `Expected scale factor for sagittal count of ${sagittalCount} to be ${expected}, but instead found ${actual}`,
                    )
                    .toBe(expected)
            },
        )
    })
})
