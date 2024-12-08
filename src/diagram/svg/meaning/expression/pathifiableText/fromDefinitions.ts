import { Maybe } from "@sagittal/general"
import { EdoNotationDefinition, EdoNotationName, isSubsetNotation, StepDefinition } from "@sagittal/system"
import { EDO_NOTATION_DEFINITIONS_ENTRIES } from "../../../../../constants"
import { PathifiableTexts } from "../../../../../types"
import { computeMaybeExpression } from "../maybe"
import { Expression } from "../types"
import { convertToPathifiableTexts } from "./convert"

const computePathifiableTextsForExpressionsByEdoNotationNameFromEdoNotationDefinitions = (): Record<
    EdoNotationName,
    PathifiableTexts
> => {
    const expressionsByEdoNotationName: Record<EdoNotationName, Expression[]> =
        EDO_NOTATION_DEFINITIONS_ENTRIES.reduce(
            (
                expressionsByEdoNotationName: Record<EdoNotationName, Expression[]>,
                [edoNotationName, edoNotationDefinition]: [EdoNotationName, EdoNotationDefinition],
            ): Record<EdoNotationName, Expression[]> => {
                if (!isSubsetNotation(edoNotationDefinition)) {
                    const { stepDefinitions } = edoNotationDefinition

                    expressionsByEdoNotationName[edoNotationName] = stepDefinitions
                        .map((stepDefinition: StepDefinition, index: number): Maybe<Expression> => {
                            return computeMaybeExpression(
                                stepDefinition,
                                index === 0,
                                index === stepDefinitions.length - 1,
                            )
                        })
                        .filter(Boolean) as Expression[]
                }
                return expressionsByEdoNotationName
            },
            {} as Record<EdoNotationName, Expression[]>,
        )

    return convertToPathifiableTexts(expressionsByEdoNotationName)
}

const PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NOTATION_NAME: Record<EdoNotationName, PathifiableTexts> =
    computePathifiableTextsForExpressionsByEdoNotationNameFromEdoNotationDefinitions()

export { PATHIFIABLE_TEXTS_FOR_EXPRESSIONS_BY_EDO_NOTATION_NAME }
