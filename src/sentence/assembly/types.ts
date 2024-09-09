import { Count, Index } from "@sagittal/general"
import { Note, Stave } from "../types"
import { Nominal } from "@sagittal/system"

type Octave = { _OctaveBrand: boolean }

interface AssemblyState {
    noteCount: Count<Note>,
    currentNominal: Nominal,
    reachedC: boolean
    currentStave: Index<Stave>,
}

export {
    Octave,
    AssemblyState,
}
