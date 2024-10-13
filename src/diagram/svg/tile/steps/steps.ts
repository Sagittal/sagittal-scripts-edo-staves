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
import { NodeElement } from "../../types"
import { computeTileRowCountScaleFactor } from "../tileRowCount"
import { DiagramType } from "../../../../types"
import { addSharp } from "./sharp"
import { addLimma } from "./limma"
import { addWholeTone } from "./wholeTone"
import { addFifth } from "./fifth"

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
        tileRowCount: Count
    },
): Promise<void> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoNotationName])) return

    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)

    await addFifth(tileWrapperGroupElement, {
        fifthStep,
        tileRowCountScaleFactor,
    })
    await addWholeTone(tileWrapperGroupElement, {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    })
    await addLimma(tileWrapperGroupElement, {
        edo,
        fifthStep,
        tileRowCountScaleFactor,
    })
    await addSharp(tileWrapperGroupElement, {
        edo,
        fifthStep,
        svgDocument,
        diagramType,
        tileRowCountScaleFactor,
    })
}

export { addSteps }
