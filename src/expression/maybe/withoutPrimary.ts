import { Comma, Io, Name } from "@sagittal/general"
import { Sagitype } from "@sagittal/system"
import { Expression } from "./types"
import { computeIsDown } from "./down"
import { computeCommaExpressionPart } from "./part"
import { computeSecondaryCommasExpressionPart } from "./secondary"
import { doComputeJiExpression } from "./do"

const computeJiExpressionWithoutPrimary = ({
    secondaryCommaNames,
    isFirstExpression,
    isFinalExpression,
    sagitype,
}: {
    secondaryCommaNames: Name<Comma>[]
    isFirstExpression: boolean
    isFinalExpression: boolean
    sagitype: Sagitype
}): Expression => {
    const secondaryCommaName: Name<Comma> = secondaryCommaNames[0] as Name<Comma>
    const isSecondaryDown: boolean = computeIsDown(secondaryCommaName)
    const secondaryCommasExpressionPart: Io =
        computeCommaExpressionPart(secondaryCommaName, {
            isSecondary: true,
        }) +
        computeSecondaryCommasExpressionPart(secondaryCommaNames.slice(1), {
            isPrimaryDown: isSecondaryDown,
        })

    return doComputeJiExpression({
        sagitype,
        isDown: isSecondaryDown,
        isFirstExpression,
        isFinalExpression,
        secondaryCommasExpressionPart,
    })
}

export { computeJiExpressionWithoutPrimary }