import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import {
    BOTTOM_MARGIN,
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
} from "./constants"
import { NodeElement } from "./types"

const BOTH_SIDES: number = 2

const setDiagramSizeAndGetDiagramWidth = (svgDocument: Document): Px => {
    const svg: NodeElement<SVGGElement> = svgDocument.getElementsByTagName("svg")[0] as NodeElement<SVGGElement>

    const height: Px = (parseInt(svg.getAttribute("height") || "0") +
        TOP_MARGIN +
        TITLE_FONT_SIZE +
        SUBTITLE_FONT_SIZE +
        BOTTOM_MARGIN) as Px
    const width: Px = (parseInt(svg.getAttribute("width") || "0") +
        LEFT_AND_RIGHT_MARGIN * BOTH_SIDES) as Px
    svg.setAttribute("height", height.toString())
    svg.setAttribute("width", width.toString())

    return width
}

export { setDiagramSizeAndGetDiagramWidth }
