import { HexColor, Px } from "@sagittal/general"
import {
    computeEdoNotationDefinition,
    computeFifthStep,
    computeLimmaStep,
    computeSharpStep,
    computeWholeToneStep,
    Edo,
    EdoStep,
    isSubsetNotation,
} from "@sagittal/system"
import {
    LIMMA_AND_SHARP_Y_OFFSET,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_FONT_SIZE,
    TILE_SIZE,
    WHOLE_TONE_X_OFFSET,
    WHOLE_TONE_Y_OFFSET,
} from "../constants"
import { addText } from "../text"
import { Justification } from "./types"
import { NodeElement } from "../types"

const LIMMA_COLOR: HexColor = "#769200" as HexColor
const WHOLE_TONE_COLOR: HexColor = "#C00000" as HexColor
const SHARP_COLOR: HexColor = "#0070C0" as HexColor

const addWholeTone = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep }: { edo: Edo; fifthStep: EdoStep },
): Promise<void> => {
    const wholeToneStep = computeWholeToneStep(edo, fifthStep)

    await addText(tileGroupElement, `CD=${wholeToneStep}`, {
        fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
        fontSize: STEP_FONT_SIZE,
        xOffset: WHOLE_TONE_X_OFFSET,
        yOffset: WHOLE_TONE_Y_OFFSET,
        color: WHOLE_TONE_COLOR,
        justification: Justification.RIGHT,
    })
}

const addLimma = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep }: { edo: Edo; fifthStep: EdoStep },
): Promise<void> => {
    const limmaStep = computeLimmaStep(edo, fifthStep)

    await addText(tileGroupElement, `EF=${limmaStep}`, {
        fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
        fontSize: STEP_FONT_SIZE,
        xOffset: 0 as Px,
        yOffset: (TILE_SIZE + LIMMA_AND_SHARP_Y_OFFSET) as Px,
        color: LIMMA_COLOR,
        justification: Justification.CENTER,
    })
}

const addSharp = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, fifthStep }: { edo: Edo; fifthStep: EdoStep },
): Promise<void> => {
    const sharpStep = computeSharpStep(edo, fifthStep)

    await addText(tileGroupElement, `#=${sharpStep}`, {
        fontFile: OPEN_SANS_SEMIBOLD_FONT_FILE,
        fontSize: STEP_FONT_SIZE,
        xOffset: TILE_SIZE as Px,
        yOffset: (TILE_SIZE + LIMMA_AND_SHARP_Y_OFFSET) as Px,
        color: SHARP_COLOR,
        justification: Justification.CENTER,
    })
}

const addSteps = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, useSecondBestFifth }: { edo: Edo; useSecondBestFifth: boolean },
): Promise<void> => {
    if (isSubsetNotation(computeEdoNotationDefinition(edo, useSecondBestFifth)))
        return

    const fifthStep = computeFifthStep(edo, useSecondBestFifth)

    await addWholeTone(tileGroupElement, { edo, fifthStep })
    await addLimma(tileGroupElement, { edo, fifthStep })
    await addSharp(tileGroupElement, { edo, fifthStep })
}

export { addSteps }
