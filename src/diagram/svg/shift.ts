import { Document } from "@xmldom/xmldom"
import {
    LEFT_AND_RIGHT_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
    EXTRA_SPACE_TO_COMFORTABLY_CLEAR_TILE,
} from "./constants"
import { NodeElement } from "./types"
import { Index, Px } from "@sagittal/general"

const INDEX_OF_X_TRANSFORM: Index = 1 as Index
const INDEX_OF_Y_TRANSFORM: Index = 2 as Index

const shiftAllGroupElements = (
    svgDocument: Document,
    xOffset: Px,
    yOffset: Px,
): void => {
    const groupElements: NodeElement<SVGGElement>[] = Array.from(
        svgDocument.getElementsByTagName("g"),
    ) as NodeElement<SVGGElement>[]

    groupElements.forEach((groupElement: NodeElement<SVGGElement>): void => {
        const currentTransform: string = groupElement.getAttribute("transform")!
        const currentTransformXAndYRegExpMatches: null | RegExpMatchArray =
            currentTransform?.match(
                /translate\((-?\d+\.?\d*)\s+(-?\d+\.?\d*)\)/,
            )
        const currentTransformX: Px = currentTransformXAndYRegExpMatches
            ? (parseInt(
                  currentTransformXAndYRegExpMatches[INDEX_OF_X_TRANSFORM],
              ) as Px)
            : (0 as Px)
        const currentTransformY: Px = currentTransformXAndYRegExpMatches
            ? (parseInt(
                  currentTransformXAndYRegExpMatches[INDEX_OF_Y_TRANSFORM],
              ) as Px)
            : (0 as Px)
        groupElement?.setAttribute(
            "transform",
            `translate(${currentTransformX + xOffset} ${
                currentTransformY + yOffset
            })`,
        )
    })
}

// shift staves down to make space for title and tile, and slightly to the right
// relies on these being the only group elements in the SVG at this time;
// the titles and tile have not yet been added
const shiftStavesDown = (svgDocument: Document): void =>
    shiftAllGroupElements(
        svgDocument,
        LEFT_AND_RIGHT_MARGIN,
        (TOP_MARGIN + TITLE_FONT_SIZE + SUBTITLE_FONT_SIZE + EXTRA_SPACE_TO_COMFORTABLY_CLEAR_TILE) as Px,
    )

const makeNicelyPngifiable = (svgDocument: Document): void =>
    shiftAllGroupElements(
        svgDocument,
        0 as Px,
        OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    )

export { shiftStavesDown, makeNicelyPngifiable }
