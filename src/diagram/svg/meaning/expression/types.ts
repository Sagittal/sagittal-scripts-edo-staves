import { Hyperlink, Io, Maybe, Sentence } from "@sagittal/general"
import { Code } from "staff-code"

interface Expression {
    definiendum: Code & Sentence
    definiens: Io
    secondaryDefiniens?: Io
    hyperlink: Maybe<Hyperlink>
    secondaryHyperlink?: Hyperlink
}

export { Expression }
