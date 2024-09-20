import { computeWholeToneStep, Edo, EdoStep } from "@sagittal/system"
import { MAX_STEP_COUNT_PER_STAVE } from "./constants"
import { StepCountsByStave } from "./types"
import { Count, Decimal } from "@sagittal/general"

const computeIsExtraLargeEdo = (
    edo: Edo,
    { fifthStep }: { fifthStep: EdoStep },
) => computeWholeToneStep(edo, fifthStep) > MAX_STEP_COUNT_PER_STAVE

const computeExtraLargeEdoStepCountsByStave = (edo: Edo): StepCountsByStave => {
    const stepCountsByStave: StepCountsByStave = []
    let remainingSteps: Count<EdoStep> = edo as Decimal<{
        integer: true
    }> as Count<EdoStep>

    while (remainingSteps >= MAX_STEP_COUNT_PER_STAVE) {
        stepCountsByStave.push(MAX_STEP_COUNT_PER_STAVE)
        remainingSteps = (remainingSteps -
            MAX_STEP_COUNT_PER_STAVE) as Count<EdoStep>
    }
    stepCountsByStave.push(remainingSteps)

    return stepCountsByStave
}

export { computeIsExtraLargeEdo, computeExtraLargeEdoStepCountsByStave }
