import { Document } from "@xmldom/xmldom"
import { HexColor, Px } from "@sagittal/general"
import { computeSectionColor, Edo } from "@sagittal/system"
import {
    LEFT_AND_RIGHT_MARGIN,
    SVG_NS,
    TILE_SIZE,
    TILE_TOP_MARGIN,
} from "../constants"
import { NodeElement } from "../types"

const addTileSquare = ({
    svgDocument,
    diagramWidth,
    edo,
    useSecondBestFifth,
}: {
    svgDocument: Document
    diagramWidth: Px
    edo: Edo
    useSecondBestFifth: boolean
}): NodeElement<SVGGElement> => {
    const tileGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>
    tileGroupElement.setAttribute(
        "transform",
        `translate(${
            diagramWidth - LEFT_AND_RIGHT_MARGIN - TILE_SIZE
        }, ${TILE_TOP_MARGIN})`,
    )

    const sectionColor: HexColor = computeSectionColor(edo, useSecondBestFifth)
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

    svgDocument.documentElement!.appendChild(tileGroupElement)

    return tileGroupElement
}

export { addTileSquare }
