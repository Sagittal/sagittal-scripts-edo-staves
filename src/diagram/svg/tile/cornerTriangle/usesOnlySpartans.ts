import { Abs, Index, isUndefined, Maybe, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import {
    computeApotomeComplement,
    computeSagittalSagitype,
    EdoNotationName,
    Sagittal,
    Sagitype,
    Shafts,
    SYMBOL_SUBSETS,
    SymbolSubsetId,
    computeSagittalFromSymbolClassId,
} from "@sagittal/system"
import { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes } from "../../../usedSagittals"

const SPARTAN_SAGITYPES: Sagitype[] = (
    SYMBOL_SUBSETS[SymbolSubsetId.SPARTAN].map(computeSagittalFromSymbolClassId) as Sagittal[]
)
    .reduce((sagittals: Sagittal[], sagittal: Sagittal): Sagittal[] => {
        const apotomeComplement: Maybe<Sagittal> = computeApotomeComplement(sagittal)
        if (!isUndefined(apotomeComplement) && apotomeComplement.shafts === Shafts.SINGLE)
            sagittals.push(apotomeComplement)
        sagittals.push(sagittal)
        return sagittals
    }, [] as Sagittal[])
    .map(computeSagittalSagitype)

const computeUsesOnlySpartans = (edoNotationName: EdoNotationName): boolean => {
    const {
        uniqueUsedAbsoluteSagittalIndices,
        sagitypes,
    }: {
        uniqueUsedAbsoluteSagittalIndices: Abs<Index<Sagittal>>[]
        sagitypes: Sagitype[]
    } = computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes(edoNotationName)

    const uniqueUsedSagitypes: Sagitype[] = uniqueUsedAbsoluteSagittalIndices
        .map(
            (uniqueUsedAbsoluteSagittalIndex: Abs<Index<Sagittal>>) =>
                sagitypes[uniqueUsedAbsoluteSagittalIndex - ZERO_ONE_INDEX_DIFF],
        )
        .filter((uniqueUsedSagitype: Sagitype): boolean => !isUndefined(uniqueUsedSagitype))

    return uniqueUsedSagitypes.every((usedSagitype: Sagitype): boolean =>
        SPARTAN_SAGITYPES.includes(usedSagitype),
    )
}

export { computeUsesOnlySpartans }
