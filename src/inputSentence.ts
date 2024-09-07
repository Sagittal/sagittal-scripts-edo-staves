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
    computeSubsetSagitypes,
    computeSubsetEdoStepNotations,
    SubsetFactor,
    computeSubsetFactor
} from "@sagittal/system"
import { computeEdoStepNotations } from "./edoStepNotations"
import { resolveEdoStepNotationsToIntermediateFormsOfActualFinalVisualNotation } from "./resolve"
import { computeNoteCountByStavePattern, computeColumnWidths } from "./alignment"
import { assembleAsStaffCodeInputSentence } from "./assemble"

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor, { root }: { root: Nominal } = { root: Nominal.C }): Io & Sentence => {
    const edoNotationDefinition: EdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edo]

    if (isSubsetNotation(edoNotationDefinition)) {
        // TODO: how much of this can be extracted, calling something with supersetEdo instead of edo?
        const sagitypes: Sagitype[] = computeSubsetSagitypes(edoNotationDefinition)
        const supersetEdo: Edo = edoNotationDefinition.supersetEdo
        const fifthStep: EdoStep = computeFifthStep(supersetEdo)
        const sharpStep: EdoStep = computeSharpStep(supersetEdo, fifthStep)
        const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })
        const subsetFactor: SubsetFactor = computeSubsetFactor({ edo, supersetEdo })

        const edoStepNotations = computeSubsetEdoStepNotations({ subsetFactor, edoStepNotations: computeEdoStepNotations({ edo, fifthStep, sagittals, flavor, root }) })
        // TODO: eventually this needs to be handled afterward
        // this is what i had elsewhere, when the size category formula used the subsetfactor:
        // probably need to redo how/when subset notations are taken, 
        // like compute this w / r / t to the superset and wait to drop half until the end, 
        // and leave lots of awkward blanks I guess so it actually look slike the 2n or 3n edo 
        // but with notes deleted from it like a checkerboard if the first row is odd or whatever
        const intermediateForms = resolveEdoStepNotationsToIntermediateFormsOfActualFinalVisualNotation(edoStepNotations, { sagittals, flavor })

        const noteCountByStavePattern = computeNoteCountByStavePattern({ edo: supersetEdo, fifthStep })
        const columnWidths = computeColumnWidths(intermediateForms, { noteCountByStavePattern })

        return assembleAsStaffCodeInputSentence(intermediateForms, { root, columnWidths, noteCountByStavePattern })
    } else {
        const sagitypes: Sagitype[] = edoNotationDefinition.sagitypes
        const fifthStep: EdoStep = computeFifthStep(edo)
        const sharpStep: EdoStep = computeSharpStep(edo, fifthStep)
        const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })

        const edoStepNotations: EdoStepNotation[] = computeEdoStepNotations({ edo, fifthStep, sagittals, flavor, root })
        const intermediateForms = resolveEdoStepNotationsToIntermediateFormsOfActualFinalVisualNotation(edoStepNotations, { sagittals, flavor })

        const noteCountByStavePattern = computeNoteCountByStavePattern({ edo, fifthStep })
        const columnWidths = computeColumnWidths(intermediateForms, { noteCountByStavePattern })

        return assembleAsStaffCodeInputSentence(intermediateForms, { root, columnWidths, noteCountByStavePattern })
    }
}

export {
    computeStaffCodeInputSentence,
}
