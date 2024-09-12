import { Octals } from "staff-code"
import { Index, Maybe } from "@sagittal/general"
import { EdoStep, Nominal } from "@sagittal/system"
import { Stave } from "../../types"
import {
    EdoStepNotationCodewords,
    EdoStepNotation,
    NoteCountsByStave,
} from "../types"
import { computeLefthandSpacing } from "./spacing"
import { computeSituationReC4 } from "./alignedWithC"

const zipEdoStepNotationPropertiesAndComputeLefthandSpacing = ({
    noteCountsByStave,
    edoStepNotationCodewordsList,
    edoStepNotationWidths,
    edoStepNotationNominals,
    edoStepNotationSubsetExclusions,
    edoStepNotationStaveIndices,
    edoStepNotationAreC4s,
}: {
    noteCountsByStave: NoteCountsByStave
    edoStepNotationCodewordsList: EdoStepNotationCodewords[]
    edoStepNotationWidths: Octals[]
    edoStepNotationSubsetExclusions: Maybe<boolean>[]
    edoStepNotationNominals: Nominal[]
    edoStepNotationStaveIndices: Index<Stave>[]
    edoStepNotationAreC4s: boolean[]
}): EdoStepNotation[] =>
    edoStepNotationCodewordsList.map(
        (
            edoStepNotationCodewords: EdoStepNotationCodewords,
            step: number,
        ): EdoStepNotation => ({
            ...edoStepNotationCodewords,
            nominal: edoStepNotationNominals[step],
            subsetExcluded: edoStepNotationSubsetExclusions[step],
            staveIndex: edoStepNotationStaveIndices[step],
            lefthandSpacing: computeLefthandSpacing({
                edoStepNotationWidths,
                step: step as EdoStep,
                noteCountsByStave,
            }),
            situationReC4: computeSituationReC4({
                edoStepNotationAreC4s,
                edoStep: step as EdoStep,
                noteCountsByStave,
            }),
        }),
    )

export { zipEdoStepNotationPropertiesAndComputeLefthandSpacing }
