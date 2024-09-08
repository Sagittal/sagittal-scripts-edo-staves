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

interface IntermediateFormBase { 
    nominal: Nominal,
    sagittalCodewords: (Code & Word)[],
    whorlCodewords: (Code & Word)[],
    subsetExcluded?: boolean,
}

interface IntermediateFormWithSimpleWidth extends IntermediateFormBase {
    width: Octals,
}

interface IntermediateForm extends IntermediateFormBase {
    lefthandSpacingForAlignment: Octals,
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
