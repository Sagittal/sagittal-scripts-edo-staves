import { Cents, CENTS_PER_OCTAVE, computeRange } from "@sagittal/general"
import { Edo, EdoStep } from "./types"
import { JI_FIFTH_SIZE, FIFTHS_UNTIL_SHARP } from "./constants"

const computeFifthStep = (edo: Edo): EdoStep => {
    const stepSize: Cents = CENTS_PER_OCTAVE / edo as Cents
    const stepSizes: Cents[] = computeRange(edo as Edo).map((step: EdoStep): Cents => step * stepSize as Cents)

    let bestFifthError: Cents = CENTS_PER_OCTAVE
    let bestFifthStep: EdoStep = edo
    stepSizes.forEach((stepSize: Cents, index: number): void => {
        const fifthError: Cents = Math.abs(JI_FIFTH_SIZE - stepSize) as Cents
        if (fifthError < bestFifthError) {
            bestFifthError = fifthError
            bestFifthStep = index as EdoStep
        }
    })

    return bestFifthStep
}

const computeSharpStep = (edo: Edo, fifthStep: EdoStep) =>
    fifthStep * FIFTHS_UNTIL_SHARP % edo as EdoStep

export {
    computeFifthStep,
    computeSharpStep,
}
