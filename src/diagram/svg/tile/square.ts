import { HexColor } from "@sagittal/general"
import { computeSectionColor, EdoNotationName, SectionColor } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { SVG_NS, TILE_SIZE } from "../constants"
import { NodeElement } from "../types"

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
    const sectionColor: SectionColor | HexColor = computeSectionColor(edoNotationName)
    const tileRectElement: NodeElement<SVGRectElement> = svgDocument.createElementNS(
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
