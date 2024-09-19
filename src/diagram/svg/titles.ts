import { Document } from "@xmldom/xmldom"
import { Io, Px } from "@sagittal/general"
import {
    TITLE_FONT_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    SUBTITLE_FONT_SIZE,
    SANOMAT_FONT_FILE,
    OPEN_SANS_REGULAR_FONT_FILE,
    TITLE_Y_OFFSET,
    SUBTITLE_FURTHER_Y_OFFSET,
} from "./constants"
import { addText } from "./text"

const addTitle = async (svgDocument: Document, title: Io): Promise<void> => {
    await addText(svgDocument.documentElement!, title, {
        fontFile: SANOMAT_FONT_FILE,
        fontSize: TITLE_FONT_SIZE,
        xOffset: LEFT_AND_RIGHT_MARGIN,
        yOffset: TITLE_Y_OFFSET,
    })
}

const addSubtitle = async (
    svgDocument: Document,
    subtitle: Io,
): Promise<void> => {
    await addText(svgDocument.documentElement!, subtitle, {
        fontFile: OPEN_SANS_REGULAR_FONT_FILE,
        fontSize: SUBTITLE_FONT_SIZE,
        xOffset: LEFT_AND_RIGHT_MARGIN,
        yOffset: (TITLE_Y_OFFSET +
            TITLE_FONT_SIZE +
            SUBTITLE_FURTHER_Y_OFFSET) as Px,
    })
}

export { addTitle, addSubtitle }
