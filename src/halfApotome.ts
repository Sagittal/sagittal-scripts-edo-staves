import {
    deepEquals,
    Index,
    isEven,
    isUndefined,
    Maybe,
    ZERO_ONE_INDEX_DIFF,
} from "@sagittal/general"
import {
    computeSagittalSagitype,
    EdoStep,
    Sagittal,
    SAGITTAL_SEMISHARP,
    Sagitype,
} from "@sagittal/system"

const computeHalfApotomeIndex = (sharpStep: EdoStep): Index =>
    (sharpStep / 2 - ZERO_ONE_INDEX_DIFF) as Index

const getMaybeHalfApotome = <T = Sagittal | Sagitype>(
    sagittalsOrSagitypes: T[],
    sharpStep: EdoStep,
): Maybe<T> =>
    isEven(sharpStep)
        ? sagittalsOrSagitypes[computeHalfApotomeIndex(sharpStep)]
        : undefined

const isSagittal = (
    sagittalOrSagitype: Sagittal | Sagitype,
): sagittalOrSagitype is Sagittal => typeof sagittalOrSagitype === "object"

const computeIsSagittalSemisharpTheHalfApotome = (
    sagittalsOrSagitypes: (Sagittal | Sagitype)[],
    sharpStep: EdoStep,
): boolean => {
    const maybeHalfApotome: Maybe<Sagittal | Sagitype> = getMaybeHalfApotome(
        sagittalsOrSagitypes,
        sharpStep,
    )
    if (isUndefined(maybeHalfApotome)) return false

    return deepEquals(
        getMaybeHalfApotome(sagittalsOrSagitypes, sharpStep),
        isSagittal(maybeHalfApotome)
            ? SAGITTAL_SEMISHARP
            : computeSagittalSagitype(SAGITTAL_SEMISHARP),
    )
}
export { computeIsSagittalSemisharpTheHalfApotome }
