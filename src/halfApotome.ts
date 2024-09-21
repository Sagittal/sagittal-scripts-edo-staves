import { Index, isEven, Maybe, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import { EdoStep, Sagittal, Sagitype } from "@sagittal/system"

const computeHalfApotomeIndex = (sharpStep: EdoStep): Index =>
    (sharpStep / 2 - ZERO_ONE_INDEX_DIFF) as Index

const getMaybeHalfApotome = <T = Sagittal | Sagitype>(
    sagittalsOrSagitypes: T[],
    sharpStep: EdoStep,
): Maybe<T> =>
    isEven(sharpStep)
        ? sagittalsOrSagitypes[computeHalfApotomeIndex(sharpStep)]
        : undefined

const setHalfApotome = <T = Sagittal | Sagitype>(
    sagittalsOrSagitypes: T[],
    sharpStep: EdoStep,
    halfApotomeSagitalOrSagitype: T,
): void => {
    sagittalsOrSagitypes[computeHalfApotomeIndex(sharpStep)] =
        halfApotomeSagitalOrSagitype
}

export { getMaybeHalfApotome, setHalfApotome }
