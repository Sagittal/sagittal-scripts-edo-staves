import { deepClone, Index, Io, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { DEFINIENS_Y_OFFSET } from "../../../../src/diagram/svg/constants"
import { PathifiableTexts } from "../../../../src/diagram/svg/meaning/types"
import { Font } from "../../../../src/diagram/svg/types"
import { computeExpressionsBeyondHalfApotomePathifiableTexts } from "../../../../src/expression/pathifiableText/beyond"
import { FONTS } from "../../../../src/expression/pathifiableText/constants"
import { DiagramType } from "../../../../src/types"

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
            fonts: deepClone(FONTS),
            fontIndices: [1, 0, 1, 0, 1, 0, 1, 0] as Index<Font>[],
            additionalYOffsets: [
                DEFINIENS_Y_OFFSET,
                0,
                DEFINIENS_Y_OFFSET,
                0,
                DEFINIENS_Y_OFFSET,
                0,
                DEFINIENS_Y_OFFSET,
                0,
            ] as Px[],
        }
        expect(actual).toEqual(expected)
    })
})
