import { deepEquals, floor } from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoNotationDefinition,
    isSubsetNotation,
    parseEdoName,
    Sagitype,
} from "@sagittal/system"

const EDO_NOTATION_DEFINITIONS_ENTRIES: [EdoName, EdoNotationDefinition][] =
    Object.entries(EDO_NOTATION_DEFINITIONS) as [
        EdoName,
        EdoNotationDefinition,
    ][]

const computeSharedSagittalSequenceEdoNames = (edoName: EdoName): EdoName[] => {
    const edoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoName]
    if (isSubsetNotation(edoNotationDefinition)) return []

    const { sagitypes, isLimmaFraction } = edoNotationDefinition
    if (sagitypes.length === 0) return []

    return isLimmaFraction
        ? computeLimmaFractionSharedSagittalSequenceEdoNames(edoName, sagitypes)
        : computeApotomeFractionSharedSagittalSequenceEdoNames(
              edoName,
              sagitypes,
          )
}

const computeLimmaFractionSharedSagittalSequenceEdoNames = (
    edoName: EdoName,
    sagitypes: Sagitype[],
) => {
    const fifthStep = computeFifthStep(edoName)
    const edo = parseEdoName(edoName).edo
    const limmaStep = computeLimmaStep(edo, fifthStep)
    const relevantSagitypes = sagitypes.slice(0, floor(limmaStep / 2))

    return EDO_NOTATION_DEFINITIONS_ENTRIES.filter(
        ([otherEdoName, otherEdoNotationDefinition]) => {
            if (
                otherEdoName === edoName ||
                isSubsetNotation(otherEdoNotationDefinition) ||
                !otherEdoNotationDefinition.isLimmaFraction
            )
                return false

            const otherFifthStep = computeFifthStep(otherEdoName)
            const otherEdo = parseEdoName(otherEdoName).edo
            const otherLimmaStep = computeLimmaStep(otherEdo, otherFifthStep)

            if (otherLimmaStep !== limmaStep!) return false

            const otherRelevantSagitypes =
                otherEdoNotationDefinition.sagitypes.slice(
                    0,
                    floor(otherLimmaStep / 2),
                )
            return deepEquals(otherRelevantSagitypes, relevantSagitypes)
        },
    )
        .map(([otherEdoName, _]) => otherEdoName)
        .sort()
}

const computeApotomeFractionSharedSagittalSequenceEdoNames = (
    edoName: EdoName,
    sagitypes: Sagitype[],
) => {
    const fifthStep = computeFifthStep(edoName)
    const edo = parseEdoName(edoName).edo
    const sharpStep = computeSharpStep(edo, fifthStep)
    const relevantSagitypes = sagitypes.slice(0, floor(sharpStep / 2))

    return EDO_NOTATION_DEFINITIONS_ENTRIES.filter(
        ([otherEdoName, otherEdoNotationDefinition]) => {
            if (
                otherEdoName === edoName ||
                isSubsetNotation(otherEdoNotationDefinition) ||
                otherEdoNotationDefinition.isLimmaFraction
            )
                return false

            const otherFifthStep = computeFifthStep(otherEdoName)
            const otherEdo = parseEdoName(otherEdoName).edo
            const otherSharpStep = computeSharpStep(otherEdo, otherFifthStep)

            if (otherSharpStep !== sharpStep!) return false

            const otherRelevantSagitypes =
                otherEdoNotationDefinition.sagitypes.slice(
                    0,
                    floor(otherSharpStep / 2),
                )
            
            return deepEquals(otherRelevantSagitypes, relevantSagitypes)
        },
    )
        .map(([otherEdoName, _]) => otherEdoName)
        .sort()
}

export { computeSharedSagittalSequenceEdoNames }
