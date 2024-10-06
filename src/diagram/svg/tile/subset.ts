import { Document } from "@xmldom/xmldom"
import { EDO_NOTATION_DEFINITIONS, EdoName, EdoNotationDefinition, isSubsetNotation } from "@sagittal/system"
import { Justification, NodeElement } from "../types"
import { addText } from "../text"
import {
    SANOMAT_FONT_FILE,
    SUBSET_TEXT_FONT_SIZE,
    SUBSET_Y_OFFSET,
    TILE_SIZE,
} from "../constants"
import { Count, Px } from "@sagittal/general"
import { addSagittals } from "./sagittals"
import { DiagramType } from "../../../types"

const addSubset = async (
    tileGroupElement: NodeElement<SVGGElement>,
    { supersetEdoName }: { supersetEdoName: EdoName },
): Promise<void> => {
    await addText(tileGroupElement, `ss${supersetEdoName}`, {
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
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]

    if (isSubsetNotation(edoNotationDefinition)) {
        await addSubset(tileGroupElement, {
            supersetEdoName: edoNotationDefinition.supersetEdoName,
        })
    } else {
        await addSagittals(tileGroupElement, {
            svgDocument,
            edoName,
            diagramType,
            tileRowCount,
        })
    }
}

export { addSagittalsOrSubset }
