import { Edo, EdoStep, HexColor, Hyperlink, Index, Io, Maybe, Px, Sentence } from "@sagittal/general"
import { computeSharpStep } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    XEN_WIKI_BASE_URL,
} from "../../../../constants"
import { Font } from "../../../../types"
import {
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SHARP_IN_STEPS,
    LIMMA_AND_SHARP_Y_OFFSET,
    SHARP_SYMBOL_Y_OFFSET,
    SHARP_TEXT_Y_OFFSET,
    LIMMA_AND_SHARP_X_OFFSET,
} from "../../constants"
import { Justification, NodeElement } from "../../types"
import { SHARP_COLOR } from "./constants"
import { addStep } from "./step"
import { equalsPositiveOrLessThanZero } from "./zero"

const addSharp = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        svgDocument,
        tileSize,
    }: {
        edo: Edo
        fifthStep: EdoStep
        svgDocument: Document
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
    ]
    const fontIndices: Index<Font>[] = [0, 1] as Index<Font>[]
    const additionalYOffsets: Px[] = [SHARP_SYMBOL_Y_OFFSET, SHARP_TEXT_Y_OFFSET] as Px[]
    const hyperlinks: Maybe<Hyperlink>[] = [`${XEN_WIKI_BASE_URL}2187/2048` as Hyperlink, undefined]
    const colors: Maybe<HexColor>[] = [SHARP_COLOR, SHARP_COLOR]

    const xTranslation: Px = (tileSize + LIMMA_AND_SHARP_X_OFFSET) as Px
    const yTranslation: Px = (tileSize + LIMMA_AND_SHARP_Y_OFFSET) as Px
    const justification: Justification = Justification.CENTER

    await addStep(tileWrapperGroupElement, {
        svgDocument,
        texts,
        fonts,
        fontIndices,
        additionalYOffsets,
        hyperlinks,
        colors,
        xTranslation,
        yTranslation,
        justification,
    })
}

export { addSharp }
