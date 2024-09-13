import { Octals } from "staff-code"
import { Index, Decimal, Max } from "@sagittal/general"
import {
    Edo,
    EdoStep,
    Flavor,
    Nominal,
    Sagittal,
    SubsetFactor,
} from "@sagittal/system"
import { Stave } from "../../types"
import { EdoStepNotationIndices } from "../../chaining"
import {
    StepCountsByStave,
    HydrationState,
    EdoStepNotationCodewords,
} from "../types"
import { extractEdoStepNotationParameters } from "./extract"

const gatherEdoStepNotationParameters = (
    edoStepNotationIndices: EdoStepNotationIndices,
    {
        sagittals,
        flavor,
        subsetFactor,
        hydrationState,
        maxStaveIndex,
        stepCountsByStave,
        sharpStep,
        edo,
    }: {
        sagittals: Sagittal[]
        flavor: Flavor
        subsetFactor?: SubsetFactor
        hydrationState: HydrationState
        maxStaveIndex: Max<Index<Stave>>
        stepCountsByStave: StepCountsByStave
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
        codewords: EdoStepNotationCodewords
        width: Octals
        nominal: Nominal
        subsetExcluded?: boolean
        isC: boolean
    } = extractEdoStepNotationParameters(edoStepNotationIndices, {
        step: hydrationState.step,
        sagittals,
        flavor,
        subsetFactor,
        sharpStep,
        edo,
    })
    hydrationState.edoStepNotationCodewordsList.push(codewords)
    hydrationState.edoStepNotationWidths.push(width)
    hydrationState.edoStepNotationNominals.push(nominal)
    hydrationState.edoStepNotationSubsetExclusions.push(subsetExcluded)
    hydrationState.edoStepNotationStaveIndices.push(hydrationState.staveIndex)
    hydrationState.edoStepNotationAreC4s.push(isC)

    hydrationState.stepInStaveIndex++
    hydrationState.step++

    if (
        hydrationState.staveIndex < maxStaveIndex &&
        hydrationState.stepInStaveIndex ===
            (stepCountsByStave[hydrationState.staveIndex] as Decimal<{
                integer: true
            }> as Index<EdoStep>)
    ) {
        hydrationState.staveIndex++
        hydrationState.stepInStaveIndex = 0 as Index<EdoStep>
    }
}

export { gatherEdoStepNotationParameters }
