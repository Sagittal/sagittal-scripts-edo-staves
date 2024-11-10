import { Count, Multiplier, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { DiagramType } from "../../../types"
import { append } from "../append"
import { SVG_NS, TILE_SIZE } from "../constants"
import { roundAllTranslations } from "../shift"
import { setTransform } from "../transform"
import { NodeElement } from "../types"
import { maybeAddCornerTriangle } from "./cornerTriangle"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
import { addTileSquare } from "./square"
import { addSteps } from "./steps"
import { computeTileRowCount, computeTileRowCountMultiplier } from "./tileRowCount"
import { TileRow } from "./types"

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
    const tileGroupElement: NodeElement<SVGGElement> = svgDocument.createElementNS(
        SVG_NS,
        "g",
    ) as NodeElement<SVGGElement>

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

    const tileRowCountMultiplier: Multiplier<Count<TileRow>> = computeTileRowCountMultiplier(tileRowCount)
    setTransform(tileGroupElement, { scale: tileRowCountMultiplier })

    tileWrapperGroupElement.appendChild(tileGroupElement)

    return (TILE_SIZE * tileRowCountMultiplier) as Px
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
    const tileWrapperGroupElement: NodeElement<SVGGElement> = svgDocument.createElementNS(
        SVG_NS,
        "g",
    ) as NodeElement<SVGGElement>

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
