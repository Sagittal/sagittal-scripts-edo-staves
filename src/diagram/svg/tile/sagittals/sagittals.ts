import { Document } from "@xmldom/xmldom"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import { Font, NodeElement } from "../../types"
import { DiagramType } from "../../../../types"
import { Count, Index, Io, Px, Sentence } from "@sagittal/general"
import { TILE_SIZE } from "../../constants"
import { computeTileRowCountScaleFactor } from "../tileRowCount"
import { textsToSvgGroupElement } from "../../text"
import { computeTextsAndFonts } from "../textsAndFonts"
import { getGroupWidth } from "../../width"
import { computeDownToNextRowCountsScaleFactor } from "./nextRowCountScale"
import { computeSagitypesByRow } from "./sagitypesByRow"
import { ensureSagittalsWithinAvailableWidth } from "./ensureSagittalsWithinAvailableWidth"

const SAGITTAL_ROW_Y_OFFSET_FACTOR: number = 0.25

const updateFontsWithDownToNextRowCountsScaleFactorAndComputeCorrespondingAdditionalYOffsets =
    (fonts: Font[], { sagittalCount }: { sagittalCount: Count<Sagittal> }) => {
        const downToNextRowCountsScaleFactor: number =
            computeDownToNextRowCountsScaleFactor(sagittalCount)
        return fonts.map((font: Font): Px => {
            const oldFontSize: Px = font.fontSize
            const newFontSize: Px = (oldFontSize / downToNextRowCountsScaleFactor) as Px
            font.fontSize = newFontSize

            return (oldFontSize - newFontSize) as Px
        })
    }

const addSagittals = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoNotationName,
        diagramType,
        tileRowCount,
    }: {
        svgDocument: Document
        edoNotationName: EdoNotationName
        diagramType: DiagramType
        tileRowCount: Count
    },
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[
            edoNotationName
        ] as NonSubsetEdoNotationDefinition
    ).sagitypes

    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>
    if (sagittalCount === 0) return

    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)

    const sagitypesByRow: Sagitype[][] = computeSagitypesByRow(
        sagitypes,
        tileRowCount,
    )
    const sagittalRowGroupElements: NodeElement<SVGGElement>[] =
        await Promise.all(
            sagitypesByRow.map(
                async (
                    sagitypesForRow: Sagitype[],
                    sagittalRowIndex: number,
                ): Promise<NodeElement<SVGGElement>> => {
                    const {
                        texts,
                        fonts,
                        fontIndices,
                    }: {
                        texts: (Io & Sentence)[]
                        fonts: Font[]
                        fontIndices: Index<Font>[]
                    } = computeTextsAndFonts({
                        edoNotationName,
                        diagramType,
                        sagitypesForRow,
                        tileRowCountScaleFactor,
                    })

                    const additionalYOffsets: Px[] =
                        updateFontsWithDownToNextRowCountsScaleFactorAndComputeCorrespondingAdditionalYOffsets(
                            fonts,
                            { sagittalCount },
                        )

                    const sagittalRowGroupElement: NodeElement<SVGGElement> =
                        await textsToSvgGroupElement(
                            svgDocument,
                            texts,
                            fonts,
                            fontIndices,
                            additionalYOffsets,
                        )

                    const sagittalsWidth: Px = getGroupWidth(
                        sagittalRowGroupElement,
                    )

                    const xTranslation = TILE_SIZE / 2 - sagittalsWidth / 2
                    const yTranslation =
                        (sagittalRowIndex - SAGITTAL_ROW_Y_OFFSET_FACTOR) *
                        (TILE_SIZE / 2 / tileRowCountScaleFactor)

                    sagittalRowGroupElement.setAttribute(
                        // TODO: add a helper for translating x or y or both so I don't have to remember this every time
                        "transform",
                        `translate(${xTranslation} ${yTranslation})`,
                    )

                    return sagittalRowGroupElement
                },
            ),
        )

    // TODO: Argh. But it just occurs to me that I've only counteracted shrinking sagittals by scaling the tile up w/r/t the row count.
    // That is, you know how 4 is the max full - size sagittals that fit in one row, but since when we have 2 rows we fit 6 to a row,
    // so before we actually split to 2 rows, we may as well start squishing the sagittals smaller until we have 6 in the one row before we hit 7 sagittals
    // and are then forced to split into 2 rows where the sagittals are the size such that 6 of them can fit in each row ?
    // Well, so for the tiles that have 5 or 6 sagittals in one row, for examples, those tiles don't increase in size proportionally
    // so that theoretically the sagittals in the PT never get smaller. So I'll have to make that tweak tomorrow.
    // I don't think it will cause that many problems. The really hard part was just getting the rows to go in the correct places within the tile.

    ensureSagittalsWithinAvailableWidth(sagittalRowGroupElements)

    sagittalRowGroupElements.forEach((sagittalRowGroupElement) => {
        tileGroupElement.appendChild(sagittalRowGroupElement)
    })
}

export { addSagittals }
