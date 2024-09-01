import { Io, Sentence, Count } from "@sagittal/general"

const NOTES_PER_SYSTEM: Count = 27 as Count

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

// note: does not yet support Magrathean EDOs
const handleDiacritics = (sagitypeString: string): string => 
    sagitypeString
        .replace(/'/g, "' ; ")
        .replace(/\./g, ". ; ")
        .replace(/``/g, "`` ; ")
        .replace(/,,/g, ",, ; ")
        .replace(/`/g, "` ; ")
        .replace(/,/g, ", ; ")

const computeSagittalPart = (sagitypeString: string): Io & Sentence =>
    sagitypeString.length ?
        `5; ${handleDiacritics(sagitypeString)} ; ` as Io & Sentence :
        "9; " as Io & Sentence


const computeWhorlPart = (whorlString: string): Io & Sentence =>
    `${whorlString} ; ` as Io & Sentence

const assembleAsStaffCodeInputSentence = (intermediateStringForm: Record<any, string>[]): Io & Sentence => {
    const notationState = {
        currentNominal: "c",
        noteCount: 0 as Count,
        noteCountPastWhichBreakSystem: NOTES_PER_SYSTEM,
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
    ) + "\n3; en; blfn \nnl; " as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
