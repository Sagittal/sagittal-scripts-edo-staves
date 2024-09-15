import { dividesEvenly, Index, Max } from "@sagittal/general"
import {
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
    SubsetFactor,
} from "@sagittal/system"
import {
    computeDefaultEdoStepNotationIndicesList,
    EdoStepNotationIndices,
} from "../../sentence"
import { computeEdoNotationDefinition } from "../../definition"

const computeRevoCouldBeEvo = (inputEdo: Edo, useSecondBestFifth: boolean) => {
    const edoNotationDefinition: EdoNotationDefinition =
        computeEdoNotationDefinition(inputEdo, useSecondBestFifth)
    let edo: Edo = isSubsetNotation(edoNotationDefinition)
        ? edoNotationDefinition.supersetEdo
        : inputEdo
    const subsetFactor: SubsetFactor = computeSubsetFactor({
        edo: inputEdo,
        supersetEdo: edo,
    })
    const flavor: Flavor = Flavor.REVO
    const sagitypes: Sagitype[] = (
        computeEdoNotationDefinition(
            edo,
            useSecondBestFifth,
        ) as NonSubsetEdoNotationDefinition
    ).sagitypes
    const fifthStep: EdoStep = computeFifthStep(edo, useSecondBestFifth)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)
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
            limmaStep,
        })
    const usedEdoStepNotationIndicesList: EdoStepNotationIndices[] =
        defaultSingleSpellingEdoStepNotationIndicesList.filter(
            (_: EdoStepNotationIndices, step: number) =>
                dividesEvenly(step, subsetFactor),
        )
    const absoluteSagittalIndices: Index<Sagittal>[] =
        usedEdoStepNotationIndicesList.map(
            ({ sagittalIndex }) => Math.abs(sagittalIndex) as Index<Sagittal>,
        )
    const maxSagittalIndex: Max<Index<Sagittal>> = Math.max(
        ...absoluteSagittalIndices,
    ) as Max<Index<Sagittal>>

    return maxSagittalIndex <= sagitypes.length
}

export { computeRevoCouldBeEvo }
