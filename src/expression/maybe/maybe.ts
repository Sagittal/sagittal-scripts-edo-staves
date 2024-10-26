import { isUndefined, Maybe } from "@sagittal/general"
import { StepDefinition } from "@sagittal/system"
import { Expression } from "./types"
import { computeMaybeNonJiExpression } from "./nonJi"
import { computeJiExpression } from "./ji"

const computeMaybeExpression = (
    { sagitype, validCommas, nonJiMeaning }: StepDefinition,
    isFirstExpression: boolean,
    isFinalExpression: boolean,
): Maybe<Expression> => {
    return isUndefined(validCommas)
        ? computeMaybeNonJiExpression({
              nonJiMeaning,
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })
        : computeJiExpression({
              commaNames: validCommas,
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })
}

export { computeMaybeExpression }
