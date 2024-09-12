import { Count, Sentence, Io, Index } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { Note, Stave } from "../types"
import { computeBarClause } from "./bar"
import { computeNominalClause } from "./nominal"
import {
    ACTIVATE_STAFF,
    CLEF,
    EARLIER_NOMINALS_OCTAVE,
    FINAL_BARLINE,
} from "./constants"
import { computeLefthandSpacingClause } from "./spacing"
import { computeSagittalClause } from "./sagittal"
import { computeNoteAndRighthandSpaceClause } from "./note"
import { computeWhorlClause } from "./whorl"
import { AssemblyState } from "./types"
import { EdoStepNotation } from "../hydration"
import { computeStaveBreakClause } from "./break"

const assembleAsStaffCodeInputSentence = (
    alignedEdoStepNotations: EdoStepNotation[],
): Io & Sentence => {
    const assemblyState: AssemblyState = {
        currentNominal: Nominal.C,
        noteCount: 0 as Count<Note>,
        reachedC5: false,
        currentStave: 0 as Index<Stave>,
    }

    return (`${ACTIVATE_STAFF}${CLEF}${assemblyState.currentNominal}${EARLIER_NOMINALS_OCTAVE} ` +
        alignedEdoStepNotations.reduce(
            (
                inputSentenceMaterialFromThisStave: Io & Sentence,
                {
                    nominal,
                    whorlCodewords,
                    sagittalCodewords,
                    lefthandSpacing,
                    subsetExcluded = false,
                    staveIndex,
                    situationReC4,
                }: EdoStepNotation,
            ): Io & Sentence => {
                const startingNewStave: boolean =
                    staveIndex > assemblyState.currentStave

                return (inputSentenceMaterialFromThisStave +
                    computeStaveBreakClause(startingNewStave, {
                        assemblyState,
                        staveIndex,
                    }) +
                    computeBarClause({
                        sagittalCodewords,
                        whorlCodewords,
                        assemblyState,
                        startingNewStave,
                    }) +
                    computeNominalClause(nominal, {
                        assemblyState,
                        subsetExcluded,
                    }) +
                    computeLefthandSpacingClause(lefthandSpacing, {
                        situationReC4,
                    }) +
                    computeSagittalClause(sagittalCodewords, {
                        subsetExcluded,
                    }) +
                    computeWhorlClause(whorlCodewords, { subsetExcluded }) +
                    computeNoteAndRighthandSpaceClause({
                        assemblyState,
                        subsetExcluded,
                        situationReC4,
                    })) as Io & Sentence
            },
            "" as Io & Sentence,
        ) +
        FINAL_BARLINE) as Io & Sentence
}

export { assembleAsStaffCodeInputSentence }
