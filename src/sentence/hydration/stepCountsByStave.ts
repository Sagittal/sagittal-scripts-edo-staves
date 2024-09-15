import { Index, ZERO_ONE_INDEX_DIFF, Count, Max } from "@sagittal/general"
import {
    Edo,
    EdoStep,
    computeWholeToneStep,
} from "@sagittal/system"
import {
    StepCountParametersByStave,
    StepCountsByStave,
    EdoSizeCategory,
    Limma,
    WholeTone,
} from "./types"

const MAX_STEP_COUNT_PER_STAVE: Max<Count<EdoStep>> = 18 as Max<Count<EdoStep>>

const STEP_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY: Record<
    EdoSizeCategory,
    StepCountParametersByStave[]
> = {
    [EdoSizeCategory.SMALL]: [
        {
            wholeToneCount: 5 as Count<WholeTone>,
            limmaCount: 2 as Count<Limma>,
        },
    ],
    [EdoSizeCategory.SMALL_MEDIUM]: [
        {
            wholeToneCount: 3 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
        {
            wholeToneCount: 2 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
    ],
    [EdoSizeCategory.MEDIUM]: [
        {
            wholeToneCount: 2 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 2 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
    ],
    [EdoSizeCategory.LARGE_MEDIUM]: [
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
    ],
    [EdoSizeCategory.LARGE]: [
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 0 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        },
        {
            wholeToneCount: 0 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
    ],
}

const MAX_STEP_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY: StepCountParametersByStave[] =
    [
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 0 as Count<Limma>,
        }, // large
        {
            wholeToneCount: 1 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        }, // large medium
        {
            wholeToneCount: 2 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        }, // medium
        {
            wholeToneCount: 3 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        }, // small medium
        {
            wholeToneCount: 5 as Count<WholeTone>,
            limmaCount: 2 as Count<Limma>,
        }, // small
    ]

const EDO_SIZE_CATEGORIES: EdoSizeCategory[] = Object.values(EdoSizeCategory)

const computeStepCountsByStave = ({
    edo,
    fifthStep,
    limmaStep,
}: {
    edo: Edo
    fifthStep: EdoStep
    limmaStep: EdoStep
}): StepCountsByStave => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    const edoSizeCategoryInverseIndex: Index<EdoSizeCategory> =
        MAX_STEP_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY.reduce(
            (
                chosenEdoSizeCategoryInverseIndex: Index<EdoSizeCategory>,
                { wholeToneCount, limmaCount }: StepCountParametersByStave,
                edoSizeCategoryInverseIndex: number,
            ): Index<EdoSizeCategory> =>
                wholeToneCount * wholeToneStep + limmaCount * limmaStep <=
                MAX_STEP_COUNT_PER_STAVE
                    ? (edoSizeCategoryInverseIndex as Index<EdoSizeCategory>)
                    : chosenEdoSizeCategoryInverseIndex,
            0 as Index<EdoSizeCategory>,
        )
    const edoSizeCategoryIndex: Index<EdoSizeCategory> =
        (EDO_SIZE_CATEGORIES.length -
            ZERO_ONE_INDEX_DIFF -
            edoSizeCategoryInverseIndex) as Index<EdoSizeCategory>
    const edoSizeCategory: EdoSizeCategory =
        EDO_SIZE_CATEGORIES[edoSizeCategoryIndex]

    const stepCountParametersByStaves: StepCountParametersByStave[] =
        STEP_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY[edoSizeCategory]
    const stepCountsByStave: StepCountsByStave =
        stepCountParametersByStaves.map(
            ({
                wholeToneCount,
                limmaCount,
            }: StepCountParametersByStave): Count<EdoStep> =>
                (wholeToneCount * wholeToneStep +
                    limmaCount * limmaStep) as Count<EdoStep>,
        )

    return stepCountsByStave
}

export { computeStepCountsByStave }
