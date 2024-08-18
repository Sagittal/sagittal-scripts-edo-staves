import { Cents, computeRange } from "@sagittal/general"
import { Edo, EdoStep } from "./types"
import { JI_FIFTH_SIZE, FIFTHS_UNTIL_SHARP } from "./constants"

const computeFifthStep = (edo: Edo): EdoStep => {
    const stepSize: Cents = 1200 / edo as Cents
    const stepSizes: Cents[] = computeRange(edo as Edo).map(step => step * stepSize as Cents)

    let bestFifthError: Cents = 1200 as Cents
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
