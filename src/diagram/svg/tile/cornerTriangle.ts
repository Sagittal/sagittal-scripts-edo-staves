import { Document, Element } from "@xmldom/xmldom"
import { Edo } from "@sagittal/system"
import { CORNER_TRIANGLE_SIZE, SVG_NS } from "../constants"
import { computeUsesOnlySpartans } from "./usesOnlySpartans"
import { NodeElement } from "../types"

const maybeAddCornerTriangle = (
    tileGroupElement: NodeElement<SVGGElement>,
    {
        svgDocument,
        edo,
        useSecondBestFifth,
    }: { svgDocument: Document; edo: Edo; useSecondBestFifth: boolean },
): void => {
    if (computeUsesOnlySpartans(edo, useSecondBestFifth)) {
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
