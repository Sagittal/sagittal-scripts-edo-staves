import { Count, Max } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"

const MAX_STEP_COUNT_PER_STAVE: Max<Count<EdoStep>> = 18 as Max<Count<EdoStep>>

export { MAX_STEP_COUNT_PER_STAVE }
