import { EdoStep, Io } from "@sagittal/general"

const equalsPositiveOrLessThanZero = (step: EdoStep): Io => (step < 0 ? " < 0" : ` = ${step}`)

export { equalsPositiveOrLessThanZero }
