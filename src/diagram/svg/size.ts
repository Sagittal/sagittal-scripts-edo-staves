import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import {
    BOTTOM_MARGIN,
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
    TOTAL_WIDTH_NEEDED_FOR_TILE,
    // A_LITTLE_EXTRA_ROOM_FOR_SHARP_SIZE,
    EXTRA_ROOM_FOR_FIFTH_SIZE
} from "./constants"
import { NodeElement } from "./types"

const BOTH_SIDES: number = 2

const setDiagramSizeAndGetDiagramWidth = (
    svgDocument: Document,
    { titleWidth, expressionsWidth }: { titleWidth: Px; expressionsWidth: Px },
): Px => {
    const svg: NodeElement<SVGGElement> = svgDocument.getElementsByTagName(
        "svg",
    )[0] as NodeElement<SVGGElement>

    const existingHeight: Px = parseFloat(svg.getAttribute("height")!) as Px
    const height: Px = (existingHeight +
        TOP_MARGIN +
        TITLE_FONT_SIZE +
        SUBTITLE_FONT_SIZE +
        BOTTOM_MARGIN) as Px
    svg.setAttribute("height", height.toString())

    const existingWidth: Px = parseFloat(svg.getAttribute("width")!) as Px
    const widthAssumingStavesLongerEnoughThanTitleAndExpressions: Px =
        (existingWidth + LEFT_AND_RIGHT_MARGIN * BOTH_SIDES) as Px
    let width: Px
    if (
        widthAssumingStavesLongerEnoughThanTitleAndExpressions <
        titleWidth + TOTAL_WIDTH_NEEDED_FOR_TILE
    ) {
        width = (titleWidth + TOTAL_WIDTH_NEEDED_FOR_TILE) as Px
    } else if (
        widthAssumingStavesLongerEnoughThanTitleAndExpressions <
        expressionsWidth + TOTAL_WIDTH_NEEDED_FOR_TILE
    ) {
        width = (expressionsWidth + TOTAL_WIDTH_NEEDED_FOR_TILE) as Px
    } else {
        width = widthAssumingStavesLongerEnoughThanTitleAndExpressions
    }
    width = (width + EXTRA_ROOM_FOR_FIFTH_SIZE) as Px
    svg.setAttribute("width", width.toString())

    return width
}

export { setDiagramSizeAndGetDiagramWidth }
