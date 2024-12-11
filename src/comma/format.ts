import { Comma, computeQuotientFromVector, formatQuotient, Io, Name } from "@sagittal/general"
import { computeComma } from "./comma"

const computeFormattedCommaFromComma = (comma: Comma): Io =>
    formatQuotient(computeQuotientFromVector(comma.vector))

const computeFormattedCommaFromCommaName = (commaName: Name<Comma>): Io =>
    computeFormattedCommaFromComma(computeComma(commaName))

export { computeFormattedCommaFromCommaName, computeFormattedCommaFromComma }
