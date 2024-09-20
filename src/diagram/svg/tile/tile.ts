import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import { EdoName } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
import { addSteps } from "./steps"
import { maybeAddCornerTriangle } from "./cornerTriangle"
import { NodeElement } from "../types"

// TODO: need to account for e.g. 5-EDO where the title is longer than the stave
// and needs to push the tile out to the right

const addTile = async (
    svgDocument: Document,
    { edoName, diagramWidth }: { edoName: EdoName; diagramWidth: Px },
): Promise<void> => {
    const tileGroupElement: NodeElement<SVGGElement> = addTileSquare({
        svgDocument,
        edoName,
        diagramWidth,
    })

    await addEdo(tileGroupElement, { edoName })

    await addSagittalsOrSubset(tileGroupElement, { edoName })

    maybeAddCornerTriangle(tileGroupElement, {
        svgDocument,
        edoName,
    })

    await addSteps(tileGroupElement, { edoName })
}

export { addTile }
