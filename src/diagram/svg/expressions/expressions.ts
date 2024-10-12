import { Document } from "@xmldom/xmldom"
import { deepClone, HexColor, isUndefined, Px } from "@sagittal/general"
import {
    computeSectionColor,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    isSubsetNotation,
    SectionColor,
} from "@sagittal/system"
import { DiagramType } from "../../../types"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
    DEFINIENS_Y_OFFSET,
    LEFT_AND_RIGHT_MARGIN,
    OPEN_SANS_REGULAR_FONT_FILE,
    STEP_FONT_SIZE,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
} from "../constants"
import { textsToSvgGroupElement, textToSvgGroupElement } from "../text"
import { append } from "../append"
import { getGroupWidth } from "../width"
import { Font, NodeElement } from "../types"
import { PATHIFIABLE_TEXTS_BY_EDO_NAME } from "./pathifiableTexts"
import { handleSzForExpressions } from "./evo_sz"
import { PathifiableTexts } from "./types"

const DEFINIENDUM_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}
const DEFINIENS_FONT: Font = {
    fontFile: OPEN_SANS_REGULAR_FONT_FILE,
    fontSize: STEP_FONT_SIZE,
}
const FONTS = [DEFINIENDUM_FONT, DEFINIENS_FONT]

const addGoodFifthNotationExpressionsAndGetWidth = async (
    svgDocument: Document,
    {
        pathifiableTexts,
        edoNotationName,
        diagramType,
    }: {
        pathifiableTexts: PathifiableTexts
        edoNotationName: EdoNotationName
        diagramType: DiagramType
    },
): Promise<Px> => {
    const { texts, fontIndices, additionalYOffsets } =
        deepClone(pathifiableTexts)

    if (diagramType === DiagramType.EVO_SZ)
        handleSzForExpressions(texts, { edoNotationName })

    const expressionsGroupElement: NodeElement<SVGGElement> =
        await textsToSvgGroupElement(
            svgDocument,
            texts,
            deepClone(FONTS),
            fontIndices,
            additionalYOffsets,
        )

    expressionsGroupElement.setAttribute(
        "transform",
        `translate(${LEFT_AND_RIGHT_MARGIN} ${
            TITLE_FONT_SIZE + SUBTITLE_FONT_SIZE + SUBTITLE_FONT_SIZE
        })`,
    )

    append(svgDocument, expressionsGroupElement)

    return getGroupWidth(expressionsGroupElement)
}

const addGoldBadFifthNotationExpressionsAndGetWidth = async (
    svgDocument: Document,
) => {
    const expressionsGroupElement: NodeElement<SVGGElement> =
        await textToSvgGroupElement(
            "A bad-fifth apotome-fraction notation",
            {
                fontFile: OPEN_SANS_REGULAR_FONT_FILE,
                fontSize: STEP_FONT_SIZE,
            },
        )

    expressionsGroupElement.setAttribute(
        "transform",
        `translate(${LEFT_AND_RIGHT_MARGIN} ${
            TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE -
            DEFINIENS_Y_OFFSET
        })`,
    )

    append(svgDocument, expressionsGroupElement)

    return getGroupWidth(expressionsGroupElement)
}

const addRoseBadFifthNotationExpressionsAndGetWidth = async (
    svgDocument: Document,
) => {
    const expressionsGroupElement: NodeElement<SVGGElement> =
        await textToSvgGroupElement("A bad-fifth limma-fraction notation", {
            fontFile: OPEN_SANS_REGULAR_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
        })

    expressionsGroupElement.setAttribute(
        "transform",
        `translate(${LEFT_AND_RIGHT_MARGIN} ${
            TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE -
            DEFINIENS_Y_OFFSET
        })`,
    )

    append(svgDocument, expressionsGroupElement)

    return getGroupWidth(expressionsGroupElement)
}

const addExpressionsAndGetWidth = async (
    svgDocument: Document,
    {
        edoNotationName,
        diagramType,
    }: { edoNotationName: EdoNotationName; diagramType: DiagramType },
): Promise<Px> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoNotationName]))
        return 0 as Px

    const sectionColor: SectionColor | HexColor =
        computeSectionColor(edoNotationName)

    if (sectionColor === SectionColor.GOLD)
        return addGoldBadFifthNotationExpressionsAndGetWidth(svgDocument)
    if (sectionColor === SectionColor.ROSE)
        return addRoseBadFifthNotationExpressionsAndGetWidth(svgDocument)

    const pathifiableTexts: PathifiableTexts =
        PATHIFIABLE_TEXTS_BY_EDO_NAME[edoNotationName]

    if (isUndefined(pathifiableTexts)) return 0 as Px

    return addGoodFifthNotationExpressionsAndGetWidth(svgDocument, {
        pathifiableTexts,
        edoNotationName,
        diagramType,
    })
}

export { addExpressionsAndGetWidth }
