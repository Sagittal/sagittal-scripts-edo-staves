import { Count, Px } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
} from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { DiagramType } from "../../../../types"
import { SANOMAT_FONT_FILE, SUBSET_TEXT_FONT_SIZE, SUBSET_Y_OFFSET, TILE_SIZE } from "../../constants"
import { addText } from "../../text"
import { Justification, NodeElement } from "../../types"
import { TileRow } from "../types"
import { addSagittals } from "./sagittals"

const addSubset = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { supersetEdoNotationName }: { supersetEdoNotationName: EdoNotationName },
): Promise<void> => {
    await addText(tileGroupElement, `ss${supersetEdoNotationName}`, {
        fontFile: SANOMAT_FONT_FILE,
        fontSize: SUBSET_TEXT_FONT_SIZE,
        xOffset: (TILE_SIZE / 2) as Px,
        yOffset: SUBSET_Y_OFFSET,
        justification: Justification.CENTER,
    })
}

const addSagittalsOrSubset = async (
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
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition)) {
        await addSubset(tileGroupElement, {
            supersetEdoNotationName: edoNotationDefinition.supersetEdoNotationName,
        })
    } else {
        await addSagittals(tileGroupElement, {
            svgDocument,
            edoNotationName,
            diagramType,
            tileRowCount,
        })
    }
}

export { addSagittalsOrSubset }
