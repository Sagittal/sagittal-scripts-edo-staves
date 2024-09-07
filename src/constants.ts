import { Count, Index, Io, Max } from "@sagittal/general"
import { NoteCountParametersByStave, Note, WholeTone, Limma, EdoSizeCategory } from "./types"
import { Flavor } from "@sagittal/system"

const MAX_NOTE_COUNT_PER_STAVE: Max<Count<Note>> = 18 as Max<Count<Note>>

const NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY: Record<EdoSizeCategory, NoteCountParametersByStave[]> = {
    [EdoSizeCategory.SMALL]: [
        { wholeToneCount: 5 as Count<WholeTone>, limmaCount: 2 as Count<Limma> },
    ],
    [EdoSizeCategory.SMALL_MEDIUM]: [
        { wholeToneCount: 3 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
        { wholeToneCount: 2 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
    ],
    [EdoSizeCategory.MEDIUM]: [
        { wholeToneCount: 2 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 2 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
    ],
    [EdoSizeCategory.LARGE_MEDIUM]: [
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
    ],
    [EdoSizeCategory.LARGE]: [
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 0 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> },
        { wholeToneCount: 0 as Count<WholeTone>, limmaCount: 1 as Count<Limma> },
    ],
}

const MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY: NoteCountParametersByStave[] = [
    { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 0 as Count<Limma> }, // large
    { wholeToneCount: 1 as Count<WholeTone>, limmaCount: 1 as Count<Limma> }, // large medium
    { wholeToneCount: 2 as Count<WholeTone>, limmaCount: 1 as Count<Limma> }, // medium
    { wholeToneCount: 3 as Count<WholeTone>, limmaCount: 1 as Count<Limma> }, // small medium
    { wholeToneCount: 5 as Count<WholeTone>, limmaCount: 2 as Count<Limma> }, // small
]

const EDO_SIZE_CATEGORIES: EdoSizeCategory[] = Object.values(EdoSizeCategory)

const FORMATTED_FLAVOR_NAMES: Record<Flavor, Io> = {
    [Flavor.EVO]: "Evo",
    [Flavor.EVO_SZ]: "Evo-SZ",
    [Flavor.REVO]: "Revo",
}

const EVO_FLAVOR_INDEX: Index<Flavor> = 0 as Index<Flavor>
const EVO_SZ_FLAVOR_INDEX: Index<Flavor> = 1 as Index<Flavor>
const REVO_FLAVOR_INDEX: Index<Flavor> = 2 as Index<Flavor>

export {
    MAX_NOTE_COUNT_PER_STAVE,
    NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY,
    MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY,
    EDO_SIZE_CATEGORIES,
    FORMATTED_FLAVOR_NAMES,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
}
