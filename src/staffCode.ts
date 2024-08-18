import { Io, Sentence, Count } from "@sagittal/general"
import { NOTES_PER_SYSTEM } from "./constants"

// TODO: CLEANUP perhaps there's some way to split this up into the three different things? I want the work of the previous step to have been
// finally disentangling the linked fate of whorl and sagitype stuff. then return type back to argument where this is caleld
const assembleAsStaffCodeInputSentence = (intermediateStringForm: Record<any, string>[]): Io & Sentence => {
    let inputSentence: Io & Sentence = "ston \n5; Gcl ; 5; \nc4 5; " as Io & Sentence
    let currentNominal: Io = "c"
    let noteCount: Count = 0 as Count
    let noteCountPastWhichBreakSystem: Count = NOTES_PER_SYSTEM

    intermediateStringForm.forEach(({ nominalString, whorlString, sagitypeString }: Record<any, string>): void => {
        if (nominalString != currentNominal) {
            currentNominal = nominalString
            inputSentence = inputSentence + `\n9; en; bl \n` as Io & Sentence
            if (noteCount > noteCountPastWhichBreakSystem && nominalString != "c") {
                noteCountPastWhichBreakSystem = noteCountPastWhichBreakSystem + NOTES_PER_SYSTEM as Count
                inputSentence = inputSentence + "nl; \n5; Gcl ; 5; " as Io & Sentence
            } else {
                inputSentence = inputSentence + "5; " as Io & Sentence
            }
            inputSentence = inputSentence + `${nominalString}${currentNominal == "c" ? 5 : 4} ` as Io & Sentence
        }

        if (sagitypeString.length) {
            inputSentence = inputSentence + `5; ${sagitypeString} ; ` as Io & Sentence
        } else {
            inputSentence = inputSentence + "9; " as Io & Sentence
        }

        if (whorlString == "#") inputSentence = inputSentence + "# ; " as Io & Sentence
        else if (whorlString == "x") inputSentence = inputSentence + ".x ; " as Io & Sentence
        else if (whorlString == "n") inputSentence = inputSentence + "n ; " as Io & Sentence
        else if (whorlString == "b") inputSentence = inputSentence + "b ; " as Io & Sentence
        else if (whorlString == "B") inputSentence = inputSentence + "bb ; " as Io & Sentence
        else inputSentence = inputSentence + `${whorlString} ; ` as Io & Sentence

        inputSentence = inputSentence + "nt ; " as Io & Sentence
        noteCount++
    })

    inputSentence = inputSentence + "\n3; en; bl \nnl; " as Io & Sentence

    return inputSentence
}

export {
    assembleAsStaffCodeInputSentence,
}
