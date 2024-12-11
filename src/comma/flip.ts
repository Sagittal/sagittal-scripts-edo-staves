import { Comma, invertVector, ScaledVector, Vector } from "@sagittal/general"
import { computeAccidentalSagitype, flipSagittal, parseSagitype, Sagitype } from "@sagittal/system"

const flipComma = (comma: Comma): Comma =>
    ({ vector: invertVector(comma.vector) as Vector }) as ScaledVector as Comma

const flipSagitype = (sagitype: Sagitype): Sagitype =>
    computeAccidentalSagitype(flipSagittal(parseSagitype(sagitype))!)

export { flipComma, flipSagitype }
