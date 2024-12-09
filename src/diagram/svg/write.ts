import * as fs from "fs"
import { deepClone, Filename, Io, Px, Sentence, Unicode } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { computeInputSentenceUnicode } from "staff-code"
import { BRAVURA_TEXT_FONT } from "../../constants"
import { DiagramType } from "../../types"
import { getSvgStringFromDocument } from "./document"
import { addMeaningsAndGetWidthAndExtraHeight } from "./meaning"
import { getAllTopLevelGroupElements, makeNicelyPngifiable, shiftStavesDown } from "./shift"
import { setDiagramSizeAndGetDiagramWidth } from "./size"
import { textToSvgDocument } from "./text"
import { placeTile, addTileAndGetSize } from "./tile"
import { addSubtitleAndGetWidth, addTitleAndGetWidth } from "./titles"
import { NodeElement } from "./types"
import { getGroupWidth } from "./width"

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
    const stavesWidth: Px = getGroupWidth(svgDocument.documentElement! as NodeElement<SVGGElement>)

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

    const staveGroupElements = getAllTopLevelGroupElements(
        svgDocument.documentElement! as NodeElement<SVGElement>,
    )

    const titleWidth: Px = await addTitleAndGetWidth(svgDocument, title)
    const subtitleWidth: Px = await addSubtitleAndGetWidth(svgDocument, subtitle)
    const { width: meaningsWidth, extraHeight }: { width: Px; extraHeight: Px } =
        await addMeaningsAndGetWidthAndExtraHeight(svgDocument, {
            edoNotationName,
            diagramType,
            stavesWidth,
        })

    shiftStavesDown(staveGroupElements, { tileSize, extraHeight })

    const diagramWidth: Px = setDiagramSizeAndGetDiagramWidth(svgDocument, {
        tileSize,
        titleWidth,
        subtitleWidth,
        meaningsWidth,
        extraHeight,
    })
    placeTile({ tileWrapperGroupElement, tileSize, diagramWidth })

    makeNicelyPngifiable(svgDocument)

    const svgString = getSvgStringFromDocument(svgDocument)

    if (!fs.existsSync("dist")) fs.mkdirSync("dist")
    fs.writeFileSync(`dist/${filename}`, svgString)
}

export { writeDiagramSvg }
