import { Count, EdoStep, Index } from "@sagittal/general"
import { Stave } from "../types"
import { Nominal } from "@sagittal/system"

type Octave = { _OctaveBrand: boolean }

interface AssemblyState {
    stepCount: Count<EdoStep>
    currentNominal: Nominal
    reachedC5: boolean
    currentStave: Index<Stave>
}

export { Octave, AssemblyState }
