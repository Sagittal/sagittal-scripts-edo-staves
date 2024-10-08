import { Document } from "@xmldom/xmldom"
import { EdoNotationName } from "@sagittal/system"
import { CORNER_TRIANGLE_SIZE, SVG_NS } from "../constants"
import { computeUsesOnlySpartans } from "./usesOnlySpartans"
import { NodeElement } from "../types"

const maybeAddCornerTriangle = (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edoNotationName,
    }: { svgDocument: Document; edoNotationName: EdoNotationName },
): void => {
    if (computeUsesOnlySpartans(edoNotationName)) {
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
