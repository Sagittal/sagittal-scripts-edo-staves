import { Comma, isUndefined, Maybe, Name } from "@sagittal/general"
import { Sagitype } from "@sagittal/system"
import { computeJiExpressionWithoutPrimary } from "./withoutPrimary"
import { computeJiExpressionWithPrimary } from "./withPrimary"

const computeJiExpression = ({
    commaNames,
    isFirstExpression,
    isFinalExpression,
    sagitype,
}: {
    commaNames: Maybe<Name<Comma>>[]
    isFirstExpression: boolean
    isFinalExpression: boolean
    sagitype: Sagitype
}) => {
    const maybePrimaryCommaName: Maybe<Name<Comma>> = commaNames[0]

    return isUndefined(maybePrimaryCommaName)
        ? computeJiExpressionWithoutPrimary({
              secondaryCommaNames: commaNames.slice(1) as Name<Comma>[],
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })
        : computeJiExpressionWithPrimary(maybePrimaryCommaName, {
              commaNames,
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })
}

export { computeJiExpression }
