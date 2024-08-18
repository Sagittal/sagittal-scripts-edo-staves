import { Sagitype } from "@sagittal/system"
import { Edo } from "./types"

const EDOS: Record<Edo, Sagitype[]> = {
    5: [],
    12: [],
    15: ["/|"],
    31: ["/|\\"],
    67: [")|(", "/|)"],
    72: ["/|", "|)", "/|\\"]
} as Record<Edo, Sagitype[]>

export {
    EDOS,
}
