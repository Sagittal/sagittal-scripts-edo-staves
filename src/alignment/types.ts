import { Count } from "@sagittal/general"
import { Note } from "../types"

type WholeTone = { _WholeToneBrand: boolean }
type Limma = { _LimmaBrand: boolean }
type Stave = { _StaveBrand: boolean }

enum EdoSizeCategory {
    SMALL = "small",
    SMALL_MEDIUM = "small medium",
    MEDIUM = "medium",
    LARGE_MEDIUM = "large medium",
    LARGE = "large",
}

interface NoteCountParametersByStave {
    wholeToneCount: Count<WholeTone>,
    limmaCount: Count<Limma>
}

type NoteCountByStavePattern = Count<Note>[]

export {
    EdoSizeCategory,
    NoteCountParametersByStave,
    NoteCountByStavePattern,
    WholeTone,
    Limma,
    Stave,
}
