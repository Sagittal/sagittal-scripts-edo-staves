import { Edo, Io, isUndefined, Maybe } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoNotationName,
    isSubsetNotation,
    StepDefinition,
} from "@sagittal/system"

const hasAnyValidSecondaryCommas = (edoNotationName: EdoNotationName): boolean => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]

    if (isUndefined(edoNotationDefinition)) return false

    if (isSubsetNotation(edoNotationDefinition)) return false

    return edoNotationDefinition.stepDefinitions.some(({ validCommas }: StepDefinition): boolean => {
        if (isUndefined(validCommas)) return false
        if (validCommas.length > 1) return true
        if (isUndefined(validCommas[0])) return true

        return false
    })
}

const computeApproximationExplanationLine = (edo: Edo): Maybe<Io> => {
    const edoNotationName: EdoNotationName = `${edo}` as EdoNotationName
    const secondBestFifthEdoNotationName: EdoNotationName = `${edo}b` as EdoNotationName

    if (
        hasAnyValidSecondaryCommas(edoNotationName) ||
        hasAnyValidSecondaryCommas(secondBestFifthEdoNotationName)
    ) {
        return `In the following diagrams, a sagittal symbol followed by an equals sign (=) means that the following comma is the symbol's [[Sagittal notation#Primary comma|primary comma]] (the comma it ''exactly'' represents in JI), while an approximately equals sign (≈) means it is a secondary comma (a comma it ''approximately'' represents in JI). In both cases the symbol exactly represents the tempered version of the comma in this EDO.`
    }

    return undefined
}

export { computeApproximationExplanationLine }
