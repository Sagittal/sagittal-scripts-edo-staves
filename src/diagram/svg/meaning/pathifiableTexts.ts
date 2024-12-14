import { deepClone, HexColor, Hyperlink, Index } from "@sagittal/general"
import {
    computeSectionColor,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    isSubsetNotation,
    parseEdoNotationName,
    SectionColor,
} from "@sagittal/system"
import {
    FRACTIONAL_3_LIMIT_NOTATION_PAGE,
    MEANINGS_FONT,
    MEANINGS_Y_OFFSET,
    XEN_WIKI_BASE_URL,
} from "../../../constants"
import { DiagramType, Font, PathifiableTexts } from "../../../types"
import {
    computeExpressionsBeyondHalfApotomePathifiableTexts,
    computeExpressionsPathifiableTexts,
} from "./expression"

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
                    (fontIndex + pathifiableTextsA.fonts.length) as Index<Font>,
            ),
        ),
        additionalYOffsets: pathifiableTextsA.additionalYOffsets!.concat(
            pathifiableTextsB.additionalYOffsets!,
        ),
        hyperlinks: pathifiableTextsA.hyperlinks!.concat(pathifiableTextsB.hyperlinks),
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
            texts: [`a subset of ${edoNotationDefinition.supersetEdoNotationName}-EDO notation`],
            additionalYOffsets: [MEANINGS_Y_OFFSET],
            hyperlinks: [
                `${XEN_WIKI_BASE_URL}${parseEdoNotationName(edoNotationDefinition.supersetEdoNotationName).edo}edo` as Hyperlink,
            ],
        }
    } else {
        const sectionColor: SectionColor | HexColor = computeSectionColor(edoNotationName)
        if (sectionColor === SectionColor.ROSE) {
            return {
                fontIndices: [0 as Index<Font>],
                fonts: [deepClone(MEANINGS_FONT)],
                texts: ["a bad-fifth limma-fraction notation"],
                additionalYOffsets: [MEANINGS_Y_OFFSET],
                hyperlinks: [
                    `${XEN_WIKI_BASE_URL}${FRACTIONAL_3_LIMIT_NOTATION_PAGE}#Bad-fifths_limma-fraction_notation` as Hyperlink,
                ],
            }
        } else if (sectionColor === SectionColor.GOLD) {
            return {
                fontIndices: [0 as Index<Font>],
                fonts: [deepClone(MEANINGS_FONT)],
                texts: ["a bad-fifth apotome-fraction notation"],
                additionalYOffsets: [MEANINGS_Y_OFFSET],
                hyperlinks: [
                    `${XEN_WIKI_BASE_URL}${FRACTIONAL_3_LIMIT_NOTATION_PAGE}#Bad-fifths_apotome-fraction_notation` as Hyperlink,
                ],
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
        }
    }
}

export { computeMeaningsPathifiableTexts }
