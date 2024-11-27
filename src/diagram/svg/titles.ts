import { Io, Px } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import { OPEN_SANS_REGULAR_FONT_FILE, SANOMAT_FONT_FILE } from "../../constants"
import {
    TITLE_FONT_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    TITLE_Y_OFFSET,
    SUBTITLE_FURTHER_Y_OFFSET,
} from "./constants"
import { addText } from "./text"
import { NodeElement } from "./types"
import { getGroupWidth } from "./width"

const addTitleAndGetWidth = async (svgDocument: Document, title: Io): Promise<Px> => {
    const titleGroupElement: NodeElement<SVGGElement> = await addText(svgDocument.documentElement!, title, {
        fontFile: SANOMAT_FONT_FILE,
        fontSize: TITLE_FONT_SIZE,
        xOffset: LEFT_AND_RIGHT_MARGIN,
        yOffset: TITLE_Y_OFFSET,
    })

    return getGroupWidth(titleGroupElement)
}

const addSubtitleAndGetWidth = async (svgDocument: Document, subtitle: Io): Promise<Px> => {
    const subtitleGroupElement: NodeElement<SVGGElement> = await addText(
        svgDocument.documentElement!,
        subtitle,
        {
            fontFile: OPEN_SANS_REGULAR_FONT_FILE,
            fontSize: SUBTITLE_FONT_SIZE,
            xOffset: LEFT_AND_RIGHT_MARGIN,
            yOffset: (TITLE_Y_OFFSET + TITLE_FONT_SIZE + SUBTITLE_FURTHER_Y_OFFSET) as Px,
        },
    )

    return getGroupWidth(subtitleGroupElement)
}

export { addTitleAndGetWidth, addSubtitleAndGetWidth }
