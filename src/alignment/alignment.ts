import { computeCodewordWidth, Octals, Code } from "staff-code"
import { computeRange, Count, Decimal, Index, max, Max, Word, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import { EdoStep, computeWholeToneStep, computeLimmaStep, Edo } from "@sagittal/system"
import { NoteCountParametersByStave, NoteCountByStavePattern, EdoSizeCategory, Stave } from "./types"
import {
    MAX_NOTE_COUNT_PER_STAVE,
    NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY,
    MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY,
    EDO_SIZE_CATEGORIES,
} from "./constants"
import { IntermediateForm, Note } from "../types"

// TODO: here is where we'd:
// - compute which alignment pattern this EDO will use
// - arrange the intermediate stringform into an array of arrays according to it
// - for each column, determine the max width
// - then modify the `assemble...` function below to take this width and staff breaks into account
// and then possibly in resolveEdoStepNotationsToIntermediateFormsOfActualFinalVisualNotation also possibly 
// handle the c4 vs c5 stuff, so that everything there is actually at least a staffcode Word. 
// but then the sagitype string would actually need to be a list thereof, and accents be handled there too. 
// and maybe it is better that nominal is left as a Nominal so the next layer can determine whether a nominal staffcode word is required...

// TODO: Actually do the spacing correctly using the alignment info ...

// TODO: Subset notations are going to need to know what the deletion pattern is from their layouts 

const computeNoteCountByStavePattern = ({ edo, fifthStep }: { edo: Edo, fifthStep: EdoStep }): NoteCountByStavePattern => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)
    const edoSizeCategoryInverseIndex: Index<EdoSizeCategory> = MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY.reduce(
        (
            chosenEdoSizeCategoryInverseIndex: Index<EdoSizeCategory>,
            { wholeToneCount, limmaCount }: NoteCountParametersByStave,
            edoSizeCategoryInverseIndex: number
        ): Index<EdoSizeCategory> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep <= MAX_NOTE_COUNT_PER_STAVE ?
                edoSizeCategoryInverseIndex as Index<EdoSizeCategory> :
                chosenEdoSizeCategoryInverseIndex,
        0 as Index<EdoSizeCategory>
    )
    const edoSizeCategoryIndex: Index<EdoSizeCategory> = EDO_SIZE_CATEGORIES.length - ZERO_ONE_INDEX_DIFF - edoSizeCategoryInverseIndex as Index<EdoSizeCategory>
    const edoSizeCategory: EdoSizeCategory = EDO_SIZE_CATEGORIES[edoSizeCategoryIndex]
    const noteCountParametersByStavePattern: NoteCountParametersByStave[] = NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY[edoSizeCategory]
    const noteCountByStavePattern: NoteCountByStavePattern = noteCountParametersByStavePattern
        .map(({ wholeToneCount, limmaCount }: NoteCountParametersByStave): Count<Note> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep as Count<Note>
        )

    // console.log("wholeToneStep", wholeToneStep)
    // console.log("limmaStep", limmaStep)
    // console.log("MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY: ", MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY)
    // console.log("EDO_SIZE_CATEGORIES.length: ", EDO_SIZE_CATEGORIES.length)
    // console.log("edoSizeCategoryInverseIndex: ", edoSizeCategoryInverseIndex)
    // console.log("edoSizeCategoryIndex: ", edoSizeCategoryIndex)
    // console.log("edoSizeCategory: ", edoSizeCategory)
    // console.log("noteCountParametersByStavePattern: ", noteCountParametersByStavePattern)
    // console.log("noteCountByStavePattern: ", noteCountByStavePattern)

    return noteCountByStavePattern
}

const computeColumnWidths = (
    intermediateForms: IntermediateForm[],
    { noteCountByStavePattern }: { noteCountByStavePattern: NoteCountByStavePattern }
): Max<Octals>[] => {
    const patternedIntermediateForms: IntermediateForm[][] = [[]]
    let noteIndex: Index<Note> = 0 as Index<Note>
    let staveIndex: Index<Stave> = 0 as Index<Stave>
    intermediateForms.forEach((intermediateForm: IntermediateForm): void => {
        patternedIntermediateForms[staveIndex].push(intermediateForm)
        noteIndex++
        if (noteIndex === noteCountByStavePattern[staveIndex] as Decimal<{ integer: true }> as Index<Note>) {
            staveIndex++
            patternedIntermediateForms[staveIndex] = []
            noteIndex = 0 as Index<Note>
        }
    })

    // TODO: first you need to separately compute the individual cell widths,
    // and pass that on to the final step
    // and also use it to compute the max width

    const maxLineLength: Max<Count<Note>> = max(...patternedIntermediateForms.map((line: IntermediateForm[]) => line.length as Count<Note>))
    const columnWidths: Max<Octals>[] = computeRange(maxLineLength).map((columnIndex: number): Max<Octals> =>
        patternedIntermediateForms.reduce(
            (maximumWidthOfNotationInThisColumn: Max<Octals>, patternedIntermediateFormsStave: IntermediateForm[]): Max<Octals> => {
                if (!patternedIntermediateFormsStave[columnIndex]) return maximumWidthOfNotationInThisColumn

                const { whorlCodewords, sagittalCodewords } = patternedIntermediateFormsStave[columnIndex]
                // console.log("whorlCodewords: ", whorlCodewords, " patternedIntermediateFormsStave: ", patternedIntermediateFormsStave, " columnIndex: ", columnIndex)
                const whorlWidth: Octals = whorlCodewords.reduce(
                    (totalWidth: Octals, whorlCodeword: Code & Word): Octals => totalWidth + computeCodewordWidth(whorlCodeword) as Octals,
                    0 as Octals
                )
                const sagitypeWidth: Octals = sagittalCodewords.reduce(
                    (totalWidth: Octals, sagitypeCodeword: Code & Word): Octals => totalWidth + computeCodewordWidth(sagitypeCodeword) as Octals,
                    0 as Octals
                )

                return Math.max(maximumWidthOfNotationInThisColumn, whorlWidth + sagitypeWidth) as Max<Octals>
            },
            0 as Max<Octals>
        )
    )

    return columnWidths
}

export {
    computeNoteCountByStavePattern,
    computeColumnWidths,
}
