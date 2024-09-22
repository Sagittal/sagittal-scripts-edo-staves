import { Index, Io, Px, Sentence } from "@sagittal/general"
import { Font } from "../types"
import { Code } from "staff-code"

interface PathifiableTexts {
    texts: Io[]
    fontIndices: Index<Font>[]
    additionalYOffsets: Px[]
}

interface Expression {
    definiendum: Code & Sentence
    definiens: Io
}

export { PathifiableTexts, Expression }
