import { Io } from "@sagittal/general"
import { XEN_WIKI_BASE_URL } from "../../constants"
import { computeFormattedCommaFromComma } from "../format"
import { CommaSection } from "../types"

const computeUrlText = ({ superComma }: CommaSection): Io =>
    `${XEN_WIKI_BASE_URL}${computeFormattedCommaFromComma(superComma)}: `

export { computeUrlText }
