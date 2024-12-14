import { Px, Edo, EdoStep, Io, Index, Maybe, Hyperlink, HexColor } from "@sagittal/general"
import { computeWholeToneStep } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import {
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    XEN_WIKI_BASE_URL,
} from "../../../../constants"
import { Font } from "../../../../types"
import { WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET, WHOLE_TONE_X_OFFSET } from "../../constants"
import { Justification, NodeElement } from "../../types"
import { WHOLE_TONE_COLOR } from "./constants"
import { addStep } from "./step"
import { equalsPositiveOrLessThanZero } from "./zero"

const addWholeTone = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        tileSize,
        svgDocument,
    }: { edo: Edo; fifthStep: EdoStep; tileSize: Px; svgDocument: Document },
): Promise<void> => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    const texts: Io[] = ["CD", equalsPositiveOrLessThanZero(wholeToneStep)]
    const fonts: Font[] = [
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        },
    ]
    const fontIndices: Index<Font>[] = [0, 0] as Index<Font>[]
    const hyperlinks: Maybe<Hyperlink>[] = [`${XEN_WIKI_BASE_URL}9/8` as Hyperlink, undefined]
    const colors: Maybe<HexColor>[] = [WHOLE_TONE_COLOR, WHOLE_TONE_COLOR]

    const xTranslation: Px = WHOLE_TONE_X_OFFSET
    const yTranslation: Px = (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET + tileSize / 2) as Px
    const justification: Justification = Justification.RIGHT

    await addStep(tileWrapperGroupElement, {
        svgDocument,
        texts,
        fonts,
        fontIndices,
        hyperlinks,
        colors,
        xTranslation,
        yTranslation,
        justification,
    })
}

export { addWholeTone }
