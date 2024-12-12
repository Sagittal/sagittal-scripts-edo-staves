import { Io } from "@sagittal/general"
import { CommaSection } from "../types"
import { RARE_COMMAS } from "./constants"

const computeMaybeRareText = ({ commaName }: CommaSection): Io =>
    RARE_COMMAS.includes(commaName) ? "The use of this comma for notation is extremely rare." : ""

export { computeMaybeRareText }
