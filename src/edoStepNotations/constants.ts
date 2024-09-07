import { Count } from "@sagittal/general"
import { NOMINALS, Nominal, Whorl } from "@sagittal/system"

const NOMINAL_COUNT: Count<Nominal> = NOMINALS.length as Count<Nominal>

export {
    NOMINAL_COUNT,
}
