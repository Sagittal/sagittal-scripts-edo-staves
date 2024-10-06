import { Document } from "@xmldom/xmldom"
import { Count, Px } from "@sagittal/general"
import {
    BOTTOM_MARGIN,
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
    TOTAL_WIDTH_NEEDED_FOR_TILE,
    EXTRA_ROOM_FOR_FIFTH_SIZE,
} from "./constants"
import { NodeElement } from "./types"
import { computeTileRowCountScaleFactor } from "./tile/rowCount"

const BOTH_SIDES: number = 2

const setDiagramSizeAndGetDiagramWidth = (
    svgDocument: Document,
    {
        titleWidth,
        expressionsWidth,
        tileRowCount,
    }: { titleWidth: Px; expressionsWidth: Px; tileRowCount: Count },
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

    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)
    const totalWidthNeededForTile: Px = (TOTAL_WIDTH_NEEDED_FOR_TILE *
        tileRowCountScaleFactor) as Px

    if (
        widthAssumingStavesLongerEnoughThanTitleAndExpressions <
        titleWidth + totalWidthNeededForTile
    ) {
        width = (titleWidth + totalWidthNeededForTile) as Px
    } else if (
        widthAssumingStavesLongerEnoughThanTitleAndExpressions <
        expressionsWidth + totalWidthNeededForTile
    ) {
        width = (expressionsWidth + totalWidthNeededForTile) as Px
    } else {
        width = widthAssumingStavesLongerEnoughThanTitleAndExpressions
    }
    width = (width + EXTRA_ROOM_FOR_FIFTH_SIZE) as Px
    svg.setAttribute("width", width.toString())

    return width
}

export { setDiagramSizeAndGetDiagramWidth }
