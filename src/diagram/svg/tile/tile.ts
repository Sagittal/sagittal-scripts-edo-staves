import { Document } from "@xmldom/xmldom"
import { Count, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./subset"
import { addSteps } from "./steps"
import { maybeAddCornerTriangle } from "./cornerTriangle"
import { NodeElement } from "../types"
import { roundAllTranslations } from "../shift"
import {
    EXTRA_ROOM_FOR_FIFTH_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    SVG_NS,
    TILE_SIZE,
    TILE_TOP_MARGIN,
} from "../constants"
import { computeTileRowCountScaleFactor } from "./rowCount"
import { append } from "../append"
import { DiagramType } from "../../../types"

const addTileItself = async (
    svgDocument: Document,
    {
        edoNotationName,
        diagramType,
        tileWrapperGroupElement,
        tileRowCount,
    }: {
        edoNotationName: EdoNotationName
        diagramType: DiagramType
        tileWrapperGroupElement: NodeElement<SVGGElement>
        tileRowCount: Count
    },
): Promise<void> => {
    const tileGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>

    addTileSquare(tileGroupElement, {
        svgDocument,
        edoNotationName,
    })

    await addEdo(tileGroupElement, { edoNotationName, tileRowCount })

    await addSagittalsOrSubset(tileGroupElement, {
        svgDocument,
        edoNotationName,
        diagramType,
        tileRowCount,
    })

    maybeAddCornerTriangle(tileGroupElement, {
        svgDocument,
        edoNotationName,
    })

    roundAllTranslations(tileGroupElement)

    tileGroupElement.setAttribute(
        "transform",
        `scale(${computeTileRowCountScaleFactor(tileRowCount)})`,
    )

    tileWrapperGroupElement.appendChild(tileGroupElement)
}

const addTile = async (
    svgDocument: Document,
    {
        edoNotationName,
        diagramWidth,
        diagramType,
        tileRowCount,
    }: {
        edoNotationName: EdoNotationName
        diagramWidth: Px
        diagramType: DiagramType
        tileRowCount: Count
    },
): Promise<void> => {
    const tileWrapperGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>
    const tileRowCountScaleFactor: number =
        computeTileRowCountScaleFactor(tileRowCount)
    tileWrapperGroupElement.setAttribute(
        "transform",
        `translate(${
            diagramWidth -
            LEFT_AND_RIGHT_MARGIN -
            TILE_SIZE * tileRowCountScaleFactor -
            EXTRA_ROOM_FOR_FIFTH_SIZE
        } ${TILE_TOP_MARGIN})`,
    )

    await addTileItself(svgDocument, {
        tileWrapperGroupElement,
        edoNotationName,
        diagramType,
        tileRowCount,
    })

    await addSteps(svgDocument, {
        tileWrapperGroupElement,
        edoNotationName,
        diagramType,
        tileRowCount,
    })

    append(svgDocument, tileWrapperGroupElement)
}

export { addTile }
