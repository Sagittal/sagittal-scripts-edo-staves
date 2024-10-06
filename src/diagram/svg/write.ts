import * as fs from "fs"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import { Count, Filename, Io, Px, Sentence, Unicode } from "@sagittal/general"
import { EdoName, Flavor } from "@sagittal/system"
import { addSubtitle, addTitleAndGetWidth } from "./titles"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
} from "./constants"
import { getSvgStringFromDocument } from "./document"
import { setDiagramSizeAndGetDiagramWidth } from "./size"
import { makeNicelyPngifiable, shiftStavesDown } from "./shift"
import { addTile } from "./tile"
import { textToSvgDocument } from "./text"
import { addExpressionsAndGetWidth } from "./expressions"
import { computeTileRowCount } from "./tile/rowCount"

const writeDiagramSvg = async ({
    inputSentence,
    title,
    filename,
    edoName,
    flavor,
}: {
    inputSentence: Io & Sentence
    title: Io
    filename: Filename
    edoName: EdoName
    flavor: Flavor
}): Promise<void> => {
    const unicodeSentence: Unicode & Sentence =
        computeInputSentenceUnicode(inputSentence)

    const svgDocument: Document = await textToSvgDocument(unicodeSentence, {
        fontFile: BRAVURA_TEXT_SC_FONT_FILE,
        fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
    })

    const tileRowCount: Count = computeTileRowCount({ edoName })

    shiftStavesDown(svgDocument, { tileRowCount })

    const titleWidth: Px = await addTitleAndGetWidth(svgDocument, title)

    await addSubtitle(svgDocument, "(default spellings)")

    const expressionsWidth: Px = await addExpressionsAndGetWidth(svgDocument, {
        edoName,
        flavor,
    })

    const diagramWidth: Px = setDiagramSizeAndGetDiagramWidth(svgDocument, {
        titleWidth,
        expressionsWidth,
        tileRowCount,
    })

    await addTile(svgDocument, { edoName, diagramWidth, flavor, tileRowCount })

    makeNicelyPngifiable(svgDocument)

    const svgString = getSvgStringFromDocument(svgDocument)
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { writeDiagramSvg }
