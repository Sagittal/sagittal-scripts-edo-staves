import { DOMParser, XMLSerializer } from "xmldom"
import { Io, Px } from "@sagittal/general";

const CANVAS_HEIGHT_EXPANSION_FACTOR: number = 2
const CANVAS_WIDTH_EXPANSION_FACTOR: number = 2

const LEFT_MARGIN: Px = 10 as Px
const TOP_MARGIN: Px = 20 as Px
const FONT_SIZE: Px = 10 as Px

const SAGITTAL_FONT_NAME: string = "Sanomat-Semibold"

const addTitle = (svgString: string, title: Io): string => {
    // parse in
    const parser: DOMParser = new DOMParser()
    const svgDocument: Document = parser.parseFromString(svgString, "image/svg+xml")
    const svg: SVGSVGElement = svgDocument.getElementsByTagName("svg")[0]

    // double canvas height and width to make space for title and tile 
    svg.setAttribute("height", `${(parseInt(svg.getAttribute("height") || "0") * CANVAS_HEIGHT_EXPANSION_FACTOR)}`)
    svg.setAttribute("width", `${(parseInt(svg.getAttribute("width") || "0") * CANVAS_WIDTH_EXPANSION_FACTOR)}`)
    
    // shift staves down to make space for title and tile, and slightly to the right
    Array.from(svgDocument.getElementsByTagName("g")).forEach((svgGroupElementForStave: SVGGElement) => {
        const currentTransform: string = svgGroupElementForStave.getAttribute("transform")!
        const currentTransformXAndYRegExpMatches: null | RegExpMatchArray = currentTransform?.match(/translate\((\d+)\s+(\d+)\)/)
        const currentTransformY: number = currentTransformXAndYRegExpMatches ? parseInt(currentTransformXAndYRegExpMatches[2]) : 0
        svgGroupElementForStave?.setAttribute("transform", `translate(${LEFT_MARGIN} ${currentTransformY + TOP_MARGIN + FONT_SIZE})`)
    })

    // actually add title
    const titleTextNode: Text = svgDocument.createTextNode(title)
    const titleTextElement: HTMLElement = svgDocument.createElement("text")
    titleTextElement.setAttribute("x", `${LEFT_MARGIN}`)
    titleTextElement.setAttribute("y", `${TOP_MARGIN}`)
    titleTextElement.setAttribute("font-family", SAGITTAL_FONT_NAME) 
    titleTextElement.setAttribute("font-size", `${FONT_SIZE}`) 
    titleTextElement.setAttribute("fill", "black")
    titleTextElement.appendChild(titleTextNode)
    svgDocument.documentElement.appendChild(titleTextElement)

    // serialize out
    const serializer: XMLSerializer = new XMLSerializer()
    return serializer.serializeToString(svgDocument)
}

export {
    addTitle,
}
