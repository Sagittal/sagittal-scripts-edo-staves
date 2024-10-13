import { Px } from "@sagittal/general"
import { computeWholeToneStep, Edo, EdoStep } from "@sagittal/system"
import {
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_FONT_SIZE,
    TILE_SIZE,
    WHOLE_TONE_X_OFFSET,
    WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET,
} from "../../constants"
import { addText } from "../../text"
import { Justification, NodeElement } from "../../types"
import { WHOLE_TONE_COLOR } from "./constants"
import { equalsPositiveOrLessThanZero } from "./zero"

const addWholeTone = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    }: { edo: Edo; fifthStep: EdoStep; tileRowCountScaleFactor: number },
): Promise<void> => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    await addText(
        tileWrapperGroupElement,
        `CD${equalsPositiveOrLessThanZero(wholeToneStep)}`,
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: WHOLE_TONE_X_OFFSET,
            yOffset: (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET +
                (TILE_SIZE / 2) * tileRowCountScaleFactor) as Px,
            color: WHOLE_TONE_COLOR,
            justification: Justification.RIGHT,
        },
    )
}

export { addWholeTone }
