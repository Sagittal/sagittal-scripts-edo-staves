import { Count } from "@sagittal/general"
import { NOMINALS } from "../constants"
import { Nominal, Whorl } from "../types"

const NOMINAL_COUNT: Count<Nominal> = NOMINALS.length as Count<Nominal>

const ENOUGH_WHORLS_TO_GUARANTEE_POSITIVE_VALUE_BEFORE_MODULUS: Count<Whorl> = 3 as Count<Whorl>

export {
    NOMINAL_COUNT,
    ENOUGH_WHORLS_TO_GUARANTEE_POSITIVE_VALUE_BEFORE_MODULUS,
}
