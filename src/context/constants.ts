import { computeDeepDistinct } from "@sagittal/general"
import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    parseEdoName,
} from "@sagittal/system"

const DEFINED_EDOS: Edo[] = computeDeepDistinct(
    (Object.keys(EDO_NOTATION_DEFINITIONS) as EdoName[])
        .map(parseEdoName)
        .map(({ edo }: { edo: Edo }): Edo => edo),
)

export { DEFINED_EDOS }
