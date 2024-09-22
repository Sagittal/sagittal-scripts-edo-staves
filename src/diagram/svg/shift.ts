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
import { Index, Px, round } from "@sagittal/general"

const INDEX_OF_X_TRANSFORM: Index = 1 as Index
const INDEX_OF_Y_TRANSFORM: Index = 2 as Index

const roundAllTranslations = (tileGroupElement: NodeElement<SVGGElement>): void => {
    const groupElements: NodeElement<SVGGElement>[] = getAllTopLevelGroupElements(tileGroupElement)

    groupElements.forEach((groupElement: NodeElement<SVGGElement>): void => {
        const { existingX, existingY }: { existingX: Px, existingY: Px } = computeExistingTransform(groupElement)

        groupElement.setAttribute(
            "transform",
            `translate(${round(existingX)} ${round(existingY)})`,
        )
    })
}

const computeExistingTransform = (
    groupElement: NodeElement<SVGGElement>,
): { existingX: Px; existingY: Px } => {
    const existingTransform: string = groupElement.getAttribute("transform")!
    const existingXAndYRegExpMatches: null | RegExpMatchArray =
        existingTransform?.match(/translate\((-?\d+\.?\d*)\s+(-?\d+\.?\d*)\)/)
    const existingX: Px = existingXAndYRegExpMatches
        ? (parseFloat(existingXAndYRegExpMatches[INDEX_OF_X_TRANSFORM]) as Px)
        : (0 as Px)
    const existingY: Px = existingXAndYRegExpMatches
        ? (parseFloat(existingXAndYRegExpMatches[INDEX_OF_Y_TRANSFORM]) as Px)
        : (0 as Px)

    return { existingX, existingY }
}

const shiftGroupElement = (
    groupElement: NodeElement<SVGGElement>,
    xOffset: Px,
    yOffset: Px,
): void => {
    const { existingX, existingY }: { existingX: Px; existingY: Px } =
        computeExistingTransform(groupElement)

    groupElement?.setAttribute(
        "transform",
        `translate(${existingX + xOffset} ${existingY + yOffset})`,
    )
}

const getAllTopLevelGroupElements = (nodeElement: NodeElement<SVGElement>) => {
    const childElements: NodeElement<SVGElement>[] = Array.from(
        nodeElement.childNodes,
    ) as NodeElement<SVGElement>[]

    return childElements.filter(
        (childElement: NodeElement<SVGElement>): boolean =>
            childElement.tagName === "g",
    ) as NodeElement<SVGGElement>[]
}

const shiftAllTopLevelGroupElements = (
    svgDocument: Document,
    xOffset: Px,
    yOffset: Px,
): void => {
    const groupElements: NodeElement<SVGGElement>[] =
        getAllTopLevelGroupElements(
            svgDocument.documentElement! as NodeElement<SVGElement>,
        )

    groupElements.forEach((groupElement: NodeElement<SVGGElement>): void => {
        shiftGroupElement(groupElement, xOffset, yOffset)
    })
}

// shift staves down to make space for title and tile, and slightly to the right
// relies on these being the only group elements in the SVG at this time;
// the titles and tile have not yet been added
const shiftStavesDown = (svgDocument: Document): void =>
    shiftAllTopLevelGroupElements(
        svgDocument,
        LEFT_AND_RIGHT_MARGIN,
        (TOP_MARGIN +
            TITLE_FONT_SIZE +
            SUBTITLE_FONT_SIZE +
            EXTRA_SPACE_TO_COMFORTABLY_CLEAR_TILE) as Px,
    )

const makeNicelyPngifiable = (svgDocument: Document): void =>
    shiftAllTopLevelGroupElements(
        svgDocument,
        0 as Px,
        OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    )

export {
    shiftStavesDown,
    makeNicelyPngifiable,
    shiftGroupElement,
    computeExistingTransform,
    getAllTopLevelGroupElements,
    roundAllTranslations,
}
