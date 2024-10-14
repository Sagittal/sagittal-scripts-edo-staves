import {
    abs,
    computeDeepDistinct,
    dividesEvenly,
    Index,
} from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSagittals,
    computeSharpStep,
    computeSubsetFactor,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    EdoStep,
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
    uniqueUsedAbsoluteSagittalIndices: Index<Sagittal>[]
    sagitypes: Sagitype[]
} => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    let supersetEdoNotationName: EdoNotationName = isSubsetNotation(
        edoNotationDefinition,
    )
        ? edoNotationDefinition.supersetEdoNotationName
        : edoNotationName
    const supersetEdo: Edo = parseEdoNotationName(supersetEdoNotationName).edo
    const subsetFactor: SubsetFactor = computeSubsetFactor({ edo, supersetEdo })
    const flavor: Flavor = Flavor.REVO
    const sagitypes: Sagitype[] = computeSagitypes(
        EDO_NOTATION_DEFINITIONS[
            supersetEdoNotationName
        ] as NonSubsetEdoNotationDefinition
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
    const usedSpellings: Spelling[] = defaultSingleSpellings.filter(
        (_: Spelling, step: number) => dividesEvenly(step, subsetFactor),
    )
    const usedAbsoluteSagittalIndices: Index<Sagittal>[] = usedSpellings.map(
        ({ sagittalIndex }) => abs(sagittalIndex),
    )

    return {
        uniqueUsedAbsoluteSagittalIndices: computeDeepDistinct(
            usedAbsoluteSagittalIndices,
        ).filter(
            (usedAbsoluteSagittalIndex: Index<Sagittal>) =>
                usedAbsoluteSagittalIndex !== 0,
        ),
        sagitypes,
    }
}

export { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes }
