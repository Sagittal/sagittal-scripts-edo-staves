import { Count, Sentence, Io, Index, Column } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { Note, Stave } from "../types"
import { computeBarClause } from "./bar"
import { computeNominalClause } from "./nominal"
import { ACTIVATE_STAFF, CLEF, EARLIER_NOMINALS_OCTAVE, FINAL_BARLINE, STAVE_BREAK } from "./constants"
import { computeLefthandSpacingClause } from "./space"
import { computeSagittalClause } from "./sagittal"
import { computeNoteAndRighthandSpaceClause } from "./note"
import { computeWhorlClause } from "./whorl"
import { NotationState } from "./types"
import { PatternedIntermediateForms } from "../resolve"
import { IntermediateForm } from "../resolve/types"
import { computeStaveBreakClause } from "./break"

const computeInitialNotationState = (root: Nominal): NotationState => ({
    currentNominal: root,
    noteCount: 0 as Count<Note>,
    reachedC: false
})

const assembleAsStaffCodeInputSentence = (patternedIntermediateForms: PatternedIntermediateForms, { root }: { root: Nominal }): Io & Sentence => {
    const notationState: NotationState = computeInitialNotationState(root)

    return `${ACTIVATE_STAFF}${CLEF}${root}${EARLIER_NOMINALS_OCTAVE} ` + patternedIntermediateForms.reduce(
        (inputSentence: Io & Sentence, patternedIntermediateFormStave: IntermediateForm[], staveIndex: number): Io & Sentence =>
            inputSentence +
            computeStaveBreakClause(staveIndex as Index<Stave>, { notationState }) +
            patternedIntermediateFormStave.reduce(
                (
                    inputSentenceMaterialFromThisStave: Io & Sentence,
                    { nominal, whorlCodewords, sagittalCodewords, lefthandSpacingForAlignment }: IntermediateForm,
                    columnIndex: number,
                ): Io & Sentence =>
                    inputSentenceMaterialFromThisStave +
                    computeBarClause({ sagittalCodewords, whorlCodewords, notationState, columnIndex: columnIndex as Index<Column> }) +
                    computeNominalClause(nominal, { notationState }) +
                    computeLefthandSpacingClause(lefthandSpacingForAlignment) +
                    computeSagittalClause(sagittalCodewords) +
                    computeWhorlClause(whorlCodewords) +
                    computeNoteAndRighthandSpaceClause({ notationState }) as Io & Sentence,
                "" as Io & Sentence
            ) as Io & Sentence,
        "" as Io & Sentence
    ) + FINAL_BARLINE as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
