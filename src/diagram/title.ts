import { DOMParser, XMLSerializer } from "xmldom"
import { Io, Px } from "@sagittal/general";

const LEFT_MARGIN: Px = 30 as Px
const TOP_MARGIN: Px = 60 as Px
const FONT_SIZE: Px = 24 as Px

const SAGITTAL_FONT_NAME: string = "Sanomat"

const addTitle = (svgString: string, title: Io): string => {
    // parse in
    const parser: DOMParser = new DOMParser()
    const svgDocument: Document = parser.parseFromString(svgString, "image/svg+xml")
    const svg: SVGSVGElement = svgDocument.getElementsByTagName("svg")[0]

    // double canvas height and width to make space for title and tile 
    const height: Px = parseInt(svg.getAttribute("height") || "0") + TOP_MARGIN * 2 + FONT_SIZE as Px
    const width: Px = parseInt(svg.getAttribute("width") || "0") + LEFT_MARGIN * 2 as Px
    svg.setAttribute("height", height.toString())
    svg.setAttribute("width", width.toString())
    
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
    const titleGroupElement: HTMLElement = svgDocument.createElement("g")
    titleGroupElement.setAttribute("transform", `translate(${LEFT_MARGIN}, ${TOP_MARGIN})`)
    titleTextElement.setAttribute("font-family", SAGITTAL_FONT_NAME) 
    titleTextElement.setAttribute("font-size", `${FONT_SIZE}`) 
    titleTextElement.setAttribute("fill", "black")
    titleTextElement.appendChild(titleTextNode)
    titleGroupElement.appendChild(titleTextElement)
    svgDocument.documentElement.appendChild(titleGroupElement)

    // serialize out
    const serializer: XMLSerializer = new XMLSerializer()
    return serializer.serializeToString(svgDocument)
}

export {
    addTitle,
}
