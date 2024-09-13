import { Octals } from "staff-code"
import { Index, Maybe } from "@sagittal/general"
import { EdoStep, Nominal } from "@sagittal/system"
import { Stave } from "../../types"
import {
    EdoStepNotationCodewords,
    EdoStepNotation,
    StepCountsByStave,
} from "../types"
import { computeLefthandSpacing } from "./spacing"
import { computeSituationReC4 } from "./c4"

const zipEdoStepNotationPropertiesAndComputeLefthandSpacing = ({
    stepCountsByStave,
    edoStepNotationCodewordsList,
    edoStepNotationWidths,
    edoStepNotationNominals,
    edoStepNotationSubsetExclusions,
    edoStepNotationStaveIndices,
    edoStepNotationAreC4s,
}: {
    stepCountsByStave: StepCountsByStave
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
                stepCountsByStave,
            }),
            situationReC4: computeSituationReC4({
                edoStepNotationAreC4s,
                edoStep: step as EdoStep,
                stepCountsByStave,
            }),
        }),
    )

export { zipEdoStepNotationPropertiesAndComputeLefthandSpacing }
