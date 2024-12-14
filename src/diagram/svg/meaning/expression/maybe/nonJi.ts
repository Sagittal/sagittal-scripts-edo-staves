import { Hyperlink, Io, isUndefined, Maybe, Sentence } from "@sagittal/general"
import { Sagitype } from "@sagittal/system"
import { Code } from "staff-code"
import { FRACTIONAL_3_LIMIT_NOTATION_PAGE, XEN_WIKI_BASE_URL } from "../../../../../constants"
import { Expression } from "../types"
import { computeDefiniendum, computeDefiniens } from "./expression"

const computeNonJiExpression = ({
    nonJiMeaning,
    isFirstExpression,
    isFinalExpression,
    sagitype,
}: {
    nonJiMeaning: Io
    isFirstExpression: boolean
    isFinalExpression: boolean
    sagitype: Sagitype
}): Expression => {
    const definiendum: Code & Sentence = computeDefiniendum(sagitype, {
        isFirstExpression,
    })

    const definiensBody: Io = ` = ${nonJiMeaning}` as Io
    const definiens: Io = computeDefiniens(definiensBody, { isFinalExpression })

    return {
        definiendum,
        definiens,
        hyperlink: `${XEN_WIKI_BASE_URL}${FRACTIONAL_3_LIMIT_NOTATION_PAGE}` as Hyperlink,
    }
}

const computeMaybeNonJiExpression = ({
    nonJiMeaning,
    isFirstExpression,
    isFinalExpression,
    sagitype,
}: {
    nonJiMeaning: Maybe<Io>
    isFirstExpression: boolean
    isFinalExpression: boolean
    sagitype: Sagitype
}): Maybe<Expression> =>
    isUndefined(nonJiMeaning)
        ? undefined
        : computeNonJiExpression({
              nonJiMeaning,
              isFirstExpression,
              isFinalExpression,
              sagitype,
          })

export { computeMaybeNonJiExpression }
