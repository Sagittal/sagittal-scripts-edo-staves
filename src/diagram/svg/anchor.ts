import { Hyperlink } from "@sagittal/general"
import { Document } from "@xmldom/xmldom"
import { SVG_NS } from "./constants"
import { NodeElement } from "./types"

const wrapInAnchor = (
    element: NodeElement<SVGElement>,
    hyperlink: Hyperlink,
    { svgDocument }: { svgDocument: Document },
): NodeElement<SVGAElement> => {
    const anchorElement: NodeElement<SVGAElement> = svgDocument.createElementNS(
        SVG_NS,
        "a",
    ) as NodeElement<SVGAElement>

    anchorElement.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", hyperlink)
    anchorElement.setAttribute("target", "_blank")
    anchorElement.setAttribute("pointer-events", "bounding-box")
    anchorElement.appendChild(element)

    return anchorElement
}

export { wrapInAnchor }
