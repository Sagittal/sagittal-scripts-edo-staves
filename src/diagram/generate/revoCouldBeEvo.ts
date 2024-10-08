import { Index, max, Max } from "@sagittal/general"
import { EdoNotationName, Sagittal, Sagitype } from "@sagittal/system"
import { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes } from "../usedSagittals"

const computeRevoCouldBeEvo = (edoNotationName: EdoNotationName): boolean => {
    const {
        uniqueUsedAbsoluteSagittalIndices,
        sagitypes,
    }: {
        uniqueUsedAbsoluteSagittalIndices: Index<Sagittal>[]
        sagitypes: Sagitype[]
    } = computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes(edoNotationName)

    const maxSagittalIndex: Max<Index<Sagittal>> = max(
        ...uniqueUsedAbsoluteSagittalIndices,
    )

    return maxSagittalIndex <= sagitypes.length
}

export { computeRevoCouldBeEvo }
