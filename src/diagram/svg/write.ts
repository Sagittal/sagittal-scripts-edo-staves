import * as fs from "fs"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import {
    Filename,
    Io,
    Px,
    Sentence,
    textToSvg,
    Unicode,
} from "@sagittal/general"
import { addSubtitle, addTitle } from "./titles"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
} from "./constants"
import { getSvgDocumentFromString, getSvgStringFromDocument } from "./document"
import { setDiagramSizeAndGetDiagramWidth } from "./size"
import { makeNicelyPngifiable, shiftStaves } from "./shift"
import { addTile } from "./tile"
import { Edo } from "@sagittal/system"

const writeDiagramSvg = async ({
    inputSentence,
    title,
    filename,
    edo,
    useSecondBestFifth,
}: {
    inputSentence: Io & Sentence
    title: Io
    filename: Filename
    edo: Edo
    useSecondBestFifth: boolean
}): Promise<void> => {
    const unicodeSentence: Unicode & Sentence =
        computeInputSentenceUnicode(inputSentence)

    let svgString: string = await textToSvg(unicodeSentence, {
        font: BRAVURA_TEXT_SC_FONT_FILE,
        fontSize: BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
    })
    const svgDocument: Document = getSvgDocumentFromString(svgString)

    const diagramWidth: Px = setDiagramSizeAndGetDiagramWidth(svgDocument)
    shiftStaves(svgDocument)
    await addTitle(svgDocument, title)
    await addSubtitle(svgDocument, "(default spellings)")
    await addTile(svgDocument, { edo, useSecondBestFifth, diagramWidth })
    makeNicelyPngifiable(svgDocument)

    svgString = getSvgStringFromDocument(svgDocument)
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { writeDiagramSvg }
