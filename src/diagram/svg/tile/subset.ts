import { Document } from "@xmldom/xmldom"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
} from "@sagittal/system"
import { Justification, NodeElement } from "../types"
import { addText } from "../text"
import {
    SANOMAT_FONT_FILE,
    SUBSET_TEXT_FONT_SIZE,
    SUBSET_Y_OFFSET,
    TILE_SIZE,
} from "../constants"
import { Count, Px } from "@sagittal/general"
import { DiagramType } from "../../../types"
import { addSagittals } from "./sagittals2"

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
        tileRowCount: Count
    },
): Promise<void> => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isSubsetNotation(edoNotationDefinition)) {
        await addSubset(tileGroupElement, {
            supersetEdoNotationName:
                edoNotationDefinition.supersetEdoNotationName,
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
