import { Node, Element } from "@xmldom/xmldom"

type NodeElement<T> = Node & Element & T

enum Justification {
    LEFT,
    CENTER,
    RIGHT,
}

export { NodeElement, Justification }
