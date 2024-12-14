import { deepClone, deepEquals, Index, Io, isUndefined, Sentence } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { computeInputSentenceUnicode } from "staff-code"
import { BRAVURA_TEXT_FONT } from "../../../../../constants"
import { DiagramType, Font, PathifiableTexts } from "../../../../../types"
import { handleSzForExpressions } from "./evoSz"
import { PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NOTATION_NAME } from "./fromDefinitions"

const EMPTY_PATHIFIABLE_TEXTS: PathifiableTexts = {
    fontIndices: [],
    fonts: [],
    texts: [],
}

const convertBravuraTextsFromCodeToUnicode = ({
    texts,
    fontIndices,
    fonts,
}: {
    texts: Io[]
    fontIndices: Index<Font>[]
    fonts: Font[]
}): void => {
    for (let textsIndex: Index<Io> = 0 as Index<Io>; textsIndex < texts.length; textsIndex++) {
        if (deepEquals(fonts[fontIndices[textsIndex]], BRAVURA_TEXT_FONT)) {
            texts[textsIndex] = computeInputSentenceUnicode(texts[textsIndex] as Io & Sentence)
        }
    }
}

const computeExpressionsPathifiableTexts = ({
    diagramType,
    edoNotationName,
}: {
    diagramType: DiagramType
    edoNotationName: EdoNotationName
}): PathifiableTexts => {
    const pathifiableTextsForExpressions: PathifiableTexts =
        PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NOTATION_NAME[edoNotationName]

    if (isUndefined(pathifiableTextsForExpressions)) return EMPTY_PATHIFIABLE_TEXTS

    const { texts, fontIndices, additionalYOffsets, fonts, hyperlinks } = deepClone(
        pathifiableTextsForExpressions,
    )

    if (diagramType === DiagramType.EVO_SZ) handleSzForExpressions(texts, { edoNotationName })

    convertBravuraTextsFromCodeToUnicode({ texts, fontIndices, fonts })

    return {
        texts,
        fonts,
        fontIndices,
        additionalYOffsets,
        hyperlinks,
    }
}

export { computeExpressionsPathifiableTexts }
