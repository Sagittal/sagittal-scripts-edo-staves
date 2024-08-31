import { Count } from "@sagittal/general"
import { NOMINALS } from "../constants"
import { Nominal } from "../types"

const NOMINAL_COUNT: Count<Nominal> = NOMINALS.length as Count<Nominal>

export {
    NOMINAL_COUNT,
}
