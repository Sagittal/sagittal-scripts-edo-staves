import { Octals } from "staff-code"
import { Index, Maybe } from "@sagittal/general"
import { EdoStep, Nominal } from "@sagittal/system"
import { Stave } from "../../types"
import { Codewords, DiagramStep, StepCountsByStave } from "../types"
import { computeLefthandSpacing } from "./spacing"
import { computeSituationReC4 } from "./c4"

const computeDiagramStepsFromGatheredParameters = ({
    stepCountsByStave,
    codewordsList,
    widths,
    nominals,
    subsetExclusions,
    staveIndices,
    areC4s,
}: {
    stepCountsByStave: StepCountsByStave
    codewordsList: Codewords[]
    widths: Octals[]
    subsetExclusions: Maybe<boolean>[]
    nominals: Nominal[]
    staveIndices: Index<Stave>[]
    areC4s: boolean[]
}): DiagramStep[] =>
    codewordsList.map(
        (codewords: Codewords, step: number): DiagramStep => ({
            ...codewords,
            nominal: nominals[step],
            subsetExcluded: subsetExclusions[step],
            staveIndex: staveIndices[step],
            lefthandSpacing: computeLefthandSpacing({
                widths,
                step: step as EdoStep,
                stepCountsByStave,
            }),
            situationReC4: computeSituationReC4({
                areC4s,
                edoStep: step as EdoStep,
                stepCountsByStave,
            }),
        }),
    )

export { computeDiagramStepsFromGatheredParameters }
