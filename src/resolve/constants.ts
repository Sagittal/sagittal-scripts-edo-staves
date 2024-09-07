import { Count, Max } from "@sagittal/general"
import { Limma, WholeTone } from "./types"
import { EdoSizeCategory, NoteCountParametersByStave } from "./types"
import { Note } from "../types"

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

export {
    MAX_NOTE_COUNT_PER_STAVE,
    NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY,
    MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY,
    EDO_SIZE_CATEGORIES,
}
