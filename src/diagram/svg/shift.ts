import { Px } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import {
    MEANINGS_SPACING,
    LEFT_AND_RIGHT_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    TOP_MARGIN,
} from "./constants"
import { furtherTransform, roundTransform } from "./transform"
import { NodeElement } from "./types"

const roundAllTranslations = (tileGroupElement: NodeElement<SVGGElement>): void =>
    getAllTopLevelGroupElements(tileGroupElement).forEach(roundTransform)

const getAllTopLevelGroupElements = (nodeElement: NodeElement<SVGElement>): NodeElement<SVGGElement>[] => {
    const childElements: NodeElement<SVGElement>[] = Array.from(
        nodeElement.childNodes,
    ) as NodeElement<SVGElement>[]

    return childElements.filter(
        (childElement: NodeElement<SVGElement>): boolean => childElement.tagName === "g",
    ) as NodeElement<SVGGElement>[]
}

const shiftAllTopLevelGroupElements = (svgDocument: Document, xTranslation: Px, yTranslation: Px): void => {
    const groupElements: NodeElement<SVGGElement>[] = getAllTopLevelGroupElements(
        svgDocument.documentElement! as NodeElement<SVGElement>,
    )

    groupElements.forEach((groupElement: NodeElement<SVGGElement>): void => {
        furtherTransform(groupElement, { xTranslation, yTranslation })
    })
}

// shift staves down to make space for titles, meanings, and tile, and slightly to the right
const shiftStavesDown = (
    staveGroupElements: NodeElement<SVGGElement>[],
    { tileSize, extraHeight }: { tileSize: Px; extraHeight: Px },
): void => {
    staveGroupElements.forEach((staveGroupElement: NodeElement<SVGGElement>): void => {
        furtherTransform(staveGroupElement, {
            xTranslation: LEFT_AND_RIGHT_MARGIN,
            yTranslation: (TOP_MARGIN + tileSize + MEANINGS_SPACING + extraHeight) as Px,
        })
    })
}

const makeNicelyPngifiable = (svgDocument: Document): void =>
    shiftAllTopLevelGroupElements(svgDocument, 0 as Px, OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION)

export { shiftStavesDown, makeNicelyPngifiable, getAllTopLevelGroupElements, roundAllTranslations }
