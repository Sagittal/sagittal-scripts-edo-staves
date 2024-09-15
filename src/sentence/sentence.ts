import { Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    Sagitype,
    Edo,
    EdoStep,
    EdoNotationDefinition,
    computeFifthStep,
    computeSharpStep,
    computeSagittals,
    isSubsetNotation,
    SubsetFactor,
    computeSubsetFactor,
    NonSubsetEdoNotationDefinition,
    computeLimmaStep,
} from "@sagittal/system"
import { computeDefaultEdoStepNotationIndicesList } from "./chaining"
import { hydrateEdoStepNotations, EdoStepNotation } from "./hydration"
import { assembleAsStaffCodeInputSentence } from "./assembly"
import { EdoStepNotationIndices } from "./chaining"
import { computeEdoNotationDefinition } from "../definition"

const doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edo: Edo,
    flavor: Flavor,
    { useSecondBestFifth }: { useSecondBestFifth: boolean },
    subsetFactor?: SubsetFactor,
): Io & Sentence => {
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

    const alignedEdoStepNotations: EdoStepNotation[] = hydrateEdoStepNotations(
        defaultSingleSpellingEdoStepNotationIndicesList,
        {
            sagittals,
            flavor,
            edo,
            fifthStep,
            subsetFactor,
            sharpStep,
            limmaStep,
        },
    )

    return assembleAsStaffCodeInputSentence(alignedEdoStepNotations)
}

const computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edo: Edo,
    flavor: Flavor,
    { useSecondBestFifth }: { useSecondBestFifth: boolean },
): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition =
        computeEdoNotationDefinition(edo, useSecondBestFifth)

    if (isSubsetNotation(edoNotationDefinition)) {
        const supersetEdo = edoNotationDefinition.supersetEdo

        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            supersetEdo,
            flavor,
            { useSecondBestFifth },
            computeSubsetFactor({ edo, supersetEdo }),
        )
    } else {
        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            edo,
            flavor,
            { useSecondBestFifth },
        )
    }
}

export { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence }
