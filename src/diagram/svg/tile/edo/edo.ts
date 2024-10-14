import { Count, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import {
    TILE_SIZE,
    TILE_EDO_TEXT_FONT_SIZE,
    SANOMAT_FONT_FILE,
    EDO_Y_OFFSET,
} from "../../constants"
import { addText } from "../../text"
import { Justification, NodeElement, Scaler } from "../../types"
import { computeTileRowCountScaler } from "../tileRowCount"
import { TileRow } from "../types"

const addEdo = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        edoNotationName,
        tileRowCount,
    }: { edoNotationName: EdoNotationName; tileRowCount: Count<TileRow> },
): Promise<void> => {
    const tileRowCountScaler: Scaler = computeTileRowCountScaler(tileRowCount)

    await addText(tileGroupElement, edoNotationName, {
        fontFile: SANOMAT_FONT_FILE,
        fontSize: (TILE_EDO_TEXT_FONT_SIZE / tileRowCountScaler) as Px,
        xOffset: (TILE_SIZE / 2) as Px,
        yOffset: (EDO_Y_OFFSET / tileRowCountScaler) as Px,
        justification: Justification.CENTER,
    })
}

export { addEdo }
