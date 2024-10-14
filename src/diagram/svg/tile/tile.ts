import { Document } from "@xmldom/xmldom"
import { Count, Px } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
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

const addTileItselfAndGetSize = async (
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
        tileRowCount: Count<TileRow>
    },
): Promise<Px> => {
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

    const scale: Scaler = computeTileRowCountScaler(tileRowCount)
    setTransform(tileGroupElement, { scale })

    tileWrapperGroupElement.appendChild(tileGroupElement)

    return (TILE_SIZE * scale) as Px
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
    const tileRowCount: Count<TileRow> = computeTileRowCount({
        edoNotationName,
    })
    const tileWrapperGroupElement: NodeElement<SVGGElement> =
        svgDocument.createElementNS(SVG_NS, "g") as NodeElement<SVGGElement>

    const tileSize: Px = await addTileItselfAndGetSize(svgDocument, {
        tileWrapperGroupElement,
        edoNotationName,
        diagramType,
        tileRowCount,
    })
    console.log("tileSize", tileSize)
    await addSteps(svgDocument, {
        tileWrapperGroupElement,
        edoNotationName,
        diagramType,
        tileRowCount,
    })

    append(svgDocument, tileWrapperGroupElement)

    return { tileWrapperGroupElement, tileSize }
}

export { addTileAndGetSize }
