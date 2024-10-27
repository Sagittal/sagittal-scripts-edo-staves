import { Octals } from "staff-code"
import { EdoStep, Index, Maybe } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { Stave } from "../../types"
import { Codewords, DiagramStep, Folding } from "../types"
import { computeLefthandSpacing } from "./spacing"
import { computeSituationReC4 } from "./c4"

const computeDiagramStepsFromGatheredParameters = ({
    folding,
    codewordsList,
    widths,
    nominals,
    subsetExclusions,
    staveIndices,
    areC4s,
}: {
    folding: Folding
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
                folding,
            }),
            situationReC4: computeSituationReC4({
                areC4s,
                edoStep: step as EdoStep,
                folding,
            }),
        }),
    )

export { computeDiagramStepsFromGatheredParameters }
