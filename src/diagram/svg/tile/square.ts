import { Document } from "@xmldom/xmldom"
import { HexColor, Px } from "@sagittal/general"
import { computeSectionColor, EdoNotationName } from "@sagittal/system"
import {
    EXTRA_ROOM_FOR_FIFTH_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    SVG_NS,
    TILE_SIZE,
    TILE_TOP_MARGIN,
} from "../constants"
import { NodeElement } from "../types"
import { append } from "../append"

const addTileSquare = (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoNotationName,
    }: {
        svgDocument: Document
        edoNotationName: EdoNotationName
    },
): void => {
    const sectionColor: HexColor = computeSectionColor(edoNotationName)
    const tileRectElement: NodeElement<SVGRectElement> =
        svgDocument.createElementNS(
            SVG_NS,
            "rect",
        ) as NodeElement<SVGRectElement>
    tileRectElement.setAttribute("width", TILE_SIZE.toString())
    tileRectElement.setAttribute("height", TILE_SIZE.toString())
    tileRectElement.setAttribute("fill", sectionColor)
    tileRectElement.setAttribute("stroke-width", "1")
    tileRectElement.setAttribute("stroke", "black")
    tileGroupElement.appendChild(tileRectElement)
}

export { addTileSquare }
