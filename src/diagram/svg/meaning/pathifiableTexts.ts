import { deepClone, HexColor, Index } from "@sagittal/general"
import {
    computeSectionColor,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    isSubsetNotation,
    SectionColor,
} from "@sagittal/system"
import { EMPTY_PATHIFIABLE_TEXTS, MEANINGS_FONT, MEANINGS_Y_OFFSET } from "../../../constants"
import { computeExpressionsPathifiableTexts } from "../../../expression"
import { computeExpressionsBeyondHalfApotomePathifiableTexts } from "../../../expression"
import { DiagramType, Font, PathifiableTexts } from "../../../types"

const concatPathifiableTexts = (
    pathifiableTextsA: PathifiableTexts,
    pathifiableTextsB: PathifiableTexts,
): PathifiableTexts => {
    return {
        texts: pathifiableTextsA.texts.concat(pathifiableTextsB.texts),
        fonts: pathifiableTextsA.fonts.concat(pathifiableTextsB.fonts),
        fontIndices: pathifiableTextsA.fontIndices.concat(
            pathifiableTextsB.fontIndices.map(
                (fontIndex: Index<Font>): Index<Font> =>
                    (fontIndex + pathifiableTextsA.fontIndices.length) as Index<Font>,
            ),
        ),
        additionalYOffsets: pathifiableTextsA.additionalYOffsets.concat(pathifiableTextsB.additionalYOffsets),
    }
}

const computeMeaningsPathifiableTexts = ({
    edoNotationName,
    diagramType,
}: {
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): PathifiableTexts => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition)) {
        return {
            fontIndices: [0 as Index<Font>],
            fonts: [deepClone(MEANINGS_FONT)],
            texts: [`a subset of ${edoNotationDefinition.supersetEdoNotationName}-EDO`],
            additionalYOffsets: [MEANINGS_Y_OFFSET],
        }
    } else {
        const sectionColor: SectionColor | HexColor = computeSectionColor(edoNotationName)
        if (sectionColor === SectionColor.ROSE) {
            if (edoNotationName === "7") {
                return EMPTY_PATHIFIABLE_TEXTS
            } else {
                return {
                    fontIndices: [0 as Index<Font>],
                    fonts: [deepClone(MEANINGS_FONT)],
                    texts: ["a bad-fifth limma-fraction notation"],
                    additionalYOffsets: [MEANINGS_Y_OFFSET],
                }
            }
        } else if (sectionColor === SectionColor.GOLD) {
            if (edoNotationName === "5") {
                return EMPTY_PATHIFIABLE_TEXTS
            } else {
                return {
                    fontIndices: [0 as Index<Font>],
                    fonts: [deepClone(MEANINGS_FONT)],
                    texts: ["a bad-fifth apotome-fraction notation"],
                    additionalYOffsets: [MEANINGS_Y_OFFSET],
                }
            }
        } else {
            const expressionsPathifiableTexts: PathifiableTexts = computeExpressionsPathifiableTexts({
                edoNotationName,
                diagramType,
            })

            const expressionsBeyondHalfApotomePathifiableTexts: PathifiableTexts =
                computeExpressionsBeyondHalfApotomePathifiableTexts({
                    edoNotationName,
                    diagramType,
                })

            return concatPathifiableTexts(
                expressionsPathifiableTexts,
                expressionsBeyondHalfApotomePathifiableTexts,
            )
            // return expressionsPathifiableTexts
        }
    }
}

export { computeMeaningsPathifiableTexts }
