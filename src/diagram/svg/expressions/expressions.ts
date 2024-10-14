import { Document } from "@xmldom/xmldom"
import {
    deepClone,
    Index,
    Io,
    isEven,
    isUndefined,
    Px,
    Sentence,
} from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { DiagramType } from "../../../types"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    OPEN_SANS_REGULAR_FONT_FILE,
    STEP_FONT_SIZE,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
} from "../constants"
import { textsToSvgGroupElement } from "../text"
import { append } from "../append"
import { getGroupWidth } from "../width"
import { Font, NodeElement } from "../types"
import { PATHIFIABLE_TEXTS_BY_EDO_NAME } from "./pathifiableTexts"
import { handleSzForExpressions } from "./evoSz"
import { PathifiableTexts } from "./types"
import { setTransform } from "../transform"
import { computeInputSentenceUnicode } from "staff-code"

const DEFINIENDUM_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}
const DEFINIENS_FONT: Font = {
    fontFile: OPEN_SANS_REGULAR_FONT_FILE,
    fontSize: STEP_FONT_SIZE,
}
const FONTS = [DEFINIENDUM_FONT, DEFINIENS_FONT]

const convertBravuraTextsFromCodeToUnicode = (texts: Io[]): void => {
    for (
        let textsIndex: Index<Io> = 0 as Index<Io>;
        textsIndex < texts.length;
        textsIndex++
    ) {
        if (isEven(textsIndex)) {
            texts[textsIndex] = computeInputSentenceUnicode(
                texts[textsIndex] as Io & Sentence,
            )
        }
    }
}

const addExpressionsAndGetWidth = async (
    svgDocument: Document,
    {
        edoNotationName,
        diagramType,
    }: { edoNotationName: EdoNotationName; diagramType: DiagramType },
): Promise<Px> => {
    const pathifiableTexts: PathifiableTexts =
        PATHIFIABLE_TEXTS_BY_EDO_NAME[edoNotationName]

    if (isUndefined(pathifiableTexts)) return 0 as Px

    const { texts, fontIndices, additionalYOffsets } =
        deepClone(pathifiableTexts)

    if (diagramType === DiagramType.EVO_SZ)
        handleSzForExpressions(texts, { edoNotationName })

    convertBravuraTextsFromCodeToUnicode(texts)

    const expressionsGroupElement: NodeElement<SVGGElement> =
        await textsToSvgGroupElement({
            svgDocument,
            texts,
            fonts: deepClone(FONTS),
            fontIndices,
            additionalYOffsets,
        })

    setTransform(expressionsGroupElement, {
        xTranslation: LEFT_AND_RIGHT_MARGIN,
        yTranslation: (TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE) as Px,
    })

    append(svgDocument, expressionsGroupElement)

    return getGroupWidth(expressionsGroupElement)
}

export { addExpressionsAndGetWidth }
