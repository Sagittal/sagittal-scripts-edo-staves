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
import { PatternedIntermediateForms, resolveEdoStepNotationsToPatternedIntermediateForms } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./assemble"

const doComputeStaffCodeInputSentence = (edo: Edo, flavor: Flavor, { root }: { root: Nominal }, subsetFactor?: SubsetFactor): Io & Sentence => {
    const sagitypes: Sagitype[] = (EDO_NOTATION_DEFINITIONS[edo] as NonSubsetEdoNotationDefinition).sagitypes
    const fifthStep: EdoStep = computeFifthStep(edo)
    const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })

    const edoStepNotations: EdoStepNotation[] = computeEdoStepNotations({ edo, fifthStep, sagittals, flavor, root })
    const patternedIntermediateForms: PatternedIntermediateForms = resolveEdoStepNotationsToPatternedIntermediateForms(edoStepNotations, { sagittals, flavor, edo, fifthStep, subsetFactor })

    return assembleAsStaffCodeInputSentence(patternedIntermediateForms, { root })
}

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor, { root }: { root: Nominal } = { root: Nominal.C }): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edo]

    if (isSubsetNotation(edoNotationDefinition)) {

        // TODO: SUBSET NOTATIONS
        // eventually this needs to be handled afterward
        // this is what i had elsewhere, when the size category formula used the subsetfactor:
        // probably need to redo how/when subset notations are taken,
        // like compute this w / r / t to the superset and wait to drop half until the end,
        // and leave lots of awkward blanks I guess so it actually look slike the 2n or 3n edo
        // but with notes deleted from it like a checkerboard if the first row is odd or whatever
        //
        // OOOH OOOH what if we actually just add another property to the intermediate form which is subsetExcluded
        // and that will say whether to ignore it in the max width calc,
        // and also whether to render it in the assemble step, or just use the max widths, which does mean those will need to be returned separately
        // that or include it on intermediate form too
        //
        // Subset notations are going to need to know what the deletion pattern is from their layouts
        //
        // once this is all handled... see how much of this can be extracted, calling something with supersetEdo instead of edo?
        // and don't forget to turn off xit for the 11-EDO tests

        const supersetEdo = edoNotationDefinition.supersetEdo

        return doComputeStaffCodeInputSentence(supersetEdo, flavor, { root }, computeSubsetFactor({ edo, supersetEdo }))
    } else {
        return doComputeStaffCodeInputSentence(edo, flavor, { root })
    }
}

export {
    computeStaffCodeInputSentence,
}
