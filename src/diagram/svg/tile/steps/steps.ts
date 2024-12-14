import { Edo, EdoStep, Px } from "@sagittal/general"
import {
    computeFifthStep,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    isSubsetNotation,
    parseEdoNotationName,
} from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { NodeElement } from "../../types"
import { addFifth } from "./fifth"
import { addLimma } from "./limma"
import { addSharp } from "./sharp"
import { addWholeTone } from "./wholeTone"

const addSteps = async (
    svgDocument: Document,
    {
        edoNotationName,
        tileWrapperGroupElement,
        tileSize,
    }: {
        edoNotationName: EdoNotationName
        tileWrapperGroupElement: NodeElement<SVGGElement>
        tileSize: Px
    },
): Promise<void> => {
    if (isSubsetNotation(EDO_NOTATION_DEFINITIONS[edoNotationName])) return

    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const edo: Edo = parseEdoNotationName(edoNotationName).edo

    await addFifth(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        svgDocument,
    })
    await addWholeTone(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        svgDocument,
        edo,
    })
    await addLimma(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        svgDocument,
        edo,
    })
    await addSharp(tileWrapperGroupElement, {
        fifthStep,
        tileSize,
        edo,
        svgDocument,
    })
}

export { addSteps }
