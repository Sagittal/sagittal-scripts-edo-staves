import { Index, ZERO_ONE_INDEX_DIFF, Count, Max } from "@sagittal/general"
import { Edo, EdoStep, computeWholeToneStep, computeLimmaStep } from "@sagittal/system"
import { Note } from "../types"
import { NoteCountParametersByStave, Alignment, EdoSizeCategory, Limma, WholeTone } from "./types"

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

const computeAlignment = ({ edo, fifthStep }: { edo: Edo, fifthStep: EdoStep }): Alignment => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)

    const edoSizeCategoryInverseIndex: Index<EdoSizeCategory> = MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY.reduce(
        (
            chosenEdoSizeCategoryInverseIndex: Index<EdoSizeCategory>,
            { wholeToneCount, limmaCount }: NoteCountParametersByStave,
            edoSizeCategoryInverseIndex: number
        ): Index<EdoSizeCategory> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep <= MAX_NOTE_COUNT_PER_STAVE ?
                edoSizeCategoryInverseIndex as Index<EdoSizeCategory> :
                chosenEdoSizeCategoryInverseIndex,
        0 as Index<EdoSizeCategory>
    )
    const edoSizeCategoryIndex: Index<EdoSizeCategory> = EDO_SIZE_CATEGORIES.length - ZERO_ONE_INDEX_DIFF - edoSizeCategoryInverseIndex as Index<EdoSizeCategory>
    const edoSizeCategory: EdoSizeCategory = EDO_SIZE_CATEGORIES[edoSizeCategoryIndex]
    
    const noteCountParametersByStaves: NoteCountParametersByStave[] = NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY[edoSizeCategory]
    const alignment: Alignment = noteCountParametersByStaves
        .map(({ wholeToneCount, limmaCount }: NoteCountParametersByStave): Count<Note> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep as Count<Note>
        )

    return alignment
}

export {
    computeAlignment,
}
