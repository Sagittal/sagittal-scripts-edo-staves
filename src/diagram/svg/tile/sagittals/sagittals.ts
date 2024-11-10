import { Count, Index, Io, Multiplier, Px, Sentence } from "@sagittal/general"
import {
    computeSagitypes,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { DiagramType } from "../../../../types"
import { TILE_SIZE } from "../../constants"
import { textsToSvgGroupElement } from "../../text"
import { setTransform } from "../../transform"
import { Font, NodeElement } from "../../types"
import { getGroupWidth } from "../../width"
import { computeTileRowCountMultiplier } from "../tileRowCount"
import { TileRow } from "../types"
import { ensureSagittalsWithinAvailableWidth } from "./ensureSagittalsWithinAvailableWidth"
import { computeDownToNextTileRowCountsMultiplier } from "./nextRowCountScale"
import { computeSagitypesByTileRow } from "./sagitypesByTileRow"
import { computeSagittalTextsAndFonts } from "./textsAndFonts"

const SAGITTAL_ROW_Y_OFFSET_MULTIPLIER: Multiplier = 0.25 as Multiplier

const updateFontsWithDownToNextTileRowCountsMultiplierAndComputeCorrespondingAdditionalYOffsets = (
    fonts: Font[],
    downToNextTileRowCountsMultiplier: Multiplier,
) =>
    fonts.map((font: Font): Px => {
        const oldFontSize: Px = font.fontSize
        const newFontSize: Px = (oldFontSize / downToNextTileRowCountsMultiplier) as Px
        font.fontSize = newFontSize

        return (oldFontSize - newFontSize) as Px
    })

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
        tileRowCount: Count<TileRow>
    },
): Promise<void> => {
    const sagitypes: Sagitype[] = computeSagitypes(
        EDO_NOTATION_DEFINITIONS[edoNotationName] as NonSubsetEdoNotationDefinition,
    )

    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>
    if (sagittalCount === 0) return

    const tileRowCountMultiplier: Multiplier<Count<TileRow>> = computeTileRowCountMultiplier(tileRowCount)

    const sagitypesByTileRow: Sagitype[][] = computeSagitypesByTileRow(sagitypes, tileRowCount)

    const downToNextTileRowCountsMultiplier: Multiplier =
        computeDownToNextTileRowCountsMultiplier(sagittalCount)

    const sagittalTileRowGroupElements: NodeElement<SVGGElement>[] = await Promise.all(
        sagitypesByTileRow.map(
            async (
                sagitypesForTileRow: Sagitype[],
                sagittalTileRowIndex: number,
            ): Promise<NodeElement<SVGGElement>> => {
                const {
                    texts,
                    fonts,
                    fontIndices,
                }: {
                    texts: (Io & Sentence)[]
                    fonts: Font[]
                    fontIndices: Index<Font>[]
                } = computeSagittalTextsAndFonts({
                    edoNotationName,
                    diagramType,
                    sagitypesForTileRow,
                    tileRowCountMultiplier,
                    sagittalTileRowIndex: sagittalTileRowIndex as Index<TileRow<Sagittal>>,
                    tileRowCount,
                })

                const additionalYOffsets: Px[] =
                    updateFontsWithDownToNextTileRowCountsMultiplierAndComputeCorrespondingAdditionalYOffsets(
                        fonts,
                        downToNextTileRowCountsMultiplier,
                    )

                const sagittalTileRowGroupElement: NodeElement<SVGGElement> = await textsToSvgGroupElement({
                    svgDocument,
                    texts,
                    fonts,
                    fontIndices,
                    additionalYOffsets,
                })

                const sagittalsWidth: Px = getGroupWidth(sagittalTileRowGroupElement)

                const xTranslation: Px = (TILE_SIZE / 2 - sagittalsWidth / 2) as Px
                const yTranslation: Px = ((sagittalTileRowIndex - SAGITTAL_ROW_Y_OFFSET_MULTIPLIER) *
                    (TILE_SIZE / 2 / tileRowCountMultiplier)) as Px

                setTransform(sagittalTileRowGroupElement, {
                    xTranslation,
                    yTranslation,
                })

                return sagittalTileRowGroupElement
            },
        ),
    )

    ensureSagittalsWithinAvailableWidth(sagittalTileRowGroupElements)

    sagittalTileRowGroupElements.forEach((sagittalTileRowGroupElement) => {
        tileGroupElement.appendChild(sagittalTileRowGroupElement)
    })
}

export { addSagittals }
