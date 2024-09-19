import { Index, isUndefined, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import { Edo, Sagittal, Sagitype } from "@sagittal/system"
import { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes } from "../../usedSagittals"

const SPARTAN_SAGITYPES: Sagitype[] = ["/|", "|)", "/|\\"] as Sagitype[]

const computeUsesOnlySpartans = (
    edo: Edo,
    useSecondBestFifth: boolean,
): boolean => {
    const {
        uniqueUsedAbsoluteSagittalIndices,
        sagitypes,
    }: {
        uniqueUsedAbsoluteSagittalIndices: Index<Sagittal>[]
        sagitypes: Sagitype[]
    } = computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes(
        edo,
        useSecondBestFifth,
    )

    const uniqueUsedSagitypes: Sagitype[] = uniqueUsedAbsoluteSagittalIndices
        .map(
            (uniqueUsedAbsoluteSagittalIndex: Index<Sagittal>) =>
                sagitypes[
                    uniqueUsedAbsoluteSagittalIndex - ZERO_ONE_INDEX_DIFF
                ],
        )
        .filter(
            (uniqueUsedSagitype: Sagitype): boolean =>
                !isUndefined(uniqueUsedSagitype),
        )

    return uniqueUsedSagitypes.every((usedSagitype: Sagitype): boolean =>
        SPARTAN_SAGITYPES.includes(usedSagitype),
    )
}

export { computeUsesOnlySpartans }
