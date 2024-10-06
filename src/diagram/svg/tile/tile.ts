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
import { computeTileRowCount } from "./rowCount"
import { append } from "../append"

const addTileItself = async (
    svgDocument: Document,
    {
        edoName,
        flavor,
        tileWrapperGroupElement,
    }: {
        edoName: EdoName
        flavor: Flavor
        tileWrapperGroupElement: NodeElement<SVGGElement>
    },
): Promise<void> => {
    const tileGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>

    addTileSquare(tileGroupElement, {
        svgDocument,
        edoName,
    })

    const tileRowCount: Count = computeTileRowCount({ edoName })

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

    tileWrapperGroupElement.appendChild(tileGroupElement)
}

const addTile = async (
    svgDocument: Document,
    {
        edoName,
        diagramWidth,
        flavor,
    }: { edoName: EdoName; diagramWidth: Px; flavor: Flavor },
): Promise<void> => {
    const tileWrapperGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>
    tileWrapperGroupElement.setAttribute(
        "transform",
        `translate(${
            diagramWidth -
            LEFT_AND_RIGHT_MARGIN -
            TILE_SIZE -
            EXTRA_ROOM_FOR_FIFTH_SIZE
        } ${TILE_TOP_MARGIN})`,
    )

    await addTileItself(svgDocument, {
        tileWrapperGroupElement,
        edoName,
        flavor,
    })

    await addSteps(svgDocument, { tileWrapperGroupElement, edoName, flavor })

    append(svgDocument, tileWrapperGroupElement)
}

export { addTile }
