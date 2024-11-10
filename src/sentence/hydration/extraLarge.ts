import { Count, Decimal, Edo, EdoStep, Integer } from "@sagittal/general"
import { computeWholeToneStep } from "@sagittal/system"
import { MAX_STEP_COUNT_PER_STAVE } from "./constants"
import { Folding } from "./types"

const computeIsExtraLargeEdo = (edo: Edo, { fifthStep }: { fifthStep: EdoStep }) =>
    computeWholeToneStep(edo, fifthStep) > MAX_STEP_COUNT_PER_STAVE

const computeExtraLargeEdoFolding = (edo: Edo): Folding => {
    const folding: Folding = []
    let remainingSteps: Count<EdoStep> = edo as Decimal<Integer> as Count<EdoStep>

    while (remainingSteps >= MAX_STEP_COUNT_PER_STAVE) {
        folding.push(MAX_STEP_COUNT_PER_STAVE)
        remainingSteps = (remainingSteps - MAX_STEP_COUNT_PER_STAVE) as Count<EdoStep>
    }
    folding.push(remainingSteps)

    return folding
}

export { computeIsExtraLargeEdo, computeExtraLargeEdoFolding }
