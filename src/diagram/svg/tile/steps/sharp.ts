import { Document } from "@xmldom/xmldom"
import { Edo, EdoStep, Index, Io, Px, Sentence } from "@sagittal/general"
import { computeSharpStep } from "@sagittal/system"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
    LIMMA_AND_SHARP_Y_OFFSET,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    SHARP_SYMBOL_Y_OFFSET,
    SHARP_TEXT_Y_OFFSET,
    STEP_AND_MEANINGS_FONT_SIZE,
    LIMMA_AND_SHARP_X_OFFSET,
} from "../../constants"
import { textsToSvgGroupElement } from "../../text"
import { Font, NodeElement } from "../../types"
import { computeInputSentenceUnicode } from "staff-code"
import { getGroupWidth } from "../../width"
import { DiagramType } from "../../../../types"
import { equalsPositiveOrLessThanZero } from "./zero"
import { SHARP_COLOR } from "./constants"
import { setTransform } from "../../transform"

const addSharp = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        svgDocument,
        diagramType,
        tileSize,
    }: {
        edo: Edo
        fifthStep: EdoStep
        svgDocument: Document
        diagramType: DiagramType
        tileSize: Px
    },
): Promise<void> => {
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)

    const texts: Io[] =
        diagramType === DiagramType.REVO
            ? [
                  computeInputSentenceUnicode("/||\\;" as Io & Sentence),
                  equalsPositiveOrLessThanZero(sharpStep),
              ]
            : diagramType === DiagramType.GENERAL
            ? [
                  computeInputSentenceUnicode("#;" as Io & Sentence),
                  " or",
                  computeInputSentenceUnicode("5; /||\\;" as Io & Sentence),
                  equalsPositiveOrLessThanZero(sharpStep),
              ]
            : [computeInputSentenceUnicode("#;" as Io & Sentence), equalsPositiveOrLessThanZero(sharpStep)]
    const fonts: Font[] = [
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS as Px,
        },
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        },
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS as Px,
        },
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        },
    ]
    const fontIndices: Index<Font>[] = [0, 1, 0, 1] as Index<Font>[]
    const additionalYOffsets: Px[] = [
        SHARP_SYMBOL_Y_OFFSET,
        SHARP_TEXT_Y_OFFSET,
        SHARP_SYMBOL_Y_OFFSET,
        SHARP_TEXT_Y_OFFSET,
    ] as Px[]
    const sharpStepGroupElement: NodeElement<SVGGElement> = await textsToSvgGroupElement({
        svgDocument,
        texts,
        fonts,
        fontIndices,
        additionalYOffsets,
    })

    sharpStepGroupElement.setAttribute("fill", SHARP_COLOR)

    const groupWidth = getGroupWidth(sharpStepGroupElement)

    setTransform(sharpStepGroupElement, {
        xTranslation: (LIMMA_AND_SHARP_X_OFFSET + tileSize - groupWidth / 2) as Px,
        yTranslation: (tileSize + LIMMA_AND_SHARP_Y_OFFSET) as Px,
    })

    tileWrapperGroupElement.appendChild(sharpStepGroupElement)
}

export { addSharp }
