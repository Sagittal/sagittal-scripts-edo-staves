import { Io } from "@sagittal/general"
import {
    TITLE_FONT_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    TITLE_FONT_NAME,
    TOP_MARGIN,
    SUBTITLE_FONT_NAME,
    SUBTITLE_FONT_SIZE,
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

const addSubtitle = (svgDocument: Document, subtitle: Io): void => {
    const subtitleTextNode: Text = svgDocument.createTextNode(subtitle)
    const subtitleTextElement: HTMLElement = svgDocument.createElement("text")
    const subtitleGroupElement: HTMLElement = svgDocument.createElement("g")
    subtitleGroupElement.setAttribute(
        "transform",
        `translate(${LEFT_AND_RIGHT_MARGIN}, ${TOP_MARGIN + TITLE_FONT_SIZE})`,
    )
    subtitleTextElement.setAttribute("font-family", SUBTITLE_FONT_NAME)
    subtitleTextElement.setAttribute("font-size", SUBTITLE_FONT_SIZE.toString())
    subtitleTextElement.setAttribute("fill", "black")
    subtitleTextElement.appendChild(subtitleTextNode)
    subtitleGroupElement.appendChild(subtitleTextElement)
    svgDocument.documentElement.appendChild(subtitleGroupElement)
}

export { addTitle, addSubtitle }
