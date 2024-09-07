import { Octals } from "staff-code"
import { Count, Max, Sentence, Io } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { IntermediateForm, Note } from "../types"
import { computeBreakAndOrBarClause } from "./breakAndOrBar"
import { computeNominalClause } from "./nominal"
import { ACTIVATE_STAFF, CLEF, EARLIER_NOMINALS_OCTAVE, FINAL_BARLINE } from "./constants"
import { computeLefthandSpaceClause } from "./space"
import { computeSagittalClause } from "./sagittal"
import { computeNoteAndRighthandSpaceClause } from "./note"
import { computeWhorlClause } from "./whorl"
import { NotationState } from "./types"
import { NoteCountByStavePattern } from "../alignment"

const computeInitialNotationState = (root: Nominal): NotationState => ({
    currentNominal: root,
    noteCount: 0 as Count<Note>,
    reachedC: false
})

const assembleAsStaffCodeInputSentence = (
    intermediateForms: IntermediateForm[],
    { root, columnWidths, noteCountByStavePattern }: {
        root: Nominal,
        columnWidths: Max<Octals>[],
        noteCountByStavePattern: NoteCountByStavePattern,
    }): Io & Sentence => {
    const notationState: NotationState = computeInitialNotationState(root)

    return `${ACTIVATE_STAFF}${CLEF}${root}${EARLIER_NOMINALS_OCTAVE} ` + intermediateForms.reduce(
        (inputClause, { nominal, whorlCodewords, sagittalCodewords }: IntermediateForm): Io & Sentence =>
            inputClause +
            computeBreakAndOrBarClause({ sagittalCodewords, whorlCodewords, noteCountByStavePattern, notationState }) +
            computeNominalClause(nominal, { notationState }) +
            computeLefthandSpaceClause({ columnWidths, noteCountByStavePattern, notationState }) +
            computeSagittalClause(sagittalCodewords) +
            computeWhorlClause(whorlCodewords) +
            computeNoteAndRighthandSpaceClause({ notationState }) as Io & Sentence,
        "" as Io & Sentence
    ) + FINAL_BARLINE as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
