import { Index, max, Max } from "@sagittal/general"
import { EdoName, Sagittal, Sagitype } from "@sagittal/system"
import { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes } from "../usedSagittals"

const computeRevoCouldBeEvo = (edoName: EdoName): boolean => {
    const {
        uniqueUsedAbsoluteSagittalIndices,
        sagitypes,
    }: {
        uniqueUsedAbsoluteSagittalIndices: Index<Sagittal>[]
        sagitypes: Sagitype[]
    } = computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes(edoName)

    const maxSagittalIndex: Max<Index<Sagittal>> = max(
        ...uniqueUsedAbsoluteSagittalIndices,
    )

    return maxSagittalIndex <= sagitypes.length
}

export { computeRevoCouldBeEvo }
