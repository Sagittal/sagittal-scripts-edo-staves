import { Octals } from "staff-code"
import { Max } from "@sagittal/general"
import { Flavor, Sagittal, EdoStepNotation, Edo, EdoStep } from "@sagittal/system"
import { NoteCountByStavePattern, PatternedIntermediateForms, IntermediateFormWithSimpleWidth } from "./types"
import { computeNoteCountByStavePattern } from "./computePattern"
import { applyNoteCountByStavePatternToEdoStepNotations } from "./applyPattern"
import { convertToPatternedIntermediateFormsWithSimpleWidth } from "./convert"
import { computeColumnWidths } from "./computeWidths"
import { applyColumnWidths } from "./applyWidths"

const resolveEdoStepNotationsToPatternedIntermediateForms = ( 
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor, edo, fifthStep }: { sagittals: Sagittal[], flavor: Flavor, edo: Edo, fifthStep: EdoStep }
): PatternedIntermediateForms => {

    // TODO: ALIGNMENT 
    // Actually do the spacing correctly using the alignment info ...
    // you need to separately compute the individual cell widths,
    // and pass that on to the final step
    // and also use it to compute the max width
    //
    // when that's done, and the subset stuff I suppose, update all of the tests so you get the latest definition of nice formatting
    //
    // maybe better term than patterned, like, aligned? and does that just ultimately get consolidated into the idea of the intermediate form, that it is patterned?
    // and this isn't really "resolving" anything anymore, it's more like hydrating, or converting. but now there's that "convert" file in here

    const noteCountByStavePattern: NoteCountByStavePattern = computeNoteCountByStavePattern({ edo, fifthStep })
    const patternedEdoStepNotations: EdoStepNotation[][] = applyNoteCountByStavePatternToEdoStepNotations(edoStepNotations, { noteCountByStavePattern })
    const patternedIntermediateFormsWithSimpleWidths: IntermediateFormWithSimpleWidth[][] = convertToPatternedIntermediateFormsWithSimpleWidth(patternedEdoStepNotations, { sagittals, flavor })
    const columnWidths: Max<Octals>[] = computeColumnWidths(patternedIntermediateFormsWithSimpleWidths)

    return applyColumnWidths(patternedIntermediateFormsWithSimpleWidths, columnWidths)
}

export {
    resolveEdoStepNotationsToPatternedIntermediateForms,
}
