import { Edo, EdoStep, Index, Io, Px, Sentence } from "@sagittal/general"
import { computeSharpStep } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
} from "../../../../constants"
import { DiagramType, Font } from "../../../../types"
import {
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
    LIMMA_AND_SHARP_Y_OFFSET,
    SHARP_SYMBOL_Y_OFFSET,
    SHARP_TEXT_Y_OFFSET,
    LIMMA_AND_SHARP_X_OFFSET,
} from "../../constants"
import { textsToSvgGroupElement } from "../../text"
import { setTransform } from "../../transform"
import { NodeElement } from "../../types"
import { getGroupWidth } from "../../width"
import { SHARP_COLOR } from "./constants"
import { equalsPositiveOrLessThanZero } from "./zero"

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

    const texts: Io[] = [
        computeInputSentenceUnicode("#;" as Io & Sentence),
        equalsPositiveOrLessThanZero(sharpStep),
    ]
    const fonts: Font[] = [
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
        },
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        },
        {
            fontFile: BRAVURA_TEXT_SC_FONT_FILE,
            fontSize: BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
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
