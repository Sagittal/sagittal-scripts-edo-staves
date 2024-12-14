import { Hyperlink, Io, isUndefined, Maybe, Sentence } from "@sagittal/general"
import { computeAccidentalSagitype, parseSagitype, Sagitype } from "@sagittal/system"
import { Code } from "staff-code"
import { Expression } from "../types"
import { computeDefiniendum, computeDefiniens } from "./expression"
import { computeExpressionHyperlink } from "./hyperlink"

const computeDownSagitype = (sagitype: Sagitype): Sagitype =>
    computeAccidentalSagitype({ ...parseSagitype(sagitype), down: true })

const computeDirectedSagitype = (sagitype: Sagitype, isDown: boolean): Sagitype =>
    isDown ? computeDownSagitype(sagitype) : sagitype

const nonExpression = (definiendum: Code & Sentence): Expression => ({
    definiendum,
    definiens: "",
    hyperlink: "" as Hyperlink,
})

const onlyPrimaryExpression = (
    definiendum: Code & Sentence,
    primaryCommaExpressionPart: Io,
    isFinalExpression: boolean,
): Expression => {
    const definiens: Io = computeDefiniens(primaryCommaExpressionPart, { isFinalExpression })
    const hyperlink: Maybe<Hyperlink> = computeExpressionHyperlink(primaryCommaExpressionPart)

    return { definiendum, definiens, hyperlink }
}

const onlySecondaryExpression = (
    definiendum: Code & Sentence,
    secondaryCommasExpressionPart: Io,
    isFinalExpression: boolean,
): Expression => {
    const definiens: Io = computeDefiniens(secondaryCommasExpressionPart, { isFinalExpression })
    const hyperlink: Maybe<Hyperlink> = computeExpressionHyperlink(secondaryCommasExpressionPart)

    return { definiendum, definiens, hyperlink }
}

const bothPrimaryAndSecondaryExpressions = (
    definiendum: Code & Sentence,
    primaryCommaExpressionPart: Io,
    secondaryCommasExpressionPart: Io,
    isFinalExpression: boolean,
): Expression => {
    const definiens: Io = computeDefiniens(primaryCommaExpressionPart, { isFinalExpression: true }) // suppress the comma
    const secondaryDefiniens: Io = computeDefiniens(secondaryCommasExpressionPart, {
        isFinalExpression,
    })

    const hyperlink: Maybe<Hyperlink> = computeExpressionHyperlink(primaryCommaExpressionPart)
    const secondaryHyperlink: Maybe<Hyperlink> = computeExpressionHyperlink(secondaryCommasExpressionPart)

    return { definiendum, definiens, secondaryDefiniens, hyperlink, secondaryHyperlink }
}

const doComputeJiExpression = ({
    sagitype,
    isDown,
    primaryCommaExpressionPart,
    secondaryCommasExpressionPart,
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

    if (isUndefined(secondaryCommasExpressionPart)) {
        if (isUndefined(primaryCommaExpressionPart)) {
            return nonExpression(definiendum)
        } else {
            return onlyPrimaryExpression(definiendum, primaryCommaExpressionPart, isFinalExpression)
        }
    } else {
        if (isUndefined(primaryCommaExpressionPart)) {
            return onlySecondaryExpression(definiendum, secondaryCommasExpressionPart, isFinalExpression)
        } else {
            return bothPrimaryAndSecondaryExpressions(
                definiendum,
                primaryCommaExpressionPart,
                secondaryCommasExpressionPart,
                isFinalExpression,
            )
        }
    }
}

export { doComputeJiExpression }
