import { deepEquals, floor } from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    isSubsetNotation,
    parseEdoNotationName,
    Sagitype,
    computeSagitypes,
} from "@sagittal/system"
import { EDO_NOTATION_DEFINITIONS_ENTRIES } from "../../../constants"

const computeSharedSagittalSequenceEdoNotationNames = (
    edoNotationName: EdoNotationName,
): EdoNotationName[] => {
    const edoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]
    if (isSubsetNotation(edoNotationDefinition)) return []

    const sagitypes: Sagitype[] = computeSagitypes(edoNotationDefinition)
    if (sagitypes.length === 0) return []

    return edoNotationDefinition.isLimmaFraction
        ? computeLimmaFractionSharedSagittalSequenceEdoNotationNames(
              edoNotationName,
              sagitypes,
          )
        : computeApotomeFractionSharedSagittalSequenceEdoNotationNames(
              edoNotationName,
              sagitypes,
          )
}

const computeLimmaFractionSharedSagittalSequenceEdoNotationNames = (
    edoNotationName: EdoNotationName,
    sagitypes: Sagitype[],
) => {
    const fifthStep = computeFifthStep(edoNotationName)
    const edo = parseEdoNotationName(edoNotationName).edo
    const limmaStep = computeLimmaStep(edo, fifthStep)
    const relevantSagitypes = sagitypes.slice(0, floor(limmaStep / 2))

    return EDO_NOTATION_DEFINITIONS_ENTRIES.filter(
        ([otherEdoNotationName, otherEdoNotationDefinition]) => {
            if (
                otherEdoNotationName === edoNotationName ||
                isSubsetNotation(otherEdoNotationDefinition) ||
                !otherEdoNotationDefinition.isLimmaFraction
            )
                return false

            const otherFifthStep = computeFifthStep(otherEdoNotationName)
            const otherEdo = parseEdoNotationName(otherEdoNotationName).edo
            const otherLimmaStep = computeLimmaStep(otherEdo, otherFifthStep)

            if (otherLimmaStep !== limmaStep!) return false

            const otherRelevantSagitypes = computeSagitypes(
                otherEdoNotationDefinition,
            ).slice(0, floor(otherLimmaStep / 2))
            return deepEquals(otherRelevantSagitypes, relevantSagitypes)
        },
    )
        .map(([otherEdoNotationName, _]) => otherEdoNotationName)
        .sort()
}

const computeApotomeFractionSharedSagittalSequenceEdoNotationNames = (
    edoNotationName: EdoNotationName,
    sagitypes: Sagitype[],
) => {
    const fifthStep = computeFifthStep(edoNotationName)
    const edo = parseEdoNotationName(edoNotationName).edo
    const sharpStep = computeSharpStep(edo, fifthStep)
    const relevantSagitypes = sagitypes.slice(0, floor(sharpStep / 2))

    return EDO_NOTATION_DEFINITIONS_ENTRIES.filter(
        ([otherEdoNotationName, otherEdoNotationDefinition]) => {
            if (
                otherEdoNotationName === edoNotationName ||
                isSubsetNotation(otherEdoNotationDefinition) ||
                otherEdoNotationDefinition.isLimmaFraction
            )
                return false

            const otherFifthStep = computeFifthStep(otherEdoNotationName)
            const otherEdo = parseEdoNotationName(otherEdoNotationName).edo
            const otherSharpStep = computeSharpStep(otherEdo, otherFifthStep)

            if (otherSharpStep !== sharpStep!) return false

            const otherRelevantSagitypes = computeSagitypes(
                otherEdoNotationDefinition,
            ).slice(0, floor(otherSharpStep / 2))

            return deepEquals(otherRelevantSagitypes, relevantSagitypes)
        },
    )
        .map(([otherEdoNotationName, _]) => otherEdoNotationName)
        .sort()
}

export { computeSharedSagittalSequenceEdoNotationNames }
