import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import {
    LEFT_AND_RIGHT_MARGIN,
    TOP_MARGIN,
    TOTAL_WIDTH_NEEDED_FOR_TILE,
    EXTRA_ROOM_FOR_FIFTH_SIZE,
    TILE_SIZE,
} from "./constants"
import { NodeElement, Scaler } from "./types"

const BOTH_SIDES: Scaler = 2 as Scaler

const setDiagramSizeAndGetDiagramWidth = (
    svgDocument: Document,
    {
        titleWidth,
        subtitleWidth,
        meaningsWidth,
        tileSize,
    }: {
        titleWidth: Px
        subtitleWidth: Px
        meaningsWidth: Px
        tileSize: Px
    },
): Px => {
    const svg: NodeElement<SVGGElement> = svgDocument.getElementsByTagName(
        "svg",
    )[0] as NodeElement<SVGGElement>

    const existingHeight: Px = parseFloat(svg.getAttribute("height")!) as Px
    const height: Px = (existingHeight + TOP_MARGIN + tileSize) as Px
    svg.setAttribute("height", height.toString())

    const existingWidth: Px = parseFloat(svg.getAttribute("width")!) as Px
    const widthAssumingStavesLongerEnoughThanTitleSubtitleAndMeanings: Px =
        (existingWidth + LEFT_AND_RIGHT_MARGIN * BOTH_SIDES) as Px
    let width: Px

    const totalWidthNeededForTile: Px = ((TOTAL_WIDTH_NEEDED_FOR_TILE *
        tileSize) /
        TILE_SIZE) as Px

    width = widthAssumingStavesLongerEnoughThanTitleSubtitleAndMeanings

    if (width < titleWidth + totalWidthNeededForTile)
        width = (titleWidth + totalWidthNeededForTile) as Px

    if (width < subtitleWidth + totalWidthNeededForTile)
        width = (subtitleWidth + totalWidthNeededForTile) as Px

    if (width < meaningsWidth + totalWidthNeededForTile)
        width = (meaningsWidth + totalWidthNeededForTile) as Px

    width = (width + EXTRA_ROOM_FOR_FIFTH_SIZE) as Px
    svg.setAttribute("width", width.toString())

    return width
}

export { setDiagramSizeAndGetDiagramWidth }
