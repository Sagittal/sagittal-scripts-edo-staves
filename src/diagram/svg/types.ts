import { Filename, Index, Io, Px, Sentence } from "@sagittal/general"
import { Node, Element } from "@xmldom/xmldom"
import { Code } from "staff-code"

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

// TODO: no need for Scaler because we have Multiplier in @sagittal/general
type Scaler = number & { _ScalerBrand: boolean } 

export { NodeElement, Justification, Font, Scaler }
