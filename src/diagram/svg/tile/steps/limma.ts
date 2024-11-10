import { Edo, EdoStep, negate, Px } from "@sagittal/general"
import { computeLimmaStep } from "@sagittal/system"
import {
    LIMMA_AND_SHARP_Y_OFFSET,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    LIMMA_AND_SHARP_X_OFFSET,
} from "../../constants"
import { addText } from "../../text"
import { Justification, NodeElement } from "../../types"
import { LIMMA_COLOR } from "./constants"
import { equalsPositiveOrLessThanZero } from "./zero"

const addLimma = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep, tileSize }: { edo: Edo; fifthStep: EdoStep; tileSize: Px },
): Promise<void> => {
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)

    await addText(tileWrapperGroupElement, `EF${equalsPositiveOrLessThanZero(limmaStep)}`, {
        fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
        fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        xOffset: negate(LIMMA_AND_SHARP_X_OFFSET) as number as Px,
        yOffset: (tileSize + LIMMA_AND_SHARP_Y_OFFSET) as Px,
        color: LIMMA_COLOR,
        justification: Justification.CENTER,
    })
}

export { addLimma }
