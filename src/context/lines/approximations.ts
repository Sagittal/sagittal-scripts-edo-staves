import { Io, isUndefined, Maybe } from "@sagittal/general"
import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    isSubsetNotation,
    StepDefinition,
} from "@sagittal/system"

const hasAnyValidSecondaryCommas = (
    edoNotationName: EdoNotationName,
): boolean => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isUndefined(edoNotationDefinition)) return false

    if (isSubsetNotation(edoNotationDefinition)) return false

    return edoNotationDefinition.stepDefinitions.some(
        ({ validCommas }: StepDefinition): boolean => {
            if (isUndefined(validCommas)) return false
            if (validCommas.length < 2) return false
            if (isUndefined(validCommas[0])) return true

            return false
        },
    )
}

const computeApproximationExplanationLine = (edo: Edo): Maybe<Io> => {
    const edoNotationName: EdoNotationName = `${edo}` as EdoNotationName
    const secondBestFifthEdoNotationName: EdoNotationName =
        `${edo}b` as EdoNotationName

    if (
        hasAnyValidSecondaryCommas(edoNotationName) ||
        hasAnyValidSecondaryCommas(secondBestFifthEdoNotationName)
    ) {
        return `In the following diagrams, an equals sign (=) means that the symbol represents the tempered version of a comma which it ''exactly'' represents in JI (a [[Sagittal notation#Primary comma|primary comma]]), while an approximately equals sign (≈) means the symbol represents the tempered version of a comma which it ''approximately'' represents in JI (a secondary comma).`
    }

    return undefined
}

export { computeApproximationExplanationLine }
