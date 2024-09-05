import { computeRange, Count, Index } from "@sagittal/general"
import { EdoStep, computeWholeToneStep, computeLimmaStep, Edo } from "@sagittal/system"
import { computeCodeWordWidth } from "staff-code"
import { NoteCountParametersByStave, NoteCountByStavePattern, Note, WholeTone, Limma, EdoSizeCategory } from "./types"
import {
    MAX_NOTE_COUNT_PER_STAVE,
    NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY,
    MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY,
    EDO_SIZE_CATEGORIES,
} from "./constants"

const computeAlignment = ({ edo, fifthStep, intermediateStringForms }: { edo: Edo, fifthStep: EdoStep }) => {

    // TODO: here is where we'd:
    // - compute which alignment pattern this EDO will use
    // - arrange the intermediate stringform into an array of arrays according to it
    // - for each column, determine the max width
    // - then modify the `assemble...` function below to take this width and staff breaks into account
    // and then possibly in resolveEdoStepNotationsToIntermediateStringFormsOfActualFinalVisualNotation also possibly 
    // handle the c4 vs c5 stuff, so that everything there is actually at least a staffcode Word. 
    // but then the sagitype string would actually need to be a list thereof, and accents be handled there too. 
    // and maybe it is better that nominal is left as a Nominal so the next layer can determine whether a nominal staffcode word is required...

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
    const edoSizeCategoryIndex: Index<EdoSizeCategory> = EDO_SIZE_CATEGORIES.length - edoSizeCategoryInverseIndex as Index<EdoSizeCategory>
    const edoSizeCategory: EdoSizeCategory = EDO_SIZE_CATEGORIES[edoSizeCategoryIndex]
    const noteCountParametersByStavePattern: NoteCountParametersByStave[] = NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY[edoSizeCategory]
    const noteCountByStavePattern: NoteCountByStavePattern = noteCountParametersByStavePattern
        .map(({ wholeToneCount, limmaCount }: NoteCountParametersByStave): Count<Note> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep as Count<Note>
        )

    // console.log("pattern: ", pattern)
    const output = [[]]
    let i = 0
    let patternI = 0
    intermediateStringForms.forEach(intermediateStringForm => {
        output[patternI].push(intermediateStringForm)
        i++
        if (i == noteCountByStavePattern[patternI]) {
            patternI++
            output[patternI] = []
            i = 0
        }
    })
    // console.log(output)

    const maxLineLength = Math.max(...output.map(line => line.length))
    const colWidths = computeRange(maxLineLength).map(colIndex => {
        // console.log("col index ", colIndex)
        return output.reduce(
            (acc, line) => {
                if (!line[colIndex]) return acc
                const { whorlString, sagitypeString } = line[colIndex]
                const whorlWidth = whorlString ? computeCodeWordWidth(whorlString) : 0
                const sagitypeWidth = sagitypeString ? computeCodeWordWidth(sagitypeString) : 0 // TODO: handle accents; maybe just need to move handleDiacritics here sooner?
                return Math.max(acc, whorlWidth + sagitypeWidth)
            },
            0)
    })

    // console.log(colWidths)

    return { colWidths, noteCountByStavePattern }
}

export {
    computeAlignment,
}
