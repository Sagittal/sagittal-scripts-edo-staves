import { Px } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { TILE_SIZE, TILE_TEXT_FONT_SIZE, SANOMAT_FONT_FILE, EDO_Y_OFFSET } from "../constants"
import { addText } from "../text"
import { Justification } from "./types"
import { NodeElement } from "../types"

const addEdo = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edo, useSecondBestFifth }: { edo: Edo; useSecondBestFifth: boolean },
): Promise<void> => {
    await addText(
        tileGroupElement,
        `${edo}${useSecondBestFifth ? "b" : ""}`,
        {
            fontFile: SANOMAT_FONT_FILE,
            fontSize: TILE_TEXT_FONT_SIZE,
            xOffset: (TILE_SIZE / 2) as Px,
            yOffset: EDO_Y_OFFSET,
            justification: Justification.CENTER,
        },
    )
}

export { addEdo }
