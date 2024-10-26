import { Comma, Io, Maybe, Name } from "@sagittal/general";
import { computeIsDown } from "./down";
import { computeCommaExpressionPart } from "./part";
import { Sagitype } from "@sagittal/system";
import { Expression } from "./types";
import { computeSecondaryCommasExpressionPart } from "./secondary";
import { doComputeJiExpression } from "./do";

const computeCommaExpressionPartAndIsDown = (
    commaName: Name<Comma>,
): { commaExpressionPart: Io; isDown: boolean } => ({
    isDown: computeIsDown(commaName),
    commaExpressionPart: computeCommaExpressionPart(commaName),
})

const computeJiExpressionWithPrimaryAndSecondaries = ({
    primaryCommaName,
    secondaryCommaNames,
    isFirstExpression,
    isFinalExpression,
    sagitype,
}: {
    primaryCommaName: Name<Comma>
    secondaryCommaNames: Name<Comma>[]
    isFirstExpression: boolean
    isFinalExpression: boolean
    sagitype: Sagitype
}): Expression => {
    const {
        isDown: isPrimaryDown,
        commaExpressionPart: primaryCommaExpressionPart,
    }: { isDown: boolean; commaExpressionPart: Io } =
        computeCommaExpressionPartAndIsDown(primaryCommaName)

    const secondaryCommasExpressionPart: Io = computeSecondaryCommasExpressionPart(
        secondaryCommaNames,
        { isPrimaryDown },
    )

    return doComputeJiExpression({
        sagitype,
        isDown: isPrimaryDown,
        isFirstExpression,
        isFinalExpression,
        primaryCommaExpressionPart,
        secondaryCommasExpressionPart,
    })
}

const computeJiExpressionWithPrimaryButWithoutSecondaries = ({
    primaryCommaName,
    isFirstExpression,
    isFinalExpression,
    sagitype,
}: {
    primaryCommaName: Name<Comma>
    isFirstExpression: boolean
    isFinalExpression: boolean
    sagitype: Sagitype
}): Expression => {
    const {
        isDown,
        commaExpressionPart: primaryCommaExpressionPart,
    }: { isDown: boolean; commaExpressionPart: Io } =
        computeCommaExpressionPartAndIsDown(primaryCommaName)

    return doComputeJiExpression({
        sagitype,
        isDown,
        isFirstExpression,
        isFinalExpression,
        primaryCommaExpressionPart,
    })
}

const computeJiExpressionWithPrimary = (
    primaryCommaName: Name<Comma>,
    {
        commaNames,
        isFirstExpression,
        isFinalExpression,
        sagitype,
    }: {
        commaNames: Maybe<Name<Comma>>[]
        isFirstExpression: boolean
        isFinalExpression: boolean
        sagitype: Sagitype
    },
): Expression => {
    const secondaryCommaNames: Name<Comma>[] = commaNames.slice(1) as Name<Comma>[]

    return secondaryCommaNames.length === 0
        ? computeJiExpressionWithPrimaryButWithoutSecondaries({
              primaryCommaName,
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })
        : computeJiExpressionWithPrimaryAndSecondaries({
              primaryCommaName,
              secondaryCommaNames,
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })
}

export {
    computeJiExpressionWithPrimary,
}