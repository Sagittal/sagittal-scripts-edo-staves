import { Count, Index, Word } from "@sagittal/general"
import { Note, Stave } from "../types"
import { Nominal } from "@sagittal/system"
import { Code, Octals } from "staff-code"

type WholeTone = { _WholeToneBrand: boolean }
type Limma = { _LimmaBrand: boolean }

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

type Alignment = Count<Note>[]

interface HydratedEdoStepNotationBase {
    nominal: Nominal,
    sagittalCodewords: (Code & Word)[],
    whorlCodewords: (Code & Word)[],
    subsetExcluded?: boolean,
}

interface PartiallyHydratedEdoStepNotation extends HydratedEdoStepNotationBase {
    width: Octals,
}

interface HydratedEdoStepNotation extends HydratedEdoStepNotationBase {
    lefthandSpacing: Octals,
}

interface AlignmentState {
    noteInStaveIndex: Index<Note>,
    staveIndex: Index<Stave>,
    noteIndex: Index<Note>,
}

export {
    EdoSizeCategory,
    NoteCountParametersByStave,
    Alignment,
    WholeTone,
    Limma,
    HydratedEdoStepNotation,
    PartiallyHydratedEdoStepNotation,
    AlignmentState,
}
