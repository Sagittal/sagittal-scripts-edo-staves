import { Document } from "@xmldom/xmldom"
import { Count } from "@sagittal/general"
import {
    computeFifthStep,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoStep,
    isSubsetNotation,
    parseEdoNotationName,
} from "@sagittal/system"
import { NodeElement, Scaler } from "../../types"
import { computeTileRowCountScaler } from "../tileRowCount"
import { DiagramType } from "../../../../types"
import { addSharp } from "./sharp"
import { addLimma } from "./limma"
import { addWholeTone } from "./wholeTone"
import { addFifth } from "./fifth"
import { TileRow } from "../types"

const addSteps = async (
    svgDocument: Document,
    {
        edoNotationName,
        tileWrapperGroupElement,
        diagramType,
        tileRowCount,
    }: {
        edoNotationName: EdoNotationName
        tileWrapperGroupElement: NodeElement<SVGGElement>
        diagramType: DiagramType
        tileRowCount: Count<TileRow>
    },
): Promise<void> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoNotationName])) return

    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const tileRowCountScaler: Scaler = computeTileRowCountScaler(tileRowCount)

    await addFifth(tileWrapperGroupElement, {
        fifthStep,
        tileRowCountScaler,
    })
    await addWholeTone(tileWrapperGroupElement, {
        edo,
        fifthStep,
        tileRowCountScaler,
    })
    await addLimma(tileWrapperGroupElement, {
        edo,
        fifthStep,
        tileRowCountScaler,
    })
    await addSharp(tileWrapperGroupElement, {
        edo,
        fifthStep,
        svgDocument,
        diagramType,
        tileRowCountScaler,
    })
}

export { addSteps }
