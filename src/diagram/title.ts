import { Io } from "@sagittal/general"
import {
    TITLE_FONT_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    TITLE_FONT_NAME,
    TOP_MARGIN,
} from "./constants"

const addTitle = (svgDocument: Document, title: Io): void => {
    const titleTextNode: Text = svgDocument.createTextNode(title)
    const titleTextElement: HTMLElement = svgDocument.createElement("text")
    const titleGroupElement: HTMLElement = svgDocument.createElement("g")
    titleGroupElement.setAttribute(
        "transform",
        `translate(${LEFT_AND_RIGHT_MARGIN}, ${TOP_MARGIN})`,
    )
    titleTextElement.setAttribute("font-family", TITLE_FONT_NAME)
    titleTextElement.setAttribute("font-size", TITLE_FONT_SIZE.toString())
    titleTextElement.setAttribute("fill", "black")
    titleTextElement.appendChild(titleTextNode)
    titleGroupElement.appendChild(titleTextElement)
    svgDocument.documentElement.appendChild(titleGroupElement)
}

export { addTitle }
