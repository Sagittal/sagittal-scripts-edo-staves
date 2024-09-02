import { computeCodeWordWidth } from "staff-code"
import { Io, Sentence, Count } from "@sagittal/general"
import { Nominal } from "../../../system/src/notations/edo/types"

const NOTES_PER_SYSTEM: Count = 27 as Count

const computeNominalStaffCode = (
    notationState: { noteCount: Count, noteCountPastWhichBreakSystem: Count, currentNominal: Io, reachedC: boolean }
): string => {
    return `${notationState.currentNominal}${notationState.reachedC ? 5 : 4}`
}

const computeNominalPart = (
    nominalString: string,
    { notationState }: {
        notationState: { noteCount: Count, noteCountPastWhichBreakSystem: Count, currentNominal: Io, reachedC: boolean }
    }
): Io & Sentence => {
    let nominalPart = "" as Io & Sentence

    if (nominalString != notationState.currentNominal) {
        notationState.currentNominal = nominalString
        if (notationState.currentNominal == Nominal.C) notationState.reachedC = true

        nominalPart = nominalPart + `${computeNominalStaffCode(notationState)} ` as Io & Sentence
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
    whorlString.length ?
        `${whorlString} ; ` as Io & Sentence :
        "" as Io & Sentence

const computeNotePart = (
    { sagitypeString, whorlString, notationState }: {
        sagitypeString: string,
        whorlString: string,
        notationState: { noteCount: Count, noteCountPastWhichBreakSystem: Count, currentNominal: Io, reachedC: boolean }
    }
): Io & Sentence => {
    let notePart: Io & Sentence

    if (!sagitypeString.length && !whorlString.length && notationState.noteCount != 0) {
        if (notationState.noteCount > notationState.noteCountPastWhichBreakSystem) {
            notationState.noteCountPastWhichBreakSystem = notationState.noteCountPastWhichBreakSystem + NOTES_PER_SYSTEM as Count
            notePart = `en; bl nl; \n5; Gcl ${computeNominalStaffCode(notationState)} ; 20; nt ;` as Io & Sentence
        } else {
            notePart = "\nbl 9; nt ; " as Io & Sentence
        }
    } else {
        notePart = "nt ; " as Io & Sentence
    }

    notationState.noteCount++

    return notePart
}

const assembleAsStaffCodeInputSentence = (intermediateStringForm: Record<any, string>[], { root }: { root: Nominal }): Io & Sentence => {
    const notationState = {
        currentNominal: root,
        noteCount: 0 as Count,
        noteCountPastWhichBreakSystem: NOTES_PER_SYSTEM,
        reachedC: false
    }

    return `ston \n5; Gcl ; 5; \n${root}4 5; ` + intermediateStringForm.reduce(
        (inputSentence, { nominalString, whorlString, sagitypeString }: Record<any, string>): Io & Sentence => {
            // TODO: clean up. this was just a proof of concept to see if we can get this info
            // sagitypeString.length && console.log("sagitypeString: ", sagitypeString, " width: ", computeCodeWordWidth(sagitypeString))
            return inputSentence +
                computeNominalPart(nominalString, { notationState }) +
                computeSagittalPart(sagitypeString) +
                computeWhorlPart(whorlString) +
                computeNotePart({ sagitypeString, whorlString, notationState }) as Io & Sentence
        },
        "" as Io & Sentence
    ) + "\n8; en; blfn \nnl; " as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
