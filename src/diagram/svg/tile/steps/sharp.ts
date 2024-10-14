import { Document } from "@xmldom/xmldom"
import { Index, Io, Px, Sentence } from "@sagittal/general"
import { computeSharpStep, Edo, EdoStep } from "@sagittal/system"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
    LIMMA_AND_SHARP_Y_OFFSET,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    SHARP_SYMBOL_Y_OFFSET,
    SHARP_TEXT_Y_OFFSET,
    STEP_FONT_SIZE,
    TILE_SIZE,
    LIMMA_AND_SHARP_X_OFFSET,
} from "../../constants"
import { textsToSvgGroupElement } from "../../text"
import { Font, NodeElement, Scaler } from "../../types"
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
        tileRowCountScaler,
    }: {
        edo: Edo
        fifthStep: EdoStep
        svgDocument: Document
        diagramType: DiagramType
        tileRowCountScaler: Scaler
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
            : [
                  computeInputSentenceUnicode("#;" as Io & Sentence),
                  equalsPositiveOrLessThanZero(sharpStep),
              ]
    const fonts: Font[] = [
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS as Px,
        },
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
        },
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS as Px,
        },
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
        },
    ]
    const fontIndices: Index<Font>[] = [0, 1, 0, 1] as Index<Font>[]
    const additionalYOffsets: Px[] = [
        SHARP_SYMBOL_Y_OFFSET,
        SHARP_TEXT_Y_OFFSET,
        SHARP_SYMBOL_Y_OFFSET,
        SHARP_TEXT_Y_OFFSET,
    ] as Px[]
    const sharpStepGroupElement: NodeElement<SVGGElement> =
        await textsToSvgGroupElement({
            svgDocument,
            texts,
            fonts,
            fontIndices,
            additionalYOffsets,
        })

    sharpStepGroupElement.setAttribute("fill", SHARP_COLOR)

    const groupWidth = getGroupWidth(sharpStepGroupElement)

    setTransform(sharpStepGroupElement, {
        xTranslation: ((LIMMA_AND_SHARP_X_OFFSET + TILE_SIZE) *
            tileRowCountScaler -
            groupWidth / 2) as Px,
        yTranslation: (TILE_SIZE * tileRowCountScaler +
            LIMMA_AND_SHARP_Y_OFFSET) as Px,
    })

    tileWrapperGroupElement.appendChild(sharpStepGroupElement)
}

export { addSharp }
