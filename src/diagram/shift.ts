import {
    LEFT_AND_RIGHT_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    TITLE_FONT_SIZE,
    TOP_MARGIN,
} from "./constants"

// shift staves down to make space for title and tile, and slightly to the right
const shiftStavesDown = (svgDocument: Document): void => {
    Array.from(svgDocument.getElementsByTagName("g")).forEach(
        (svgGroupElementForStave: SVGGElement) => {
            const currentTransform: string =
                svgGroupElementForStave.getAttribute("transform")!
            const currentTransformXAndYRegExpMatches: null | RegExpMatchArray =
                currentTransform?.match(/translate\((\d+)\s+(\d+)\)/)
            const currentTransformY: number = currentTransformXAndYRegExpMatches
                ? parseInt(currentTransformXAndYRegExpMatches[2])
                : 0
            svgGroupElementForStave?.setAttribute(
                "transform",
                `translate(${LEFT_AND_RIGHT_MARGIN} ${
                    currentTransformY +
                    TOP_MARGIN +
                    TITLE_FONT_SIZE +
                    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION
                })`,
            )
        },
    )
}

export { shiftStavesDown }
