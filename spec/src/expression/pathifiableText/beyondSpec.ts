import { deepClone, Index, Io, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { BRAVURA_Y_OFFSET, MEANINGS_FONTS } from "../../../../src/constants"
import { computeExpressionsBeyondHalfApotomePathifiableTexts } from "../../../../src/expression/pathifiableText/beyond"
import { DiagramType, Font, PathifiableTexts } from "../../../../src/types"

describe("computeExpressionsBeyondHalfApotomePathifiableTexts", (): void => {
    it("handles a simple Revo case", (): void => {
        const edoNotationName: EdoNotationName = "50" as EdoNotationName
        const diagramType: DiagramType = DiagramType.REVO

        const actual: PathifiableTexts = computeExpressionsBeyondHalfApotomePathifiableTexts({
            edoNotationName,
            diagramType,
        })

        const expected: PathifiableTexts = {
            /* eslint-disable prettier/prettier */
            texts: [
                ", ",
                "  ",    // (|\
                " = ",
                "    ",   // \!)#
                ", ",
                "  ",    // /||\
                " = ",
                "   ",    // #
            ] as Io[],
            /* eslint-ensable prettier/prettier */
            fonts: deepClone(MEANINGS_FONTS),
            fontIndices: [1, 0, 1, 0, 1, 0, 1, 0] as Index<Font>[],
            additionalYOffsets: [
                BRAVURA_Y_OFFSET,
                0,
                BRAVURA_Y_OFFSET,
                0,
                BRAVURA_Y_OFFSET,
                0,
                BRAVURA_Y_OFFSET,
                0,
            ] as Px[],
        }
        expect(actual).toEqual(expected)
    })
})
