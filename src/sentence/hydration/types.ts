import { Code, Octals } from "staff-code"
import { Count, Index, Maybe, Word } from "@sagittal/general"
import { EdoStep, Nominal } from "@sagittal/system"
import { Note, Stave } from "../types"

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
    wholeToneCount: Count<WholeTone>
    limmaCount: Count<Limma>
}

type NoteCountsByStave = Count<Note>[]

interface EdoStepNotationCodewords {
    sagittalCodewords: (Code & Word)[]
    whorlCodewords: (Code & Word)[]
}

enum SituationReC4 {
    IS_C4,
    ALIGNED_WITH_A_C4,
    NEITHER,
}

interface EdoStepNotation extends EdoStepNotationCodewords {
    lefthandSpacing: Octals
    nominal: Nominal
    subsetExcluded?: boolean
    staveIndex: Index<Stave>
    situationReC4: SituationReC4
}

interface HydrationState {
    noteInStaveIndex: Index<Note>
    staveIndex: Index<Stave>
    step: EdoStep
    edoStepNotationCodewordsList: EdoStepNotationCodewords[]
    edoStepNotationWidths: Octals[]
    edoStepNotationSubsetExclusions: Maybe<boolean>[]
    edoStepNotationNominals: Nominal[]
    edoStepNotationStaveIndices: Index<Stave>[]
    edoStepNotationAreC4s: boolean[]
}

export {
    EdoSizeCategory,
    NoteCountParametersByStave,
    NoteCountsByStave,
    WholeTone,
    Limma,
    EdoStepNotation,
    HydrationState,
    EdoStepNotationCodewords,
    SituationReC4,
}
