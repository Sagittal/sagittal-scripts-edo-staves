import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
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
        tileSize,
    }: {
        edoNotationName: EdoNotationName
        tileWrapperGroupElement: NodeElement<SVGGElement>
        diagramType: DiagramType
        tileSize: Px
    },
): Promise<void> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoNotationName])) return

    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo

    await addFifth(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
    })
    await addWholeTone(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        edo,
    })
    await addLimma(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        edo,
    })
    await addSharp(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        edo,
        svgDocument,
        diagramType,
    })
}

export { addSteps }
