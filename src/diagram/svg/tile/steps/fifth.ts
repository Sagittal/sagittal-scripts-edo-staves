import { Px } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"
import {
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_FONT_SIZE,
    TILE_SIZE,
    FIFTH_X_ADDITIONAL_OFFSET,
    WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET,
} from "../../constants"
import { addText } from "../../text"
import { Justification, NodeElement, Scaler } from "../../types"

import { FIFTH_COLOR } from "./constants"
import { equalsPositiveOrLessThanZero } from "./zero"

const addFifth = async (
    tileWrapperGroupElement: NodeElement<SVGGElement>,
    {
        fifthStep,
        tileRowCountScaler,
    }: { fifthStep: EdoStep; tileRowCountScaler: Scaler },
): Promise<void> => {
    await addText(
        tileWrapperGroupElement,
        `CG${equalsPositiveOrLessThanZero(fifthStep)}`,
        {
            fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
            fontSize: STEP_FONT_SIZE,
            xOffset: (FIFTH_X_ADDITIONAL_OFFSET +
                TILE_SIZE * tileRowCountScaler) as Px,
            yOffset: (WHOLE_TONE_AND_FIFTH_Y_ADDITIONAL_OFFSET +
                (TILE_SIZE / 2) * tileRowCountScaler) as Px,
            color: FIFTH_COLOR,
            justification: Justification.LEFT,
        },
    )
}

export { addFifth }
