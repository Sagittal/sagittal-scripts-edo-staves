import { Px } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import { LEFT_AND_RIGHT_MARGIN, OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION, TOP_MARGIN } from "./constants"
import { furtherTransform, roundTransform } from "./transform"
import { NodeElement } from "./types"

const roundAllTranslations = (tileGroupElement: NodeElement<SVGGElement>): void =>
    getAllTopLevelGroupElements(tileGroupElement).forEach(roundTransform)

const getAllTopLevelGroupElements = (nodeElement: NodeElement<SVGElement>) => {
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

// shift staves down to make space for title and tile, and slightly to the right
// relies on these being the only group elements in the SVG at this time;
// the titles and tile have not yet been added
const shiftStavesDown = (svgDocument: Document, { tileSize }: { tileSize: Px }): void =>
    shiftAllTopLevelGroupElements(svgDocument, LEFT_AND_RIGHT_MARGIN, (TOP_MARGIN + tileSize) as Px)

const makeNicelyPngifiable = (svgDocument: Document): void =>
    shiftAllTopLevelGroupElements(svgDocument, 0 as Px, OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION)

export { shiftStavesDown, makeNicelyPngifiable, getAllTopLevelGroupElements, roundAllTranslations }
