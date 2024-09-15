import * as fs from "fs"
import { computeInputSentenceUnicode } from "staff-code"
import { Filename, Io, Sentence, textToSvg, Unicode } from "@sagittal/general"
import { addSubtitle, addTitle } from "./titles"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
} from "./constants"
import { getSvgDocumentFromString, getSvgStringFromDocument } from "./svg"
import { setSvgSize } from "./size"
import { shiftStavesDown } from "./shift"

const asyncGenerateDiagram = async (
    inputSentence: Io & Sentence,
    title: Io,
    filename: Filename,
): Promise<void> => {
    const unicodeSentence: Unicode & Sentence =
        computeInputSentenceUnicode(inputSentence)

    let svgString: string = await textToSvg(unicodeSentence, {
        font: BRAVURA_TEXT_SC_FONT_FILE,
        fontSize: BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
    })
    const svgDocument: Document = getSvgDocumentFromString(svgString)
    setSvgSize(svgDocument)
    shiftStavesDown(svgDocument)
    addTitle(svgDocument, title)
    addSubtitle(svgDocument, "(default spellings)")
    svgString = getSvgStringFromDocument(svgDocument)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { asyncGenerateDiagram }
