import * as fs from "fs"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import { Filename, Io, Px, Sentence, Unicode } from "@sagittal/general"
import { EdoName } from "@sagittal/system"
import { addSubtitle, addTitle } from "./titles"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
} from "./constants"
import { getSvgStringFromDocument } from "./document"
import { setDiagramSizeAndGetDiagramWidth } from "./size"
import { makeNicelyPngifiable, shiftStaves } from "./shift"
import { addTile } from "./tile"
import { textToSvgDocument } from "./element"

// TODO: consider renaming this repo to emphasize the default spellings of it, like, it's not designed for anyone to use for whatever

const writeDiagramSvg = async ({
    inputSentence,
    title,
    filename,
    edoName,
}: {
    inputSentence: Io & Sentence
    title: Io
    filename: Filename
    edoName: EdoName
}): Promise<void> => {
    const unicodeSentence: Unicode & Sentence =
        computeInputSentenceUnicode(inputSentence)

    const svgDocument: Document = await textToSvgDocument(unicodeSentence, {
        fontFile: BRAVURA_TEXT_SC_FONT_FILE,
        fontSize: BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
    })

    const diagramWidth: Px = setDiagramSizeAndGetDiagramWidth(svgDocument)
    shiftStaves(svgDocument)
    await addTitle(svgDocument, title)
    await addSubtitle(svgDocument, "(default spellings)")
    await addTile(svgDocument, { edoName, diagramWidth })
    makeNicelyPngifiable(svgDocument)

    const svgString = getSvgStringFromDocument(svgDocument)
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { writeDiagramSvg }
