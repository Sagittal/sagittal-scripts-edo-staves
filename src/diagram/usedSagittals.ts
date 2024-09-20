import { computeDeepDistinct, dividesEvenly, Index } from "@sagittal/general"
import {
    computeFifthStep,
    computeLimmaStep,
    computeSagittals,
    computeSharpStep,
    computeSubsetFactor,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
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
import { parseEdoName } from "@sagittal/system/dist/cjs/notations"

const computeUniqueUsedAbsoluteSagittalIndicesAndSagitypes = (
    edoName: EdoName,
): {
    uniqueUsedAbsoluteSagittalIndices: Index<Sagittal>[]
    sagitypes: Sagitype[]
} => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]
    const edo: Edo = parseEdoName(edoName).edo
    let supersetEdoName: EdoName = isSubsetNotation(edoNotationDefinition)
        ? edoNotationDefinition.supersetEdoName
        : edoName
    const supersetEdo: Edo = parseEdoName(supersetEdoName).edo
    const subsetFactor: SubsetFactor = computeSubsetFactor({ edo, supersetEdo })
    const flavor: Flavor = Flavor.REVO
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[
            supersetEdoName
        ] as NonSubsetEdoNotationDefinition
    ).sagitypes
    const fifthStep: EdoStep = computeFifthStep(supersetEdoName)
    const sharpStep: EdoStep = computeSharpStep(supersetEdo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(supersetEdo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellings: Spelling[] = computeDefaultSpellings({
        edoName: supersetEdoName,
        fifthStep,
        sagittals,
        flavor,
        limmaStep,
    })
    const usedSpellings: Spelling[] = defaultSingleSpellings.filter(
        (_: Spelling, step: number) => dividesEvenly(step, subsetFactor),
    )
    const usedAbsoluteSagittalIndices: Index<Sagittal>[] = usedSpellings.map(
        ({ sagittalIndex }) => Math.abs(sagittalIndex) as Index<Sagittal>,
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
