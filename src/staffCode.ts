import { Io, Sentence, Count } from "@sagittal/general"
import { Nominal } from "@sagittal/system"

const computeNominalStaffCode = (
    notationState: { noteCount: Count, currentNominal: Io, reachedC: boolean }
): string => {
    return `${notationState.currentNominal}${notationState.reachedC ? 5 : 4}`
}

const computeNominalPart = (
    nominalString: string,
    { notationState }: {
        notationState: { noteCount: Count, currentNominal: Io, reachedC: boolean }
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
    sagitypeString.length ? // TODO: better for these to check explicitly for 0
        `${handleDiacritics(sagitypeString)} ; ` as Io & Sentence :
        "" as Io & Sentence

const computeWhorlPart = (whorlString: string): Io & Sentence =>
    whorlString.length ?
        `${whorlString} ; ` as Io & Sentence :
        "" as Io & Sentence

const computeNotePart = (
    { sagitypeString, whorlString, notationState, noteCountByStavePattern }: {
        sagitypeString: string,
        whorlString: string,
        notationState: { noteCount: Count, currentNominal: Io, reachedC: boolean },
        noteCountByStavePattern: number[],
    }
): Io & Sentence => {
    let notePart: Io & Sentence

    // if (sagitypeString.length == 0 && whorlString.length == 0 && notationState.noteCount != 0) {
    // if (true) {
    if (timeToBreak(notationState.noteCount, noteCountByStavePattern)) {

        // TODO make sure this aligns w the first one
        // 5; Gcl ; 5; \n${root}4 5; 
        notePart = `en; bl nl; \n5; Gcl ${computeNominalStaffCode(notationState)} ; 15; nt ;` as Io & Sentence
    } else if (sagitypeString.length == 0 && whorlString.length == 0 && notationState.noteCount != 0) {
        notePart = "\nbl 9; nt ; " as Io & Sentence
    } else {
        notePart = "nt ; " as Io & Sentence
    }

    notationState.noteCount++

    return notePart
}

const timeToBreak = (noteCount, noteCountByStavePattern) => {
    let answer
    let thing = 0
    noteCountByStavePattern.forEach(line => {
        // if (answer) return
        thing += line

        if (noteCount == thing) answer = true
        // if (line < thing) {
        //     thing -= line
        // } else if (line == thing) {
        //     answer = true
        // } else {
        //     answer = false
        // }
    })
    // if (answer) console.log("dsad", noteCount, noteCountByStavePattern, thing)
    return answer
}

const getCol = (noteCount, noteCountByStavePattern) => {
    let answer
    let thing = noteCount
    noteCountByStavePattern.forEach(line => {
        if (line <= thing) {
            thing -= line
        } else {
            answer = thing
        }
    })
    return answer
}

const computeWidthPart = ({ colWidths, noteCountByStavePattern, notationState }) => {
    const col = getCol(notationState.noteCount, noteCountByStavePattern)
    // console.log("col: ", col)
    const width = colWidths[col]

    return `${width + 5}; `
}

const assembleAsStaffCodeInputSentence = (intermediateStringForm: Record<any, string>[], { root, colWidths, noteCountByStavePattern }: { root: Nominal, colWidths: number[], noteCountByStavePattern: number[] }): Io & Sentence => {
    const notationState = {
        currentNominal: root,
        noteCount: 0 as Count,
        // currentLine: NOTES_PER_SYSTEM,
        reachedC: false
    }

    return `ston \n5; Gcl ; 5; \n${root}4 5; ` + intermediateStringForm.reduce(
        (inputSentence, { nominalString, whorlString, sagitypeString }: Record<any, string>): Io & Sentence =>
            inputSentence +
            computeNominalPart(nominalString, { notationState }) +
            computeWidthPart({ colWidths, noteCountByStavePattern, notationState }) +
            computeSagittalPart(sagitypeString) +
            computeWhorlPart(whorlString) +
            computeNotePart({ sagitypeString, whorlString, notationState, noteCountByStavePattern }) as Io & Sentence,
        "" as Io & Sentence
    ) + "\n8; en; blfn \nnl; " as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
