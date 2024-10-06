import { Document } from "@xmldom/xmldom"
import { Count, Px } from "@sagittal/general"
import { EdoName, Flavor } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
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

const addTileItself = async (
    svgDocument: Document,
    {
        edoName,
        flavor,
        tileWrapperGroupElement,
        tileRowCount,
    }: {
        edoName: EdoName
        flavor: Flavor
        tileWrapperGroupElement: NodeElement<SVGGElement>
        tileRowCount: Count
    },
): Promise<void> => {
    const tileGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>

    addTileSquare(tileGroupElement, {
        svgDocument,
        edoName,
    })

    await addEdo(tileGroupElement, { edoName, tileRowCount })

    await addSagittalsOrSubset(tileGroupElement, {
        svgDocument,
        edoName,
        flavor,
        tileRowCount,
    })

    maybeAddCornerTriangle(tileGroupElement, {
        svgDocument,
        edoName,
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
        edoName,
        diagramWidth,
        flavor,
        tileRowCount,
    }: {
        edoName: EdoName
        diagramWidth: Px
        flavor: Flavor
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
        edoName,
        flavor,
        tileRowCount,
    })

    await addSteps(svgDocument, {
        tileWrapperGroupElement,
        edoName,
        flavor,
        tileRowCount,
    })

    append(svgDocument, tileWrapperGroupElement)
}

export { addTile }
