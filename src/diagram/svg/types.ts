import { Filename, Px } from "@sagittal/general"
import { Node, Element } from "@xmldom/xmldom"

type NodeElement<T> = Node & Element & T

enum Justification {
    LEFT,
    CENTER,
    RIGHT,
}

interface Font {
    fontFile: Filename
    fontSize: Px
}

export { NodeElement, Justification, Font }
