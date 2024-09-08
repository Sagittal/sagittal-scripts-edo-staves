import { Count, Word } from "@sagittal/general"
import { Note } from "../types"
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

type NoteCountByStavePattern = Count<Note>[]

interface IntermediateFormWithSimpleWidth {
    nominal: Nominal,
    sagittalCodewords: (Code & Word)[],
    whorlCodewords: (Code & Word)[],
    width: Octals,
    subsetExcluded?: boolean,
}

// TODO: clean up these types, having them extend a shared base
interface IntermediateForm {
    nominal: Nominal,
    sagittalCodewords: (Code & Word)[],
    whorlCodewords: (Code & Word)[],
    lefthandSpacingForAlignment: Octals,
    subsetExcluded?: boolean, 
}

type PatternedIntermediateForms = IntermediateForm[][]

export {
    EdoSizeCategory,
    NoteCountParametersByStave,
    NoteCountByStavePattern,
    WholeTone,
    Limma,
    IntermediateForm,
    PatternedIntermediateForms,
    IntermediateFormWithSimpleWidth,
}
