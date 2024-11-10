import { Edo, EdoStep, isEven } from "@sagittal/general"
import { computeFifthStep, computeSharpStep, EdoNotationName, parseEdoNotationName } from "@sagittal/system"

const computeHasHalfApotome = (edoNotationName: EdoNotationName): boolean => {
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const fifthStep: EdoStep = computeFifthStep(edoNotationName)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)

    return isEven(sharpStep)
}

export { computeHasHalfApotome }
