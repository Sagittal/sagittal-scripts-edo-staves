import * as fs from "fs"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import { Filename, Io, Px, Sentence, Unicode } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { addSubtitleAndGetWidth, addTitleAndGetWidth } from "./titles"
import {
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
} from "./constants"
import { getSvgStringFromDocument } from "./document"
import { setDiagramSizeAndGetDiagramWidth } from "./size"
import { makeNicelyPngifiable, shiftStavesDown } from "./shift"
import { textToSvgDocument } from "./text"
import { addExpressionsAndGetWidth } from "./expressions"
import { DiagramType } from "../../types"
import { NodeElement } from "./types"
import { placeTile, addTileAndGetSize } from "./tile"

const writeDiagramSvg = async ({
    inputSentence,
    title,
    subtitle,
    filename,
    edoNotationName,
    diagramType,
}: {
    inputSentence: Io & Sentence
    title: Io
    subtitle: Io
    filename: Filename
    edoNotationName: EdoNotationName
    diagramType: DiagramType
}): Promise<void> => {
    const unicodeSentence: Unicode & Sentence =
        computeInputSentenceUnicode(inputSentence)

    const svgDocument: Document = await textToSvgDocument(unicodeSentence, {
        fontFile: BRAVURA_TEXT_SC_FONT_FILE,
        fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
    })

    const {
        tileWrapperGroupElement,
        tileSize,
    }: { tileWrapperGroupElement: NodeElement<SVGGElement>; tileSize: Px } =
        await addTileAndGetSize(svgDocument, {
            edoNotationName,
            diagramType,
        })
    // TODO: Argh. But it just occurs to me that I've only counteracted shrinking sagittals by scaling the tile up w/r/t the row count.
    // That is, you know how 4 is the max full - size sagittals that fit in one row, but since when we have 2 rows we fit 6 to a row,
    // so before we actually split to 2 rows, we may as well start squishing the sagittals smaller until we have 6 in the one row before we hit 7 sagittals
    // and are then forced to split into 2 rows where the sagittals are the size such that 6 of them can fit in each row ?
    // Well, so for the tiles that have 5 or 6 sagittals in one row, for examples, those tiles don't increase in size proportionally
    // so that theoretically the sagittals in the PT never get smaller. So I'll have to make that tweak tomorrow.
    // I don't think it will cause that many problems. The really hard part was just getting the rows to go in the correct places within the tile.
    shiftStavesDown(svgDocument, { tileSize })

    const titleWidth: Px = await addTitleAndGetWidth(svgDocument, title)
    const subtitleWidth: Px = await addSubtitleAndGetWidth(
        svgDocument,
        subtitle,
    )
    const expressionsWidth: Px = await addExpressionsAndGetWidth(svgDocument, {
        edoNotationName,
        diagramType,
    })

    const diagramWidth: Px = setDiagramSizeAndGetDiagramWidth(svgDocument, {
        tileSize,
        titleWidth,
        subtitleWidth,
        expressionsWidth,
    })
    placeTile({ tileWrapperGroupElement, tileSize, diagramWidth })

    makeNicelyPngifiable(svgDocument)

    const svgString = getSvgStringFromDocument(svgDocument)
    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { writeDiagramSvg }
