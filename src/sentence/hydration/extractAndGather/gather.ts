import { Octals } from "staff-code"
import { Index, Decimal, Max } from "@sagittal/general"
import {
    Edo,
    EdoStep,
    Flavor,
    Nominal,
    Sagittal,
    Spelling,
    SubsetFactor,
} from "@sagittal/system"
import { Stave } from "../../types"
import { Folding, HydrationState, Codewords } from "../types"
import { extractDiagramStepParameters } from "./extract"

const gatherDiagramStepParameters = (
    spelling: Spelling,
    {
        sagittals,
        flavor,
        subsetFactor,
        hydrationState,
        maxStaveIndex,
        folding,
        sharpStep,
        edo,
    }: {
        sagittals: Sagittal[]
        flavor: Flavor
        subsetFactor?: SubsetFactor
        hydrationState: HydrationState
        maxStaveIndex: Max<Index<Stave>>
        folding: Folding
        sharpStep: EdoStep
        edo: Edo
    },
): void => {
    const {
        codewords,
        width,
        nominal,
        subsetExcluded,
        isC,
    }: {
        codewords: Codewords
        width: Octals
        nominal: Nominal
        subsetExcluded?: boolean
        isC: boolean
    } = extractDiagramStepParameters(spelling, {
        step: hydrationState.step,
        sagittals,
        flavor,
        subsetFactor,
        sharpStep,
        edo,
    })
    hydrationState.codewordsList.push(codewords)
    hydrationState.widths.push(width)
    hydrationState.nominals.push(nominal)
    hydrationState.subsetExclusions.push(subsetExcluded)
    hydrationState.staveIndices.push(hydrationState.staveIndex)
    hydrationState.areC4s.push(isC)

    hydrationState.stepInStaveIndex++
    hydrationState.step++

    if (
        hydrationState.staveIndex < maxStaveIndex &&
        hydrationState.stepInStaveIndex ===
            (folding[hydrationState.staveIndex] as Decimal<{
                integer: true
            }> as Index<EdoStep>)
    ) {
        hydrationState.staveIndex++
        hydrationState.stepInStaveIndex = 0 as Index<EdoStep>
    }
}

export { gatherDiagramStepParameters }
