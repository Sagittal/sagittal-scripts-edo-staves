import { Px } from "@sagittal/general"
import {
    BOTTOM_MARGIN,
    LEFT_AND_RIGHT_MARGIN,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
} from "./constants"

const BOTH_SIDES: number = 2

// double canvas height and width to make space for title and tile
const setSvgSize = (svgDocument: Document): void => {
    const svg: SVGSVGElement = svgDocument.getElementsByTagName("svg")[0]

    const height: Px = (parseInt(svg.getAttribute("height") || "0") +
        TOP_MARGIN +
        TITLE_FONT_SIZE +
        BOTTOM_MARGIN) as Px
    const width: Px = (parseInt(svg.getAttribute("width") || "0") +
        LEFT_AND_RIGHT_MARGIN * BOTH_SIDES) as Px
    svg.setAttribute("height", height.toString())
    svg.setAttribute("width", width.toString())
}

export { setSvgSize }
