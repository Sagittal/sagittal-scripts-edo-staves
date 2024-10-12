import { Document } from "@xmldom/xmldom"
import { Count, Px } from "@sagittal/general"
import {
    LEFT_AND_RIGHT_MARGIN,
    TOP_MARGIN,
    TOTAL_WIDTH_NEEDED_FOR_TILE,
    EXTRA_ROOM_FOR_FIFTH_SIZE,
    TILE_SIZE,
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
        TILE_SIZE * computeTileRowCountScaleFactor(tileRowCount)) as Px
    svg.setAttribute("height", height.toString())

    const existingWidth: Px = parseFloat(svg.getAttribute("width")!) as Px
    const widthAssumingStavesLongerEnoughThanTitleAndExpressions: Px =
        (existingWidth + LEFT_AND_RIGHT_MARGIN * BOTH_SIDES) as Px
    let width: Px

    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)
    const totalWidthNeededForTile: Px = (TOTAL_WIDTH_NEEDED_FOR_TILE *
        tileRowCountScaleFactor) as Px

    width = widthAssumingStavesLongerEnoughThanTitleAndExpressions

    if (width < titleWidth + totalWidthNeededForTile)
        width = (titleWidth + totalWidthNeededForTile) as Px

    if (width < expressionsWidth + totalWidthNeededForTile)
        width = (expressionsWidth + totalWidthNeededForTile) as Px

    width = (width + EXTRA_ROOM_FOR_FIFTH_SIZE) as Px
    svg.setAttribute("width", width.toString())

    return width
}

export { setDiagramSizeAndGetDiagramWidth }
