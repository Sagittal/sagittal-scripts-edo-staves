import { Comma, isUndefined, Maybe, Name } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
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

        const { stepDefinitions }: NonSubsetEdoNotationDefinition = edoNotationDefinition
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

                const isDown: boolean = computeIsDown(commaName)
                const comma: Comma = computeComma(commaName)
                const superComma: Comma = isDown ? flipComma(comma) : comma
                const commaSection: CommaSection = {
                    commaName,
                    isDown,
                    comma,
                    superComma,
                    sagitype: isDown ? flipSagitype(sagitype) : sagitype,
                }
                if (commaIndex !== 0) commaSection.primaryComma = computePrimaryComma(sagitype)

                newCommaSections.push(commaSection)
            })
        })

        return commaSections.concat(newCommaSections)
    },
    [] as CommaSection[],
)

export { COMMA_SECTIONS }
