import { Document } from "@xmldom/xmldom"
import {
    LEFT_AND_RIGHT_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    TOP_MARGIN,
    TILE_SIZE,
} from "./constants"
import { NodeElement } from "./types"
import { Count, Index, isUndefined, Maybe, Px, round } from "@sagittal/general"
import { computeTileRowCountScaleFactor } from "./tile/tileRowCount"

const INDEX_OF_X_TRANSFORM: Index = 1 as Index
const INDEX_OF_Y_TRANSFORM: Index = 2 as Index

const roundAllTranslations = (
    tileGroupElement: NodeElement<SVGGElement>,
): void => {
    const groupElements: NodeElement<SVGGElement>[] =
        getAllTopLevelGroupElements(tileGroupElement)

    groupElements.forEach((groupElement: NodeElement<SVGGElement>): void => {
        const {
            xTransformExisting,
            yTransformExisting,
        }: { xTransformExisting: Px; yTransformExisting: Px } =
            computeExistingTransform(groupElement)
        // TODO: existing scale breaks the whole point of this, but not sure what else to do...
        // other than to completely redo this whole thing so that we never scale anything other than the square itself
        // always keeping the sagittals the same size and positioning them within the scaled up square
        const existingScale: Maybe<number> = computeExistingScale(groupElement)

        const newX: Px = round(xTransformExisting)
        const newY: Px = round(yTransformExisting)
        const newScale: string = isUndefined(existingScale)
            ? ""
            : ` scale(${existingScale})`

        groupElement.setAttribute(
            "transform",
            `translate(${newX} ${newY})${newScale}`,
        )
    })
}

const computeExistingScale = (
    groupElement: NodeElement<SVGGElement>,
): Maybe<number> => {
    const existingTransform: string = groupElement.getAttribute("transform")!
    const scaleMatch: null | RegExpMatchArray =
        existingTransform.match(/scale\(([^)]+)\)/)

    return scaleMatch ? parseFloat(scaleMatch[1]) : undefined
}

const computeExistingTransform = (
    groupElement: NodeElement<SVGGElement>,
): { xTransformExisting: Px; yTransformExisting: Px } => {
    const existingTransform: string = groupElement.getAttribute("transform")!
    const existingXAndYRegExpMatches: null | RegExpMatchArray =
        existingTransform.match(/translate\((-?\d+\.?\d*)\s+(-?\d+\.?\d*)\)/)
    const xTransformExisting: Px = existingXAndYRegExpMatches
        ? (parseFloat(existingXAndYRegExpMatches[INDEX_OF_X_TRANSFORM]) as Px)
        : (0 as Px)
    const yTransformExisting: Px = existingXAndYRegExpMatches
        ? (parseFloat(existingXAndYRegExpMatches[INDEX_OF_Y_TRANSFORM]) as Px)
        : (0 as Px)

    return { xTransformExisting, yTransformExisting }
}

const shiftGroupElement = (
    groupElement: NodeElement<SVGGElement>,
    xOffset: Px,
    yOffset: Px,
): void => {
    const {
        xTransformExisting,
        yTransformExisting,
    }: { xTransformExisting: Px; yTransformExisting: Px } =
        computeExistingTransform(groupElement)

    groupElement?.setAttribute(
        "transform",
        `translate(${xTransformExisting + xOffset} ${
            yTransformExisting + yOffset
        })`,
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
const shiftStavesDown = (
    svgDocument: Document,
    { tileRowCount }: { tileRowCount: Count },
): void =>
    shiftAllTopLevelGroupElements(
        svgDocument,
        LEFT_AND_RIGHT_MARGIN,
        (TOP_MARGIN +
            TILE_SIZE * computeTileRowCountScaleFactor(tileRowCount)) as Px,
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
