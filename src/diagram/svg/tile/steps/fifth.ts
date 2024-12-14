import { EdoStep, HexColor, Hyperlink, Index, Io, Maybe, Px } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import {
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    XEN_WIKI_BASE_URL,
} from "../../../../constants"
import { Font } from "../../../../types"
import { FIFTH_X_ADDITIONAL_OFFSET, WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET } from "../../constants"
import { Justification, NodeElement } from "../../types"
import { FIFTH_COLOR } from "./constants"
import { addStep } from "./step"
import { equalsPositiveOrLessThanZero } from "./zero"

const addFifth = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    { fifthStep, tileSize, svgDocument }: { fifthStep: EdoStep; tileSize: Px; svgDocument: Document },
): Promise<void> => {
    const texts: Io[] = ["CG", equalsPositiveOrLessThanZero(fifthStep)]
    const fonts: Font[] = [
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        },
    ]
    const fontIndices: Index<Font>[] = [0, 0] as Index<Font>[]
    const hyperlinks: Maybe<Hyperlink>[] = [`${XEN_WIKI_BASE_URL}3/2` as Hyperlink, undefined]
    const colors: Maybe<HexColor>[] = [FIFTH_COLOR, FIFTH_COLOR]

    const xTranslation: Px = (FIFTH_X_ADDITIONAL_OFFSET + tileSize) as Px
    const yTranslation: Px = (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET + tileSize / 2) as Px
    const justification: Justification = Justification.LEFT

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

export { addFifth }
