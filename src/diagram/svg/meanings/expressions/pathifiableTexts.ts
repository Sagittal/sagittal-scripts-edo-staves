import { EdoNotationName } from "@sagittal/system"
import { DiagramType } from "../../../../types"
import { PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NAME } from "./fromRaw"
import {
    deepClone,
    Index,
    Io,
    isEven,
    isUndefined,
    Sentence,
} from "@sagittal/general"
import { handleSzForExpressions } from "./evoSz"
import { computeInputSentenceUnicode } from "staff-code"
import { PathifiableTexts } from "../types"

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

const computeExpressionsPathifiableTexts = ({
    diagramType,
    edoNotationName,
}: {
    diagramType: DiagramType
    edoNotationName: EdoNotationName
}): PathifiableTexts => {
    const pathifiableTextsForExpressions: PathifiableTexts =
        PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NAME[edoNotationName]

    if (isUndefined(pathifiableTextsForExpressions)) {
        return {
            texts: [],
            fonts: [],
            fontIndices: [],
            additionalYOffsets: [],
        }
    }

    const { texts, fontIndices, additionalYOffsets, fonts } = deepClone(
        pathifiableTextsForExpressions,
    )

    if (diagramType === DiagramType.EVO_SZ)
        handleSzForExpressions(texts, { edoNotationName })

    convertBravuraTextsFromCodeToUnicode(texts)

    return {
        texts,
        fonts,
        fontIndices,
        additionalYOffsets,
    }
}

export { computeExpressionsPathifiableTexts }
