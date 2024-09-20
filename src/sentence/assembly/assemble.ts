import { Count, Sentence, Io, Index } from "@sagittal/general"
import { EdoStep, Nominal } from "@sagittal/system"
import { Stave } from "../types"
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
import { DiagramStep } from "../hydration"
import { computeStaveBreakClause } from "./break"

const assembleAsStaffCodeInputSentence = (
    diagramSteps: DiagramStep[],
    { isExtraLargeEdo }: { isExtraLargeEdo: boolean },
): Io & Sentence => {
    const assemblyState: AssemblyState = {
        currentNominal: Nominal.C,
        stepCount: 0 as Count<EdoStep>,
        reachedC5: false,
        currentStave: 0 as Index<Stave>,
    }

    return (`${ACTIVATE_STAFF}${CLEF}${assemblyState.currentNominal}${EARLIER_NOMINALS_OCTAVE} ` +
        diagramSteps.reduce(
            (
                inputSentence: Io & Sentence,
                {
                    nominal,
                    whorlCodewords,
                    sagittalCodewords,
                    lefthandSpacing,
                    subsetExcluded = false,
                    staveIndex,
                    situationReC4,
                }: DiagramStep,
            ): Io & Sentence => {
                const startingNewStave: boolean =
                    staveIndex > assemblyState.currentStave

                return (inputSentence +
                    computeStaveBreakClause(startingNewStave, {
                        assemblyState,
                        staveIndex,
                    }) +
                    computeBarClause({
                        sagittalCodewords,
                        whorlCodewords,
                        assemblyState,
                        startingNewStave,
                        isExtraLargeEdo,
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
