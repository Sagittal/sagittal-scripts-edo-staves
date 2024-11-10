import { Max, Edo } from "@sagittal/general"
import { EDO_NOTATION_DEFINITIONS, EdoNotationDefinition, EdoNotationName } from "@sagittal/system"

const MAX_PERIODIC_TABLE_EDO: Max<Edo> = 77 as Max<Edo>

const EDO_NOTATION_DEFINITIONS_ENTRIES: [EdoNotationName, EdoNotationDefinition][] = Object.entries(
    EDO_NOTATION_DEFINITIONS,
) as [EdoNotationName, EdoNotationDefinition][]

export { MAX_PERIODIC_TABLE_EDO, EDO_NOTATION_DEFINITIONS_ENTRIES }
