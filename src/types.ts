import { Code } from "staff-code"
import { Count, Word } from "@sagittal/general"
import { Nominal } from "@sagittal/system"

type Note = { _NoteBrand: boolean }
type WholeTone = { _WholeToneBrand: boolean }
type Limma = { _LimmaBrand: boolean }
type Stave = { _StaveBrand: boolean }
type AlignedColumn = { _AlignedColumnBrand: boolean }

type NoteCountByStavePattern = Count<Note>[]

interface NoteCountParametersByStave {
    wholeToneCount: Count<WholeTone>,
    limmaCount: Count<Limma>
}

// TODO: consider creating another nested folder for the alignment stuff

enum EdoSizeCategory {
    SMALL = "small",
    SMALL_MEDIUM = "small medium",
    MEDIUM = "medium",
    LARGE_MEDIUM = "large medium",
    LARGE = "large",
}

interface IntermediateForm {
    nominal: Nominal,
    sagitypeCodewords: (Code & Word)[],
    whorlCodewords: (Code & Word)[]
}

interface NotationState {
    noteCount: Count<Note>,
    currentNominal: Nominal,
    reachedC: boolean
}

export {
    Note,
    NoteCountByStavePattern,
    WholeTone,
    Limma,
    NoteCountParametersByStave,
    EdoSizeCategory,
    IntermediateForm,
    Stave,
    NotationState,
    AlignedColumn,
}
