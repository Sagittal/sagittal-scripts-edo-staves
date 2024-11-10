import { Document } from "@xmldom/xmldom"
import { NodeElement } from "./types"

const append = (svgDocument: Document, child: NodeElement<SVGElement>): void => {
    svgDocument.documentElement!.appendChild(child)
}

export { append }
