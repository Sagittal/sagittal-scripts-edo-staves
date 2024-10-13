import { Io } from "@sagittal/general"
import { EdoStep } from "@sagittal/system"

const equalsPositiveOrLessThanZero = (step: EdoStep): Io =>
    step < 0 ? " < 0" : ` = ${step}`

export { equalsPositiveOrLessThanZero }
