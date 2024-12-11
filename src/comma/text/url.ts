import { Io } from "@sagittal/general"
import { computeFormattedCommaFromComma } from "../format"
import { CommaSection } from "../types"

const computeUrlText = ({ superComma }: CommaSection): Io =>
    `https://en.xen.wiki/w/${computeFormattedCommaFromComma(superComma)}: ` // TODO: maybe DRY this with computeMaybeNewCommaText

export { computeUrlText }
