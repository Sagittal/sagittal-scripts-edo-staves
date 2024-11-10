import {
    Abs,
    abs,
    computeDeepDistinct,
    Decimal,
    dividesEvenly,
    Edo,
    EdoStep,
    Index,
    Integer,
} from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSagittals,
    computeSharpStep,
    computeSubsetFactor,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    Flavor,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    parseEdoNotationName,
    Sagittal,
    Sagitype,
    Spelling,
    SubsetFactor,
    computeSagitypes,
} from "@sagittal/system"
import { computeDefaultSpellings } from "../sentence"

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
    const sagitypes: Sagitype[] = computeSagitypes(
        EDO_NOTATION_DEFINITIONS[supersetEdoNotationName] as NonSubsetEdoNotationDefinition,
    )
    const fifthStep: EdoStep = computeFifthStep(supersetEdoNotationName)
    const sharpStep: EdoStep = computeSharpStep(supersetEdo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(supersetEdo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellings: Spelling[] = computeDefaultSpellings({
        edoNotationName: supersetEdoNotationName,
        fifthStep,
        sagittals,
        flavor,
        limmaStep,
    })
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
