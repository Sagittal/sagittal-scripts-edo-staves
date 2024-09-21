import { Px } from "@sagittal/general"
import { EdoName } from "@sagittal/system"
import { TILE_SIZE, TILE_EDO_TEXT_FONT_SIZE, SANOMAT_FONT_FILE, EDO_Y_OFFSET } from "../constants"
import { addText } from "../text"
import { Justification } from "./types"
import { NodeElement } from "../types"

const addEdo = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { edoName }: { edoName: EdoName },
): Promise<void> => {
    await addText(
        tileGroupElement,
        edoName,
        {
            fontFile: SANOMAT_FONT_FILE,
            fontSize: TILE_EDO_TEXT_FONT_SIZE,
            xOffset: Math.round(TILE_SIZE / 2) as Px,
            yOffset: EDO_Y_OFFSET,
            justification: Justification.CENTER,
        },
    )
}

export { addEdo }
