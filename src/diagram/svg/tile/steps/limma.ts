import { Edo, EdoStep, HexColor, Hyperlink, Index, Io, Maybe, negate, Px } from "@sagittal/general"
import { computeLimmaStep } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import {
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    XEN_WIKI_BASE_URL,
} from "../../../../constants"
import { Font } from "../../../../types"
import { LIMMA_AND_SHARP_X_OFFSET, LIMMA_AND_SHARP_Y_OFFSET } from "../../constants"
import { Justification, NodeElement } from "../../types"
import { LIMMA_COLOR } from "./constants"
import { addStep } from "./step"
import { equalsPositiveOrLessThanZero } from "./zero"

const addLimma = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        tileSize,
        svgDocument,
    }: { edo: Edo; fifthStep: EdoStep; tileSize: Px; svgDocument: Document },
): Promise<void> => {
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)

    const texts: Io[] = ["EF", equalsPositiveOrLessThanZero(limmaStep)]
    const fonts: Font[] = [
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        },
    ]
    const fontIndices: Index<Font>[] = [0, 0] as Index<Font>[]
    const hyperlinks: Maybe<Hyperlink>[] = [`${XEN_WIKI_BASE_URL}256/243` as Hyperlink, undefined]
    const colors: Maybe<HexColor>[] = [LIMMA_COLOR, LIMMA_COLOR]

    const xTranslation: Px = negate(LIMMA_AND_SHARP_X_OFFSET) as number as Px
    const yTranslation: Px = (tileSize + LIMMA_AND_SHARP_Y_OFFSET) as Px
    const justification: Justification = Justification.CENTER

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

export { addLimma }
