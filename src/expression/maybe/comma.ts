import { Comma, Name } from "@sagittal/general"
import { computeCommaFromCommaName, parseCommaName } from "@sagittal/system"

const computeComma = (commaName: Name<Comma>): Comma =>
    computeCommaFromCommaName(parseCommaName(commaName))

export { computeComma }
