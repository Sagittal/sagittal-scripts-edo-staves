import { Comma, Io, Name } from "@sagittal/general"
import { CommaSection } from "../types"

// TODO: these consts should be centralized, like this and the other one
const RARE_COMMAS: Name<Comma>[] = ["25⋅11/7M"] as Name<Comma>[]

const computeMaybeRareText = ({ commaName }: CommaSection): Io =>
    RARE_COMMAS.includes(commaName) ? "The use of this comma for notation is extremely rare." : ""

export { computeMaybeRareText }
