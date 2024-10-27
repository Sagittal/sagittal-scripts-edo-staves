import { Px, Edo, EdoStep } from "@sagittal/general"
import { computeWholeToneStep } from "@sagittal/system"
import {
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    WHOLE_TONE_X_OFFSET,
    WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET,
} from "../../constants"
import { addText } from "../../text"
import { Justification, NodeElement } from "../../types"
import { WHOLE_TONE_COLOR } from "./constants"
import { equalsPositiveOrLessThanZero } from "./zero"

const addWholeTone = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep, tileSize }: { edo: Edo; fifthStep: EdoStep; tileSize: Px },
): Promise<void> => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    await addText(tileWrapperGroupElement, `CD${equalsPositiveOrLessThanZero(wholeToneStep)}`, {
        fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
        fontSize: STEP_AND_MEANINGS_FONT_SIZE,
        xOffset: WHOLE_TONE_X_OFFSET,
        yOffset: (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET + tileSize / 2) as Px,
        color: WHOLE_TONE_COLOR,
        justification: Justification.RIGHT,
    })
}

export { addWholeTone }
