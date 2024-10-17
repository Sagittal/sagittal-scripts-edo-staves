import { Document } from "@xmldom/xmldom"
import { Count, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSteps } from "./steps"
import { maybeAddCornerTriangle } from "./cornerTriangle"
import { NodeElement, Scaler } from "../types"
import { roundAllTranslations } from "../shift"
import { SVG_NS, TILE_SIZE } from "../constants"
import { computeTileRowCount, computeTileRowCountScaler } from "./tileRowCount"
import { append } from "../append"
import { DiagramType } from "../../../types"
import { TileRow } from "./types"
import { setTransform } from "../transform"
import { addSagittalsOrSubset } from "./sagittals"

const addTileItselfAndGetSize = async (
    svgDocument: Document,
    {
        edoNotationName,
        diagramType,
        tileWrapperGroupElement,
    }: {
        edoNotationName: EdoNotationName
        diagramType: DiagramType
        tileWrapperGroupElement: NodeElement<SVGGElement>
    },
): Promise<Px> => {
    const tileGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>

    addTileSquare(tileGroupElement, {
        svgDocument,
        edoNotationName,
    })

    const tileRowCount: Count<TileRow> = computeTileRowCount({
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

    const tileRowCountScaler: Scaler = computeTileRowCountScaler(tileRowCount)
    setTransform(tileGroupElement, { scale: tileRowCountScaler })

    tileWrapperGroupElement.appendChild(tileGroupElement)

    return (TILE_SIZE * tileRowCountScaler) as Px
}

const addTileAndGetSize = async (
    svgDocument: Document,
    {
        edoNotationName,
        diagramType,
    }: {
        edoNotationName: EdoNotationName
        diagramType: DiagramType
    },
): Promise<{
    tileWrapperGroupElement: NodeElement<SVGGElement>
    tileSize: Px
}> => {
    const tileWrapperGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>

    const tileSize: Px = await addTileItselfAndGetSize(svgDocument, {
        tileWrapperGroupElement,
        edoNotationName,
        diagramType,
    })

    await addSteps(svgDocument, {
        tileWrapperGroupElement,
        edoNotationName,
        diagramType,
        tileSize,
    })

    append(svgDocument, tileWrapperGroupElement)

    return { tileWrapperGroupElement, tileSize }
}

export { addTileAndGetSize }
