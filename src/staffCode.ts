import { Io, Sentence, Count } from "@sagittal/general"
import { NOTES_PER_SYSTEM } from "./constants"

// TODO: CLEANUP this not necessarily example but just finally taking the moment to note this one down
// should change signatures to use {} params rather than positional arguments when it's not obvious

const computeNominalPart = (
    nominalString: string,
    notationState: { noteCount: Count, noteCountPastWhichBreakSystem: Count, currentNominal: Io }
): Io & Sentence => {
    let nominalPart = "" as Io & Sentence

    notationState.noteCount++

    if (nominalString != notationState.currentNominal) {
        notationState.currentNominal = nominalString
        nominalPart = nominalPart + `\n9; en; bl \n` as Io & Sentence
        if (notationState.noteCount > notationState.noteCountPastWhichBreakSystem && nominalString != "c") {
            notationState.noteCountPastWhichBreakSystem = notationState.noteCountPastWhichBreakSystem + NOTES_PER_SYSTEM as Count
            nominalPart = nominalPart + "nl; \n5; Gcl ; 5; " as Io & Sentence
        } else {
            nominalPart = nominalPart + "5; " as Io & Sentence
        }
        nominalPart = nominalPart + `${nominalString}${notationState.currentNominal == "c" ? 5 : 4} ` as Io & Sentence
    }

    return nominalPart
}

const computeSagittalPart = (sagitypeString: string): Io & Sentence => {
    if (sagitypeString.length) {
        return `5; ${sagitypeString} ; ` as Io & Sentence
    } else {
        return "9; " as Io & Sentence
    }
}

const computeWhorlPart = (whorlString: string): Io & Sentence => {
    if (whorlString == "#") return "# ; " as Io & Sentence
    else if (whorlString == "x") return ".x ; " as Io & Sentence
    else if (whorlString == "n") return "n ; " as Io & Sentence
    else if (whorlString == "b") return "b ; " as Io & Sentence
    else if (whorlString == "B") return "bb ; " as Io & Sentence
    else return `${whorlString} ; ` as Io & Sentence
}

const assembleAsStaffCodeInputSentence = (intermediateStringForm: Record<any, string>[]): Io & Sentence => {
    let currentNominal: Io = "c"
    let noteCount: Count = 0 as Count
    let noteCountPastWhichBreakSystem: Count = NOTES_PER_SYSTEM
    const notationState = {
        currentNominal,
        noteCount,
        noteCountPastWhichBreakSystem,
    }

    return "ston \n5; Gcl ; 5; \nc4 5; " + intermediateStringForm.reduce(
        (inputSentence, { nominalString, whorlString, sagitypeString }: Record<any, string>): Io & Sentence => {
            return inputSentence +
                computeNominalPart(nominalString, notationState) +
                computeSagittalPart(sagitypeString) +
                computeWhorlPart(whorlString) +
                "nt ; " as Io & Sentence
        },
        "" as Io & Sentence
    ) + "\n3; en; bl \nnl; " as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
