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
import { computePrimaryCommaName } from "./primary"
import { CommaSection } from "./types"

const COMMA_SECTIONS: Record<Name<Comma>, CommaSection> = Object.values(EDO_NOTATION_DEFINITIONS).reduce(
    (
        commaSections: Record<Name<Comma>, CommaSection>,
        edoNotationDefinition: EdoNotationDefinition,
    ): Record<Name<Comma>, CommaSection> => {
        if (isSubsetNotation(edoNotationDefinition)) return commaSections

        const { stepDefinitions } = edoNotationDefinition
        stepDefinitions.forEach((stepDefinition: StepDefinition): void => {
            const { sagitype, validCommas } = stepDefinition
            if (isUndefined(validCommas)) return

            validCommas.forEach((maybeCommaName: Maybe<Name<Comma>>, commaIndex: number): void => {
                if (isUndefined(maybeCommaName)) return
                const commaName: Name<Comma> = maybeCommaName
                if (!isUndefined(commaSections[commaName])) return

                // TODO: DRY these two branches up
                if (commaIndex === 0) {
                    const isDown: boolean = computeIsDown(commaName)
                    const comma = computeComma(commaName)
                    const superComma = isDown ? flipComma(comma) : comma

                    commaSections[maybeCommaName] = {
                        isDown,
                        comma,
                        superComma,
                        sagitype: isDown
                            ? computeAccidentalSagitype(flipSagittal(parseSagitype(sagitype))!)
                            : sagitype,
                    }
                } else {
                    const isDown: boolean = computeIsDown(commaName)
                    const comma = computeComma(commaName)
                    const superComma = isDown ? flipComma(comma) : comma

                    commaSections[commaName] = {
                        // TODO: oh maybe we should just put the commaName on the section here? that would simplify the signatures in the text, which I have a TODO about
                        primaryCommaName: computePrimaryCommaName(sagitype),
                        isDown,
                        comma,
                        superComma, // TODO: may not want to keep this here if it's only used in one place and we're going for a minimal representation here
                        sagitype: isDown ? flipSagitype(sagitype) : sagitype,
                    }
                }
            })
        })

        return commaSections
    },
    {} as Record<Name<Comma>, CommaSection>,
)

export { COMMA_SECTIONS }
