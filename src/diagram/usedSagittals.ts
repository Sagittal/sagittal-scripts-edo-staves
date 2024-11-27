import { Abs, abs, computeDeepDistinct, Decimal, dividesEvenly, Edo, Index, Integer } from "@sagittal/general"
import {
    computeSubsetFactor,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    Flavor,
    isSubsetNotation,
    parseEdoNotationName,
    Sagittal,
    Sagitype,
    Spelling,
    SubsetFactor,
} from "@sagittal/system"
import { computeNotation } from "../notation"

const computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes = (
    edoNotationName: EdoNotationName,
): {
    uniqueUsedAbsoluteSagittalIndices: Abs<Index<Sagittal>>[]
    sagitypes: Sagitype[]
} => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationName]
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    const supersetEdoNotationName: EdoNotationName = isSubsetNotation(edoNotationDefinition)
        ? edoNotationDefinition.supersetEdoNotationName
        : edoNotationName
    const supersetEdo: Edo = parseEdoNotationName(supersetEdoNotationName).edo
    const subsetFactor: SubsetFactor = computeSubsetFactor({ edo, supersetEdo })
    const flavor: Flavor = Flavor.REVO
    const { defaultSingleSpellings, sagitypes } = computeNotation(supersetEdoNotationName, flavor)

    const usedSpellings: Spelling[] = defaultSingleSpellings.filter((_: Spelling, step: number) =>
        dividesEvenly(step as Decimal<Integer>, subsetFactor),
    )
    const usedAbsoluteSagittalIndices: Abs<Index<Sagittal>>[] = usedSpellings.map(({ sagittalIndex }) =>
        abs(sagittalIndex),
    )

    return {
        uniqueUsedAbsoluteSagittalIndices: computeDeepDistinct(usedAbsoluteSagittalIndices).filter(
            (usedAbsoluteSagittalIndex: Abs<Index<Sagittal>>) => usedAbsoluteSagittalIndex !== 0,
        ),
        sagitypes,
    }
}

export { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes }
