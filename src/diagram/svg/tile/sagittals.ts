import { Document } from "@xmldom/xmldom"
import { Count, Index, Io, Px, Sentence } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    NonSubsetEdoNotationDefinition,
    Sagitype,
} from "@sagittal/system"
import {
    SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE,
    SAGITTALS_MAX_WIDTH,
    TILE_SIZE,
} from "../constants"
import { getGroupWidth } from "../width"
import { textsToSvgGroupElement } from "../text"
import { Font, NodeElement } from "../types"
import { DiagramType } from "../../../types"
import { computeTextsAndFonts } from "./textsAndFonts"

const SAGITTALS_SCALER_CHANGE_FACTOR: number = 1.1

const addSagittals = async (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoName,
        diagramType,
        tileRowCount,
    }: {
        svgDocument: Document
        edoName: EdoName
        diagramType: DiagramType
        tileRowCount: Count
    },
): Promise<void> => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edoName] as NonSubsetEdoNotationDefinition
    ).sagitypes

    if (sagitypes.length === 0) return

    const {
        texts,
        fonts,
        fontIndices,
    }: { texts: (Io & Sentence)[]; fonts: Font[]; fontIndices: Index<Font>[] } =
        computeTextsAndFonts({
            edoName,
            diagramType,
            sagitypes,
        })

    let sagittalsWidth: Px = Infinity as Px
    let sagittalsScaler: number = 1
    let scaleChangeCount: Count = 0 as Count
    let sagittalsHaveBeenPlaced: boolean = false
    while (!sagittalsHaveBeenPlaced) {
        fonts.forEach((font: Font): void => {
            font.fontSize = (font.fontSize * sagittalsScaler) as Px
        })

        const sagittalsGroupElement: NodeElement<SVGGElement> =
            await textsToSvgGroupElement(svgDocument, texts, fonts, fontIndices)

        sagittalsWidth = getGroupWidth(sagittalsGroupElement)

        if (sagittalsWidth > SAGITTALS_MAX_WIDTH) {
            sagittalsScaler /= SAGITTALS_SCALER_CHANGE_FACTOR
            scaleChangeCount = (scaleChangeCount + 1) as Count
        } else {
            sagittalsGroupElement.setAttribute(
                "transform",
                `translate(${TILE_SIZE / 2 - sagittalsWidth / 2} ${
                    SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE[
                        scaleChangeCount
                    ]
                })`,
            )
            tileGroupElement.appendChild(sagittalsGroupElement)
            sagittalsHaveBeenPlaced = true
        }
    }
}

export { addSagittals }
