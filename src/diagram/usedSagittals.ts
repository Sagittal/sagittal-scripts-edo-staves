import { computeDeepDistinct, dividesEvenly, Ed, Index, Max } from "@sagittal/general"
import {
    computeEdoNotationDefinition,
    computeFifthStep,
    computeLimmaStep,
    computeSagittals,
    computeSharpStep,
    computeSubsetFactor,
    Edo,
    EdoNotationDefinition,
    EdoStep,
    Flavor,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
    Spelling,
    SubsetFactor,
} from "@sagittal/system"
import { computeDefaultSpellings } from "../sentence"

const computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes = (
    edo: Edo,
    useSecondBestFifth: boolean,
): {
    uniqueUsedAbsoluteSagittalIndices: Index<Sagittal>[]
    sagitypes: Sagitype[]
} => {
    const edoNotationDefinition: EdoNotationDefinition =
        computeEdoNotationDefinition(edo, useSecondBestFifth)
    let supersetEdo: Edo = isSubsetNotation(edoNotationDefinition)
        ? edoNotationDefinition.supersetEdo
        : edo
    const subsetFactor: SubsetFactor = computeSubsetFactor({ edo, supersetEdo })
    const flavor: Flavor = Flavor.REVO
    const sagitypes: Sagitype[] = (
        computeEdoNotationDefinition(
            supersetEdo,
            useSecondBestFifth,
        ) as NonSubsetEdoNotationDefinition
    ).sagitypes
    const fifthStep: EdoStep = computeFifthStep(supersetEdo, useSecondBestFifth)
    const sharpStep: EdoStep = computeSharpStep(supersetEdo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(supersetEdo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellings: Spelling[] = computeDefaultSpellings({
        edo: supersetEdo,
        fifthStep,
        sagittals,
        flavor,
        useSecondBestFifth,
        limmaStep,
    })
    const usedSpellings: Spelling[] = defaultSingleSpellings.filter(
        (_: Spelling, step: number) => dividesEvenly(step, subsetFactor),
    )
    const usedAbsoluteSagittalIndices: Index<Sagittal>[] = usedSpellings.map(
        ({ sagittalIndex }) => Math.abs(sagittalIndex) as Index<Sagittal>,
    )

    return {
        uniqueUsedAbsoluteSagittalIndices: computeDeepDistinct(usedAbsoluteSagittalIndices)
            .filter(
                (usedAbsoluteSagittalIndex: Index<Sagittal>) =>
                    usedAbsoluteSagittalIndex !== 0,
            ),
        sagitypes,
    }
}

export { computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes }
