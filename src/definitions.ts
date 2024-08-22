import { Edo, EdoNotationDefinition } from "./types"

const EDO_NOTATION_DEFINITIONS: Record<Edo, EdoNotationDefinition> = {
    5: { sagitypes: [] },
    7: { sagitypes: [] },
    9: { sagitypes: ["|\\"] },
    11: { subset: 22 as Edo },
    12: { sagitypes: [] },
    19: { sagitypes: [] },
    15: { sagitypes: ["/|"] },
    17: { sagitypes: ["/|\\"] },
    22: { sagitypes: ["/|"]},
    31: { sagitypes: ["/|\\"] },
    43: { sagitypes: ["|)"] },
    47: { sagitypes: ["|(", "|)", "|\\", "(|\\"] },
    67: { sagitypes: [")|(", "/|)"] },
    71: { sagitypes: ["|\\", ")~|", "/|", "/|)"] },
    72: { sagitypes: ["/|", "|)", "/|\\"] },
} as Record<Edo, EdoNotationDefinition>

export {
    EDO_NOTATION_DEFINITIONS,
}
