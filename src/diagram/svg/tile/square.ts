import { Document } from "@xmldom/xmldom"
import { HexColor, Px } from "@sagittal/general"
import { computeSectionColor, EdoName } from "@sagittal/system"
import {
    A_LITTLE_EXTRA_ROOM_FOR_SHARP_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    SVG_NS,
    TILE_SIZE,
    TILE_TOP_MARGIN,
} from "../constants"
import { NodeElement } from "../types"
import { append } from "../append"

const addTileSquare = ({
    svgDocument,
    diagramWidth,
    edoName,
}: {
    svgDocument: Document
    diagramWidth: Px
    edoName: EdoName
}): NodeElement<SVGGElement> => {
    const tileGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>
    tileGroupElement.setAttribute(
        "transform",
        `translate(${
            diagramWidth - LEFT_AND_RIGHT_MARGIN - TILE_SIZE - A_LITTLE_EXTRA_ROOM_FOR_SHARP_SIZE
        } ${TILE_TOP_MARGIN})`,
    )

    const sectionColor: HexColor = computeSectionColor(edoName)
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

    append(svgDocument, tileGroupElement)

    return tileGroupElement
}

export { addTileSquare }
