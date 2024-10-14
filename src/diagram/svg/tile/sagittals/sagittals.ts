import { Document } from "@xmldom/xmldom"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
} from "@sagittal/system"
import { Font, NodeElement, Scaler } from "../../types"
import { DiagramType } from "../../../../types"
import { Count, Index, Io, Px, Sentence } from "@sagittal/general"
import { TILE_SIZE } from "../../constants"
import { computeTileRowCountScaler } from "../tileRowCount"
import { textsToSvgGroupElement } from "../../text"
import { computeSagittalTextsAndFonts } from "./textsAndFonts"
import { getGroupWidth } from "../../width"
import { computeDownToNextTileRowCountsScaler } from "./nextRowCountScale"
import { computeSagitypesByTileRow } from "./sagitypesByTileRow"
import { ensureSagittalsWithinAvailableWidth } from "./ensureSagittalsWithinAvailableWidth"
import { TileRow } from "../types"
import { setTransform } from "../../transform"

const SAGITTAL_ROW_Y_OFFSET_SCALER: Scaler = 0.25 as Scaler

const updateFontsWithDownToNextTileRowCountsScalerAndComputeCorrespondingAdditionalYOffsets =
    (fonts: Font[], { sagittalCount }: { sagittalCount: Count<Sagittal> }) => {
        const downToNextTileRowCountsScaler: Scaler =
            computeDownToNextTileRowCountsScaler(sagittalCount)
        return fonts.map((font: Font): Px => {
            const oldFontSize: Px = font.fontSize
            const newFontSize: Px = (oldFontSize /
                downToNextTileRowCountsScaler) as Px
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
        tileRowCount: Count<TileRow>
    },
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[
            edoNotationName
        ] as NonSubsetEdoNotationDefinition
    ).sagitypes

    const sagittalCount: Count<Sagittal> = sagitypes.length as Count<Sagittal>
    if (sagittalCount === 0) return

    const tileRowCountScaler: Scaler = computeTileRowCountScaler(tileRowCount)

    const sagitypesByTileRow: Sagitype[][] = computeSagitypesByTileRow(
        sagitypes,
        tileRowCount,
    )
    const sagittalTileRowGroupElements: NodeElement<SVGGElement>[] =
        await Promise.all(
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
                        tileRowCountScaler,
                        sagittalTileRowIndex: sagittalTileRowIndex as Index<
                            TileRow<Sagittal>
                        >,
                        tileRowCount,
                    })

                    const additionalYOffsets: Px[] =
                        updateFontsWithDownToNextTileRowCountsScalerAndComputeCorrespondingAdditionalYOffsets(
                            fonts,
                            { sagittalCount },
                        )

                    const sagittalTileRowGroupElement: NodeElement<SVGGElement> =
                        await textsToSvgGroupElement({
                            svgDocument,
                            texts,
                            fonts,
                            fontIndices,
                            additionalYOffsets,
                        })

                    const sagittalsWidth: Px = getGroupWidth(
                        sagittalTileRowGroupElement,
                    )

                    const xTranslation: Px = (TILE_SIZE / 2 -
                        sagittalsWidth / 2) as Px
                    const yTranslation: Px = ((sagittalTileRowIndex -
                        SAGITTAL_ROW_Y_OFFSET_SCALER) *
                        (TILE_SIZE / 2 / tileRowCountScaler)) as Px

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
