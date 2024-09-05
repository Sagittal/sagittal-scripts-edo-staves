import { Count } from "@sagittal/general"

type Note = { _NoteBrand: boolean }
type WholeTone = { _WholeToneBrand: boolean }
type Limma = { _LimmaBrand: boolean }

type NoteCountByStavePattern = Count<Note>[]

interface NoteCountParametersByStave {
    wholeToneCount: Count<WholeTone>,
    limmaCount: Count<Limma>
}

enum EdoSizeCategory {
    SMALL = "small",
    SMALL_MEDIUM = "small medium",
    MEDIUM = "medium",
    LARGE_MEDIUM = "large medium",
    LARGE = "large",
}

export {
    Note,
    NoteCountByStavePattern,
    WholeTone,
    Limma,
    NoteCountParametersByStave,
    EdoSizeCategory,
}
