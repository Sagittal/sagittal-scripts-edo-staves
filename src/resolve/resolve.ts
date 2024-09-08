import { Octals } from "staff-code"
import { Max } from "@sagittal/general"
import { Flavor, Sagittal, EdoStepNotation, Edo, EdoStep, SubsetFactor } from "@sagittal/system"
import { NoteCountByStavePattern, PatternedIntermediateForms, IntermediateFormWithSimpleWidth } from "./types"
import { computeNoteCountByStavePattern } from "./computePattern"
import { applyNoteCountByStavePatternToEdoStepNotations } from "./applyPattern"
import { convertToPatternedIntermediateFormsWithSimpleWidth } from "./convert"
import { computeColumnWidths } from "./computeWidths"
import { applyColumnWidths } from "./applyWidths"

// TODO: ALIGNMENT 
// when that's done, and the subset stuff I suppose, update all of the tests so you get the latest definition of nice formatting
// maybe better term than patterned, like, aligned? and does that just ultimately get consolidated into the idea of the intermediate form, that it is patterned?
// and this isn't really "resolving" anything anymore, it's more like hydrating, or converting. but now there's that "convert" file in here
    
const resolveEdoStepNotationsToPatternedIntermediateForms = ( 
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor, edo, fifthStep, subsetFactor }: { sagittals: Sagittal[], flavor: Flavor, edo: Edo, fifthStep: EdoStep, subsetFactor?: SubsetFactor }
): PatternedIntermediateForms => {
    const noteCountByStavePattern: NoteCountByStavePattern = computeNoteCountByStavePattern({ edo, fifthStep })
    const patternedEdoStepNotations: EdoStepNotation[][] = applyNoteCountByStavePatternToEdoStepNotations(edoStepNotations, { noteCountByStavePattern })
    const patternedIntermediateFormsWithSimpleWidths: IntermediateFormWithSimpleWidth[][] = convertToPatternedIntermediateFormsWithSimpleWidth(patternedEdoStepNotations, { sagittals, flavor, subsetFactor })
    const columnWidths: Max<Octals>[] = computeColumnWidths(patternedIntermediateFormsWithSimpleWidths)

    return applyColumnWidths(patternedIntermediateFormsWithSimpleWidths, columnWidths)
}

export {
    resolveEdoStepNotationsToPatternedIntermediateForms,
}
