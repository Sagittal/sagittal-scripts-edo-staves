import { Io, Sentence } from "@sagittal/general"
import { Code } from "staff-code"

interface Expression {
    definiendum: Code & Sentence
    definiens: Io
}

export {  Expression }
