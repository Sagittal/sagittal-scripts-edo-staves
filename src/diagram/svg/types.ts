import { Node, Element } from "@xmldom/xmldom"

type NodeElement<T> = Node & Element & T

export { NodeElement }
