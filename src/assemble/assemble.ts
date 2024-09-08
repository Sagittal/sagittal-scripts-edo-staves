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
import { HydratedEdoStepNotation } from "../alignAndHydrate/types"
import { computeStaveBreakClause } from "./break"

const assembleAsStaffCodeInputSentence = (alignedHydratedEdoStepNotations: HydratedEdoStepNotation[][]): Io & Sentence => {
    const notationState: NotationState = {
        currentNominal: Nominal.C,
        noteCount: 0 as Count<Note>,
        reachedC: false
    }

    return `${ACTIVATE_STAFF}${CLEF}${notationState.currentNominal}${EARLIER_NOMINALS_OCTAVE} ` + alignedHydratedEdoStepNotations.reduce(
        (inputSentence: Io & Sentence, alignedHydratedEdoStepNotationStave: HydratedEdoStepNotation[], staveIndex: number): Io & Sentence =>
            inputSentence +
            computeStaveBreakClause(staveIndex as Index<Stave>, { notationState }) +
            alignedHydratedEdoStepNotationStave.reduce(
                (
                    inputSentenceMaterialFromThisStave: Io & Sentence,
                    { nominal, whorlCodewords, sagittalCodewords, lefthandSpacing, subsetExcluded = false }: HydratedEdoStepNotation,
                    columnIndex: number,
                ): Io & Sentence =>
                    inputSentenceMaterialFromThisStave +
                    computeBarClause({ sagittalCodewords, whorlCodewords, notationState, columnIndex: columnIndex as Index<Column>, subsetExcluded }) +
                    computeNominalClause(nominal, { notationState, subsetExcluded }) +
                    computeLefthandSpacingClause(lefthandSpacing) +
                    computeSagittalClause(sagittalCodewords, { subsetExcluded }) +
                    computeWhorlClause(whorlCodewords, { subsetExcluded }) +
                    computeNoteAndRighthandSpaceClause({ notationState, subsetExcluded }) as Io & Sentence,
                "" as Io & Sentence
            ) as Io & Sentence,
        "" as Io & Sentence
    ) + FINAL_BARLINE as Io & Sentence
}

export {
    assembleAsStaffCodeInputSentence,
}
