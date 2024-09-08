import { Io, Sentence } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    Sagitype,
    EdoStepNotation,
    Edo,
    EdoStep,
    EdoNotationDefinition,
    Nominal,
    computeFifthStep,
    computeSharpStep,
    EDO_NOTATION_DEFINITIONS,
    computeSagittals,
    isSubsetNotation,
    SubsetFactor,
    computeSubsetFactor,
    NonSubsetEdoNotationDefinition
} from "@sagittal/system"
import { computeEdoStepNotations } from "./notate"
import { alignAndHydrateEdoStepNotations, HydratedEdoStepNotation } from "./alignAndHydrate"
import { assembleAsStaffCodeInputSentence } from "./assemble"

const doComputeStaffCodeInputSentence = (edo: Edo, flavor: Flavor, subsetFactor?: SubsetFactor): Io & Sentence => {
    const sagitypes: Sagitype[] = (EDO_NOTATION_DEFINITIONS[edo] as NonSubsetEdoNotationDefinition).sagitypes
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })

    const edoStepNotations: EdoStepNotation[] = computeEdoStepNotations({ edo, fifthStep, sagittals, flavor })
    const alignedHydratedEdoStepNotations: HydratedEdoStepNotation[][] = alignAndHydrateEdoStepNotations(edoStepNotations, { sagittals, flavor, edo, fifthStep, subsetFactor })

    return assembleAsStaffCodeInputSentence(alignedHydratedEdoStepNotations)
}

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edo]

    if (isSubsetNotation(edoNotationDefinition)) {
        const supersetEdo = edoNotationDefinition.supersetEdo

        return doComputeStaffCodeInputSentence(supersetEdo, flavor, computeSubsetFactor({ edo, supersetEdo }))
    } else {
        return doComputeStaffCodeInputSentence(edo, flavor)
    }
}

export {
    computeStaffCodeInputSentence,
}
