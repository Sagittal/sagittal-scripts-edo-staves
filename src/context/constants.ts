import { computeDeepDistinct, Edo } from "@sagittal/general"
import { EDO_NOTATION_DEFINITIONS, EdoNotationName, parseEdoNotationName } from "@sagittal/system"

const DEFINED_EDOS: Edo[] = computeDeepDistinct(
    (Object.keys(EDO_NOTATION_DEFINITIONS) as EdoNotationName[])
        .map(parseEdoNotationName)
        .map(({ edo }: { edo: Edo }): Edo => edo),
)

export { DEFINED_EDOS }
