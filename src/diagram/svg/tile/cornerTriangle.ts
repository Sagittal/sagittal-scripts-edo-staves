import { Document } from "@xmldom/xmldom"
import { EdoName } from "@sagittal/system"
import { CORNER_TRIANGLE_SIZE, SVG_NS } from "../constants"
import { computeUsesOnlySpartans } from "./usesOnlySpartans"
import { NodeElement } from "../types"

const maybeAddCornerTriangle = (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoName,
    }: { svgDocument: Document; edoName: EdoName },
): void => {
    if (computeUsesOnlySpartans(edoName)) {
        const cornerTriangle: NodeElement<SVGPolygonElement> =
            svgDocument.createElementNS(
                SVG_NS,
                "polygon",
            ) as NodeElement<SVGPolygonElement>
        cornerTriangle.setAttribute(
            "points",
            `0,0 ${CORNER_TRIANGLE_SIZE},0 0,${CORNER_TRIANGLE_SIZE}`,
        )
        tileGroupElement.appendChild(cornerTriangle)
    }
}

export { maybeAddCornerTriangle }
