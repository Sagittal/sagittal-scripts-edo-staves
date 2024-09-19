import { Document } from "@xmldom/xmldom"
import {
    LEFT_AND_RIGHT_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    SUBTITLE_FONT_SIZE,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
} from "./constants"
import { NodeElement } from "./types"

// shift staves down to make space for title and tile, and slightly to the right
const shiftStaves = (svgDocument: Document): void => {
    const staveGroupElements: NodeElement<SVGGElement>[] = Array.from(svgDocument.getElementsByTagName("g")) as NodeElement<SVGGElement>[]
    
    staveGroupElements.forEach((staveGroupElement: NodeElement<SVGGElement>): void => {
        const currentTransform: string =
            staveGroupElement.getAttribute("transform")!
        const currentTransformXAndYRegExpMatches: null | RegExpMatchArray =
            currentTransform?.match(/translate\((\d+)\s+(\d+)\)/)
        const currentTransformY: number = currentTransformXAndYRegExpMatches
            ? parseInt(currentTransformXAndYRegExpMatches[2])
            : 0
        staveGroupElement?.setAttribute(
            "transform",
            `translate(${LEFT_AND_RIGHT_MARGIN} ${
                currentTransformY +
                TOP_MARGIN +
                TITLE_FONT_SIZE +
                SUBTITLE_FONT_SIZE +
                OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION
            })`,
        )
    })
}

export { shiftStaves }
