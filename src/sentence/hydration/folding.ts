import { Index, ZERO_ONE_INDEX_DIFF, Count, EdoStep, Edo } from "@sagittal/general"
import { computeWholeToneStep } from "@sagittal/system"
import { FoldingParameters, Folding, FoldingCategory, Limma, WholeTone } from "./types"
import { MAX_STEP_COUNT_PER_STAVE } from "./constants"
import { computeExtraLargeEdoFolding } from "./extraLarge"

const FOLDING_PARAMETERS_BY_CATEGORY: Record<FoldingCategory, FoldingParameters[]> = {
    [FoldingCategory.SMALL]: [
        {
            wholeToneCount: 5 as Count<WholeTone>,
            limmaCount: 2 as Count<Limma>,
        },
    ],
    [FoldingCategory.SMALL_MEDIUM]: [
        {
            wholeToneCount: 3 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
        {
            wholeToneCount: 2 as Count<WholeTone>,
            limmaCount: 1 as Count<Limma>,
        },
    ],
    [FoldingCategory.MEDIUM]: [
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
    [FoldingCategory.LARGE_MEDIUM]: [
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
    [FoldingCategory.LARGE]: [
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

const FOLDING_PARAMETERS_BY_DECREASING_EDO_SIZE_FOLDING_CATEGORY: FoldingParameters[] = [
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

const FOLDING_CATEGORIES: FoldingCategory[] = Object.values(FoldingCategory)

const computeFolding = ({
    edo,
    isExtraLargeEdo,
    fifthStep,
    limmaStep,
}: {
    edo: Edo
    isExtraLargeEdo: boolean
    fifthStep: EdoStep
    limmaStep: EdoStep
}): Folding => {
    if (isExtraLargeEdo) return computeExtraLargeEdoFolding(edo)

    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)

    const foldingCategoryInverseIndex: Index<FoldingCategory> =
        FOLDING_PARAMETERS_BY_DECREASING_EDO_SIZE_FOLDING_CATEGORY.reduce(
            (
                chosenFoldingCategoryInverseIndex: Index<FoldingCategory>,
                { wholeToneCount, limmaCount }: FoldingParameters,
                foldingCategoryInverseIndex: number,
            ): Index<FoldingCategory> =>
                wholeToneCount * wholeToneStep + limmaCount * limmaStep <= MAX_STEP_COUNT_PER_STAVE
                    ? (foldingCategoryInverseIndex as Index<FoldingCategory>)
                    : chosenFoldingCategoryInverseIndex,
            0 as Index<FoldingCategory>,
        )
    const foldingCategoryIndex: Index<FoldingCategory> = (FOLDING_CATEGORIES.length -
        ZERO_ONE_INDEX_DIFF -
        foldingCategoryInverseIndex) as Index<FoldingCategory>
    const foldingCategory: FoldingCategory = FOLDING_CATEGORIES[foldingCategoryIndex]

    const foldingParameters: FoldingParameters[] = FOLDING_PARAMETERS_BY_CATEGORY[foldingCategory]
    const folding: Folding = foldingParameters.map(
        ({ wholeToneCount, limmaCount }: FoldingParameters): Count<EdoStep> =>
            (wholeToneCount * wholeToneStep + limmaCount * limmaStep) as Count<EdoStep>,
    )

    return folding
}

export { computeFolding }
