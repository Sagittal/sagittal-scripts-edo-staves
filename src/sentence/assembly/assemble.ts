import { Count, Sentence, Io, Index, EdoStep } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { DiagramStep } from "../hydration"
import { Stave } from "../types"
import { computeBarClause } from "./bar"
import { computeStaveBreakClause } from "./break"
import { ACTIVATE_STAFF, CLEF, EARLIER_NOMINALS_OCTAVE, FINAL_BARLINE } from "./constants"
import { computeNominalClause } from "./nominal"
import { computeNoteAndRighthandSpaceClause } from "./note"
import { computeSagittalClause } from "./sagittal"
import { computeLefthandSpacingClause } from "./spacing"
import { AssemblyState } from "./types"
import { computeWhorlClause } from "./whorl"

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
                const startingNewStave: boolean = staveIndex > assemblyState.currentStave

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
