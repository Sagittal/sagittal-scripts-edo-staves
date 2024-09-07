import { Code, Octals } from "staff-code"
import { Clause, Count, Word, Max, Index, Decimal, Sentence, Io } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { AlignedColumn, IntermediateForm, NotationState, Note, NoteCountByStavePattern } from "./types"

const computeNominalCodeword = (notationState: NotationState): Code & Word =>
    `${notationState.currentNominal}${notationState.reachedC ? 5 : 4}` as Code & Word

const computeNominalClause = (
    nominal: Nominal,
    { notationState }: { notationState: NotationState }
): Code & Clause => {
    if (nominal !== notationState.currentNominal) {
        notationState.currentNominal = nominal
        if (notationState.currentNominal === Nominal.C) notationState.reachedC = true

        return `\n${computeNominalCodeword(notationState)} ` as Code & Clause
    }

    return "" as Code & Clause
}

const computeSagittalClause = (sagitypeCodewords: (Code & Word)[]): Code & Clause =>
    sagitypeCodewords.length === 0 ?
        "" as Code & Clause :
        sagitypeCodewords.reduce((acc: string, str: string) => acc + `${str}; `, "") as Code & Clause  // TODO: variable name improve

const computeWhorlClause = (whorlCodewords: (Code & Word)[]): Code & Clause =>
    whorlCodewords.length === 0 ?
        "" as Code & Clause :
        `${whorlCodewords[0]}; ` as Code & Clause

// const computeNoteClause = (
//     { sagitypeCodewords, whorlCodewords, notationState, noteCountByStavePattern }: {
//         sagitypeCodewords: (Code & Word)[],
//         whorlCodewords: (Code & Word)[],
//         notationState: NotationState,
//         noteCountByStavePattern: NoteCountByStavePattern,
//     }
// ): Code & Clause => {
//     const notePart: Code & Clause =
//         computeTimeToBreakStaves(notationState.noteCount, noteCountByStavePattern) ?
//             // `en; bl nl; 5; Gcl; ${computeNominalCodeword(notationState)} 15; nt;` as Code & Clause :
//             `en; bl nl; 5; Gcl; 15; nt;` as Code & Clause :
//             sagitypeCodewords.length === 0 && whorlCodewords.length === 0 && notationState.noteCount !== 0 ?
//                 "bl 9; nt ; " as Code & Clause :
//                 "nt ; " as Code & Clause

//     notationState.noteCount++

//     return notePart
// }

const computeNoteClause = (
    {  notationState }: {
        // sagitypeCodewords: (Code & Word)[],
        // whorlCodewords: (Code & Word)[],
        notationState: NotationState,
        // noteCountByStavePattern: NoteCountByStavePattern,
    }
): Code & Clause => {
    // const notePart: Code & Clause =
    //         // `en; bl nl; 5; Gcl; ${computeNominalCodeword(notationState)} 15; nt;` as Code & Clause :
    //         `en; bl nl; 5; Gcl; 15; nt;` as Code & Clause :
    //         sagitypeCodewords.length === 0 && whorlCodewords.length === 0 && notationState.noteCount !== 0 ?
    //             "bl 9; nt ; " as Code & Clause :
    //             "nt ; " as Code & Clause

    notationState.noteCount++

    // return notePart
    return "nt; 5; " as Code & Clause
}

const computeBreakAndOrBarClause = (
    { sagitypeCodewords, whorlCodewords, notationState, noteCountByStavePattern }: {
        sagitypeCodewords: (Code & Word)[],
        whorlCodewords: (Code & Word)[],
        notationState: NotationState,
        noteCountByStavePattern: NoteCountByStavePattern,
    }
) => {
    // const notePart: Code & Clause =
   return computeTimeToBreakStaves(notationState.noteCount, noteCountByStavePattern) ?
            // `en; bl nl; 5; Gcl; ${computeNominalCodeword(notationState)} 15; nt;` as Code & Clause :
            `en; bl nl;\n5; Gcl; 15; ${computeNominalCodeword(notationState)} ` as Code & Clause :
            sagitypeCodewords.length === 0 && whorlCodewords.length === 0 && notationState.noteCount !== 0 ?
                "en; bl 9; " as Code & Clause :
                "" as Code & Clause


    // return notePart
}

const computeTimeToBreakStaves = (noteCount: Count<Note>, noteCountByStavePattern: NoteCountByStavePattern): boolean => {
    let timeToBreakStaves: boolean = false
    let cursor: Index<AlignedColumn> = 0 as Index<AlignedColumn>
    noteCountByStavePattern.forEach((staveNoteCount: Count<Note>): void => {
        cursor = cursor + staveNoteCount as Index<AlignedColumn>

        if (noteCount === cursor as Decimal<{ integer: true }> as Count<Note>) timeToBreakStaves = true
    })

    return timeToBreakStaves
}

const getColumnIndex = (noteCount: Count<Note>, noteCountByStavePattern: NoteCountByStavePattern): Index<AlignedColumn> => {
    let columnIndex: Index<AlignedColumn> = 0 as Index<AlignedColumn>

    let cursor: Index<AlignedColumn> = noteCount as Decimal<{ integer: true }> as Index<AlignedColumn>

    noteCountByStavePattern.forEach((staveNoteCount: Count<Note>): void => {
        if (columnIndex) return

        if (staveNoteCount <= cursor) {
            cursor = cursor - staveNoteCount as Decimal<{ integer: true }> as Index<AlignedColumn>
        } else {
            columnIndex = cursor
        }
    })

    return columnIndex
}

const getColumnWidth = ({ columnWidths, noteCountByStavePattern, notationState }: {
    columnWidths: Max<Octals>[],
    noteCountByStavePattern: NoteCountByStavePattern,
    notationState: NotationState,
}): Octals =>
    columnWidths[getColumnIndex(notationState.noteCount, noteCountByStavePattern)] as Octals

const computeWidthPart = (
    { columnWidths, noteCountByStavePattern, notationState }: {
        columnWidths: Max<Octals>[],
        noteCountByStavePattern: NoteCountByStavePattern,
        notationState: NotationState,
    }
) =>
    `${getColumnWidth({ columnWidths, noteCountByStavePattern, notationState }) + 5}; ` // TODO: extract magic constant, what is this, like a buffer?

const assembleAsStaffCodeInputSentence = (
    intermediateForms: IntermediateForm[],
    { root, columnWidths, noteCountByStavePattern }: {
        root: Nominal,
        columnWidths: Max<Octals>[],
        noteCountByStavePattern: NoteCountByStavePattern,
    }): Io & Sentence => {
    const notationState: NotationState = {
        currentNominal: root,
        noteCount: 0 as Count<Note>,
        reachedC: false
    }

    return `ston\n5; Gcl; 15;\n${root}4 ` + intermediateForms.reduce( // TODO: exttract the Gcl bit and the other one to helper functions
        (inputClause, { nominal, whorlCodewords, sagitypeCodewords }: IntermediateForm): Io & Sentence =>
            inputClause +
            computeBreakAndOrBarClause({ sagitypeCodewords, whorlCodewords, noteCountByStavePattern, notationState}) +
            computeNominalClause(nominal, { notationState }) +
            computeWidthPart({ columnWidths, noteCountByStavePattern, notationState }) +
            computeSagittalClause(sagitypeCodewords) +
            computeWhorlClause(whorlCodewords) +
            computeNoteClause({ notationState }) as Io & Sentence,
        "" as Io & Sentence
    ) + "\nen; blfn" as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
