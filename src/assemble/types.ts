import { Count } from "@sagittal/general"
import { Note } from "../types"
import { Nominal } from "@sagittal/system"

type AlignedColumn = { _AlignedColumnBrand: boolean }
type Octave = { _OctaveBrand: boolean }

interface NotationState {
    noteCount: Count<Note>,
    currentNominal: Nominal,
    reachedC: boolean
}

export {
    AlignedColumn,
    Octave,
    NotationState,
}
