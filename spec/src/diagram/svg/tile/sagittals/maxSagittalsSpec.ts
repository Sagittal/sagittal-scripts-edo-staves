import { Count, Max } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { computeMaxSagittalsForTileRowCount } from "../../../../../../src/diagram/svg/tile/sagittals/maxSagittals"

describe("computeMaxSagittalsForTileRowCount", (): void => {
    it("1 tile row ∴ 0 sagittal rows has a max 4 sagittals per row × 0 rows = 0 sagittals", (): void => {
        const tileRowCount: Count = 1 as Count
        expect(computeMaxSagittalsForTileRowCount(tileRowCount)).toBe(
            0 as Max<Count<Sagittal>>,
        )
    })

    it("2 tile rows ∴ 1 sagittal row has a max 6 sagittals per row × 1 row = 6 sagittals", (): void => {
        const tileRowCount: Count = 2 as Count // TODO: Count<TileRow>, and other generic Count I have around
        expect(computeMaxSagittalsForTileRowCount(tileRowCount)).toBe(
            6 as Max<Count<Sagittal>>,
        )
    })

    it("3 tile rows ∴ 2 sagittal rows has a max 8 sagittals per row × 2 rows = 16 sagittals", (): void => {
        const tileRowCount: Count = 3 as Count
        expect(computeMaxSagittalsForTileRowCount(tileRowCount)).toBe(
            16 as Max<Count<Sagittal>>,
        )
    })

    it("4 tile rows ∴ 3 sagittal rows has a max 10 sagittals per row × 3 rows = 30 sagittals", (): void => {
        const tileRowCount: Count = 4 as Count
        expect(computeMaxSagittalsForTileRowCount(tileRowCount)).toBe(
            30 as Max<Count<Sagittal>>,
        )
    })

    it("5 tile rows ∴ 4 sagittal rows has a max 12 sagittals per row × 4 rows = 48 sagittals", (): void => {
        const tileRowCount: Count = 5 as Count
        expect(computeMaxSagittalsForTileRowCount(tileRowCount)).toBe(
            48 as Max<Count<Sagittal>>,
        )
    })
})
