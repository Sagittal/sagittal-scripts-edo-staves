import { Index, Max } from "@sagittal/general"
import {
    Edo,
    EdoStep,
    Flavor,
    Sagittal,
    Spelling,
    SubsetFactor,
} from "@sagittal/system"
import { Stave } from "../types"
import { Folding, HydrationState, DiagramStep } from "./types"
import { computeFolding } from "./folding"
import { computeDiagramStepsFromGatheredParameters } from "./zip"
import { gatherDiagramStepParameters } from "./extractAndGather"

const computeDiagramSteps = (
    spellings: Spelling[],
    {
        sagittals,
        flavor,
        subsetFactor,
        edo,
        fifthStep,
        sharpStep,
        limmaStep,
        isExtraLargeEdo,
    }: {
        sagittals: Sagittal[]
        flavor: Flavor
        subsetFactor?: SubsetFactor
        edo: Edo
        fifthStep: EdoStep
        sharpStep: EdoStep
        limmaStep: EdoStep
        isExtraLargeEdo: boolean
    },
): DiagramStep[] => {
    const folding: Folding = computeFolding({
        edo,
        fifthStep,
        limmaStep,
        isExtraLargeEdo,
    })

    const maxStaveIndex: Max<Index<Stave>> = (folding.length - 1) as Max<
        Index<Stave>
    >

    const hydrationState: HydrationState = {
        stepInStaveIndex: 0 as Index<EdoStep>,
        staveIndex: 0 as Index<Stave>,
        step: 0 as EdoStep,
        codewordsList: [],
        widths: [],
        nominals: [],
        subsetExclusions: [],
        staveIndices: [],
        areC4s: [],
    }

    spellings.forEach((spelling: Spelling): void => {
        gatherDiagramStepParameters(spelling, {
            sagittals,
            flavor,
            subsetFactor,
            hydrationState,
            maxStaveIndex,
            folding,
            sharpStep,
            edo,
        })
    })

    return computeDiagramStepsFromGatheredParameters({
        folding,
        codewordsList: hydrationState.codewordsList,
        widths: hydrationState.widths,
        nominals: hydrationState.nominals,
        subsetExclusions: hydrationState.subsetExclusions,
        staveIndices: hydrationState.staveIndices,
        areC4s: hydrationState.areC4s,
    })
}

export { computeDiagramSteps }
