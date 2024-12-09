import * as fs from "fs"
import { deepClone, Filename, Io, Px, Sentence, Unicode } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import { BRAVURA_TEXT_FONT } from "../../constants"
import { DiagramType } from "../../types"
import { getSvgStringFromDocument } from "./document"
import { addMeaningsAndGetWidth } from "./meaning"
import { makeNicelyPngifiable, shiftStavesDown } from "./shift"
import { setDiagramSizeAndGetDiagramWidth } from "./size"
import { textToSvgDocument } from "./text"
import { placeTile, addTileAndGetSize } from "./tile"
import { addSubtitleAndGetWidth, addTitleAndGetWidth } from "./titles"
import { NodeElement } from "./types"

const writeDiagramSvg = async ({
    inputSentence,
    title,
    subtitle,
    filename,
    edoNotationName,
    diagramType,
    dryRun,
}: {
    inputSentence: Io & Sentence
    title: Io
    subtitle: Io
    filename: Filename
    edoNotationName: EdoNotationName
    diagramType: DiagramType
    dryRun: boolean
}): Promise<void> => {
    const unicodeSentence: Unicode & Sentence = computeInputSentenceUnicode(inputSentence)

    if (dryRun) return

    const svgDocument: Document = await textToSvgDocument(unicodeSentence, deepClone(BRAVURA_TEXT_FONT))

    const {
        tileWrapperGroupElement,
        tileSize,
    }: { tileWrapperGroupElement: NodeElement<SVGGElement>; tileSize: Px } = await addTileAndGetSize(
        svgDocument,
        {
            edoNotationName,
            diagramType,
        },
    )

    shiftStavesDown(svgDocument, { tileSize })

    const titleWidth: Px = await addTitleAndGetWidth(svgDocument, title)
    const subtitleWidth: Px = await addSubtitleAndGetWidth(svgDocument, subtitle)
    const meaningsWidth: Px = await addMeaningsAndGetWidth(svgDocument, {
        edoNotationName,
        diagramType,
    })

    const diagramWidth: Px = setDiagramSizeAndGetDiagramWidth(svgDocument, {
        tileSize,
        titleWidth,
        subtitleWidth,
        meaningsWidth,
    })
    placeTile({ tileWrapperGroupElement, tileSize, diagramWidth })

    makeNicelyPngifiable(svgDocument)

    const svgString = getSvgStringFromDocument(svgDocument)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { writeDiagramSvg }
