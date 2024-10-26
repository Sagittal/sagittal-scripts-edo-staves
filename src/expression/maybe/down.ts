import { Comma, isSpevSub, Name } from "@sagittal/general"
import { computeComma } from "./comma"

const computeIsDown = (commaName: Name<Comma>): boolean => isSpevSub(computeComma(commaName))

export { computeIsDown }
