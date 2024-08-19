import { Sagitype } from "@sagittal/system"
import { Edo } from "./types"

const EDO_SAGITYPES: Record<Edo, Sagitype[]> = {
    5: [],
    7: [],
    12: [],
    19: [],
    15: ["/|"],
    17: ["/|\\"],
    31: ["/|\\"],
    43: ["|)"],
    47: ["|(", "|)", "|\\", "(|\\"],
    67: [")|(", "/|)"],
    // TODO: fix 71
    71: ["|\\", ")~|", "/|", "/|)"],
    72: ["/|", "|)", "/|\\"]
} as Record<Edo, Sagitype[]>

export {
    EDO_SAGITYPES,
}
