import { Index, Max } from "@sagittal/general"
import { Edo, Sagittal, Sagitype } from "@sagittal/system"
import { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes } from "../usedSagittals"

const computeRevoCouldBeEvo = (
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

    const maxSagittalIndex: Max<Index<Sagittal>> = Math.max(
        ...uniqueUsedAbsoluteSagittalIndices,
    ) as Max<Index<Sagittal>>

    return maxSagittalIndex <= sagitypes.length
}

export { computeRevoCouldBeEvo }
