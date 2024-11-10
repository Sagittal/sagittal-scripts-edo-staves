import { Io, Sentence } from "@sagittal/general"
import { computeAccidentalSagitype, parseSagitype, Sagitype } from "@sagittal/system"
import { Code } from "staff-code"
import { Expression } from "../types"
import { computeDefiniendum, computeDefiniens } from "./expression"

const computeDownSagitype = (sagitype: Sagitype): Sagitype =>
    computeAccidentalSagitype({ ...parseSagitype(sagitype), down: true })

const computeDirectedSagitype = (sagitype: Sagitype, isDown: boolean): Sagitype =>
    isDown ? computeDownSagitype(sagitype) : sagitype

const doComputeJiExpression = ({
    sagitype,
    isDown,
    primaryCommaExpressionPart = "",
    secondaryCommasExpressionPart = "",
    isFirstExpression,
    isFinalExpression,
}: {
    sagitype: Sagitype
    isDown: boolean
    primaryCommaExpressionPart?: Io
    secondaryCommasExpressionPart?: Io
    isFirstExpression: boolean
    isFinalExpression: boolean
}): Expression => {
    const directedSagitype: Sagitype = computeDirectedSagitype(sagitype, isDown)
    const definiendum: Code & Sentence = computeDefiniendum(directedSagitype, { isFirstExpression })

    const definiensBody: Io = primaryCommaExpressionPart + secondaryCommasExpressionPart
    const definiens: Io = computeDefiniens(definiensBody, { isFinalExpression })

    return { definiendum, definiens }
}

export { doComputeJiExpression }
