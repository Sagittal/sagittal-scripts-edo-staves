import { Sagitype } from "@sagittal/system"
import { Edo } from "./types"

const EDO_SAGITYPES: Record<Edo, Sagitype[]> = {
    5: [],
    12: [],
    15: ["/|"],
    31: ["/|\\"],
    67: [")|(", "/|)"],
    72: ["/|", "|)", "/|\\"]
} as Record<Edo, Sagitype[]>

export {
    EDO_SAGITYPES,
}
