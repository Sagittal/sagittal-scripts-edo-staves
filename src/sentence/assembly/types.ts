import { Count, EdoStep, Index } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { Stave } from "../types"

type Octave = { _OctaveBrand: boolean }

interface AssemblyState {
    stepCount: Count<EdoStep>
    currentNominal: Nominal
    reachedC5: boolean
    currentStave: Index<Stave>
}

export { Octave, AssemblyState }
