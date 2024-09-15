import { dividesEvenly, Index, Max } from "@sagittal/general"
import {
    computeFifthStep,
    computeSagittals,
    computeSharpStep,
    computeSubsetFactor,
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
    EdoStep,
    Flavor,
    isSubsetNotation,
    NonSubsetEdoNotationDefinition,
    Sagittal,
    Sagitype,
    SubsetFactor,
} from "@sagittal/system"
import {
    computeDefaultEdoStepNotationIndicesList,
    EdoStepNotationIndices,
} from "../sentence"

const computeRevoCouldBeEvo = (inputEdo: Edo, useSecondBestFifth: boolean) => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[inputEdo][useSecondBestFifth ? 1 : 0]
    let edo: Edo = isSubsetNotation(edoNotationDefinition)
        ? edoNotationDefinition.supersetEdo
        : inputEdo
    const subsetFactor: SubsetFactor = computeSubsetFactor({
        edo: inputEdo,
        supersetEdo: edo,
    })
    const flavor: Flavor = Flavor.REVO
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edo][useSecondBestFifth ? 1 : 0] as NonSubsetEdoNotationDefinition
    ).sagitypes
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({
        sagitypes,
        flavor,
        sharpStep,
    })

    const defaultSingleSpellingEdoStepNotationIndicesList: EdoStepNotationIndices[] =
        computeDefaultEdoStepNotationIndicesList({
            edo,
            fifthStep,
            sagittals,
            flavor,
            useSecondBestFifth,
        })
    const usedEdoStepNotationIndicesList: EdoStepNotationIndices[] =
        defaultSingleSpellingEdoStepNotationIndicesList.filter(
            (_: EdoStepNotationIndices, step: number) =>
                dividesEvenly(step, subsetFactor),
        )
    const sagittalIndices: Index<Sagittal>[] =
        usedEdoStepNotationIndicesList.map(({ sagittalIndex }) => sagittalIndex)
    const maxSagittalIndex: Max<Index<Sagittal>> = Math.max(
        ...sagittalIndices,
    ) as Max<Index<Sagittal>>

    return maxSagittalIndex <= sagitypes.length
}

export { computeRevoCouldBeEvo }
