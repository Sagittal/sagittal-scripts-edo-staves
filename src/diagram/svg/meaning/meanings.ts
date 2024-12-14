import { max, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { DiagramType, PathifiableTexts } from "../../../types"
import { append } from "../append"
import {
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    MEANINGS_SPACING,
    MEANINGS_SPACING_FOR_WRAPPED_LINE,
    MEANINGS_PADDING_FOR_WRAPPED_LINE,
} from "../constants"
import { textsToSvgGroupElement } from "../text"
import { setTransform } from "../transform"
import { NodeElement } from "../types"
import { getGroupWidth } from "../width"
import { COMMA_TEXT } from "./constants"
import {
    computeExpressionsBeyondHalfApotomePathifiableTexts,
    computeExpressionsPathifiableTexts,
} from "./expression"
import { computeMeaningsPathifiableTexts } from "./pathifiableTexts"

const handleLeadingComma = (pathifiableTexts: PathifiableTexts): PathifiableTexts => {
    if (pathifiableTexts.texts[0] === COMMA_TEXT) {
        pathifiableTexts.texts.shift()
        pathifiableTexts.texts[0] = pathifiableTexts.texts[0].slice(1) // remove the 5; space from the first thing, too

        pathifiableTexts.fontIndices.shift()
        pathifiableTexts.additionalYOffsets!.shift()
    }

    return pathifiableTexts
}

const computePathifiableTextsAndWidth = async ({
    computePathifiableTextsFunction,
    svgDocument,
    edoNotationName,
    diagramType,
    extraHeight = 0 as Px,
}: {
    computePathifiableTextsFunction: ({
        edoNotationName,
        diagramType,
    }: {
        edoNotationName: EdoNotationName
        diagramType: DiagramType
    }) => PathifiableTexts
    edoNotationName: EdoNotationName
    diagramType: DiagramType
    svgDocument: Document
    extraHeight?: Px
}): Promise<{ width: Px; groupElement: NodeElement<SVGGElement> }> => {
    const pathifiableTexts: PathifiableTexts = handleLeadingComma(
        computePathifiableTextsFunction({
            edoNotationName,
            diagramType,
        }),
    )

    const groupElement: NodeElement<SVGGElement> = await textsToSvgGroupElement({
        svgDocument,
        ...pathifiableTexts,
    })

    setTransform(groupElement, {
        xTranslation: LEFT_AND_RIGHT_MARGIN,
        yTranslation: (TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            MEANINGS_SPACING +
            extraHeight) as Px,
    })

    const width: Px = getGroupWidth(groupElement)

    return {
        width,
        groupElement,
    }
}

const addMeaningsAndGetWidthAndExtraHeight = async (
    svgDocument: Document,
    {
        diagramType,
        edoNotationName,
        stavesWidth,
    }: { diagramType: DiagramType; edoNotationName: EdoNotationName; stavesWidth: Px },
): Promise<{ width: Px; extraHeight: Px }> => {
    const { groupElement: meaningsGroupElement, width: meaningsWidth } =
        await computePathifiableTextsAndWidth({
            computePathifiableTextsFunction: computeMeaningsPathifiableTexts,
            svgDocument,
            edoNotationName,
            diagramType,
        })

    if (meaningsWidth < stavesWidth) {
        append(svgDocument, meaningsGroupElement)
        return { width: meaningsWidth, extraHeight: MEANINGS_PADDING_FOR_WRAPPED_LINE }
    } else {
        const { groupElement: expressionsGroupElement, width: expressionsWidth } =
            await computePathifiableTextsAndWidth({
                computePathifiableTextsFunction: computeExpressionsPathifiableTexts,
                svgDocument,
                edoNotationName,
                diagramType,
            })
        append(svgDocument, expressionsGroupElement)

        const {
            groupElement: expressionsBeyondHalfApotomeGroupElement,
            width: expressionsBeyondHalfApotomeWidth,
        } = await computePathifiableTextsAndWidth({
            computePathifiableTextsFunction: computeExpressionsBeyondHalfApotomePathifiableTexts,
            svgDocument,
            edoNotationName,
            diagramType,
            extraHeight: MEANINGS_SPACING_FOR_WRAPPED_LINE,
        })
        append(svgDocument, expressionsBeyondHalfApotomeGroupElement)

        return {
            width: max(expressionsWidth, expressionsBeyondHalfApotomeWidth),
            extraHeight: (MEANINGS_SPACING_FOR_WRAPPED_LINE + MEANINGS_PADDING_FOR_WRAPPED_LINE) as Px,
        }
    }
}

export { addMeaningsAndGetWidthAndExtraHeight }
