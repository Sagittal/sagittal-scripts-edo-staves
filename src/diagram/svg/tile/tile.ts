import { Document } from "@xmldom/xmldom"
import { Px } from "@sagittal/general"
import { EdoName, Flavor } from "@sagittal/system"
import { addTileSquare } from "./square"
import { addEdo } from "./edo"
import { addSagittalsOrSubset } from "./sagittals"
import { addSteps } from "./steps"
import { maybeAddCornerTriangle } from "./cornerTriangle"
import { NodeElement } from "../types"
import { roundAllTranslations } from "../shift"

const addTile = async (
    svgDocument: Document,
    {
        edoName,
        diagramWidth,
        flavor,
    }: { edoName: EdoName; diagramWidth: Px; flavor: Flavor },
): Promise<void> => {
    const tileGroupElement: NodeElement<SVGGElement> = addTileSquare({
        svgDocument,
        edoName,
        diagramWidth,
    })

    await addEdo(tileGroupElement, { edoName })

    await addSagittalsOrSubset(tileGroupElement, {
        svgDocument,
        edoName,
        flavor,
    })

    maybeAddCornerTriangle(tileGroupElement, {
        svgDocument,
        edoName,
    })

    roundAllTranslations(tileGroupElement)

    await addSteps(tileGroupElement, { edoName })
}

export { addTile }
