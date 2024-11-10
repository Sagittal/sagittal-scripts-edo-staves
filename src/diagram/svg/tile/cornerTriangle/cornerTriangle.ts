import { EdoNotationName } from "@sagittal/system"
import { Document } from "@xmldom/xmldom"
import { CORNER_TRIANGLE_SIZE, SVG_NS } from "../../constants"
import { NodeElement } from "../../types"
import { computeUsesOnlySpartans } from "./usesOnlySpartans"

const maybeAddCornerTriangle = (
    tileGroupElement: NodeElement<SVGGElement>,
    { svgDocument, edoNotationName }: { svgDocument: Document; edoNotationName: EdoNotationName },
): void => {
    if (computeUsesOnlySpartans(edoNotationName)) {
        const cornerTriangle: NodeElement<SVGPolygonElement> = svgDocument.createElementNS(
            SVG_NS,
            "polygon",
        ) as NodeElement<SVGPolygonElement>
        cornerTriangle.setAttribute("points", `0,0 ${CORNER_TRIANGLE_SIZE},0 0,${CORNER_TRIANGLE_SIZE}`)
        tileGroupElement.appendChild(cornerTriangle)
    }
}

export { maybeAddCornerTriangle }
