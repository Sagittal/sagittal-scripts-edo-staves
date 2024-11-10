import { Comma, isScaledVectorSub, Name } from "@sagittal/general"
import { computeComma } from "./comma"

const computeIsDown = (commaName: Name<Comma>): boolean => isScaledVectorSub(computeComma(commaName))

export { computeIsDown }
