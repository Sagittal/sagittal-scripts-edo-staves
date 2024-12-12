import { Comma, isUndefined, Maybe, Name } from "@sagittal/general"
import {
    computeAccidentalSagitype,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    flipSagittal,
    isSubsetNotation,
    parseSagitype,
    StepDefinition,
} from "@sagittal/system"
import { computeComma } from "./comma"
import { computeIsDown } from "./down"
import { flipComma, flipSagitype } from "./flip"
import { computePrimaryComma } from "./primary"
import { CommaSection } from "./types"

const COMMA_SECTIONS: CommaSection[] = Object.values(EDO_NOTATION_DEFINITIONS).reduce(
    (commaSections: CommaSection[], edoNotationDefinition: EdoNotationDefinition): CommaSection[] => {
        if (isSubsetNotation(edoNotationDefinition)) return commaSections

        const newCommaSections: CommaSection[] = []

        const { stepDefinitions } = edoNotationDefinition
        stepDefinitions.forEach((stepDefinition: StepDefinition): void => {
            const { sagitype, validCommas } = stepDefinition
            if (isUndefined(validCommas)) return

            validCommas.forEach((maybeCommaName: Maybe<Name<Comma>>, commaIndex: number): void => {
                if (isUndefined(maybeCommaName)) return
                const commaName: Name<Comma> = maybeCommaName
                if (
                    commaSections.some(
                        ({ commaName: existingCommaName }: CommaSection): boolean =>
                            existingCommaName === commaName,
                    )
                )
                    return

                // TODO: DRY these two branches up
                if (commaIndex === 0) {
                    const isDown: boolean = computeIsDown(commaName)
                    const comma = computeComma(commaName)
                    const superComma = isDown ? flipComma(comma) : comma

                    newCommaSections.push({
                        commaName,
                        isDown,
                        comma,
                        superComma,
                        sagitype: isDown
                            ? computeAccidentalSagitype(flipSagittal(parseSagitype(sagitype))!)
                            : sagitype,
                    })
                } else {
                    const isDown: boolean = computeIsDown(commaName)
                    const comma = computeComma(commaName)
                    const superComma = isDown ? flipComma(comma) : comma

                    newCommaSections.push({
                        commaName,
                        primaryComma: computePrimaryComma(sagitype),
                        isDown,
                        comma,
                        superComma, // TODO: may not want to keep this here if it's only used in one place and we're going for a minimal representation here
                        sagitype: isDown ? flipSagitype(sagitype) : sagitype,
                    })
                }
            })
        })

        return commaSections.concat(newCommaSections)
    },
    [] as CommaSection[],
)

export { COMMA_SECTIONS }
