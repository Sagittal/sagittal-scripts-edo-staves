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
    EDO_NOTATION_DEFINITIONS,
    computeSagittals,
    isSubsetNotation,
    SubsetFactor,
    computeSubsetFactor,
    NonSubsetEdoNotationDefinition,
} from "@sagittal/system"
import { computeDefaultEdoStepNotationIndicesList } from "./chaining"
import { hydrateEdoStepNotations, EdoStepNotation } from "./hydration"
import { assembleAsStaffCodeInputSentence } from "./assembly"
import { EdoStepNotationIndices } from "./chaining"

const doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edo: Edo,
    flavor: Flavor,
    subsetFactor?: SubsetFactor,
): Io & Sentence => {
    const sagitypes: Sagitype[] = (
        EDO_NOTATION_DEFINITIONS[edo] as NonSubsetEdoNotationDefinition
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
        })
    const alignedEdoStepNotations: EdoStepNotation[] = hydrateEdoStepNotations(
        defaultSingleSpellingEdoStepNotationIndicesList,
        { sagittals, flavor, edo, fifthStep, subsetFactor, sharpStep },
    )

    return assembleAsStaffCodeInputSentence(alignedEdoStepNotations)
}

const computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence = (
    edo: Edo,
    flavor: Flavor,
): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edo]

    if (isSubsetNotation(edoNotationDefinition)) {
        const supersetEdo = edoNotationDefinition.supersetEdo

        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            supersetEdo,
            flavor,
            computeSubsetFactor({ edo, supersetEdo }),
        )
    } else {
        return doComputeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            edo,
            flavor,
        )
    }
}

export { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence }
