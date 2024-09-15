import { Code, Octals } from "staff-code"
import { Count, Index, Maybe, Word } from "@sagittal/general"
import { EdoStep, Nominal } from "@sagittal/system"
import { Stave } from "../types"

type WholeTone = { _WholeToneBrand: boolean }
type Limma = { _LimmaBrand: boolean }

enum EdoSizeCategory {
    SMALL = "small",
    SMALL_MEDIUM = "small medium",
    MEDIUM = "medium",
    LARGE_MEDIUM = "large medium",
    LARGE = "large",
}

interface StepCountParametersByStave {
    wholeToneCount: Count<WholeTone>
    limmaCount: Count<Limma>
}

type StepCountsByStave = Count<EdoStep>[]

interface Codewords {
    sagittalCodewords: (Code & Word)[]
    whorlCodewords: (Code & Word)[]
}

enum SituationReC4 {
    IS_C4,
    ALIGNED_WITH_A_C4,
    NEITHER,
}

interface DiagramStep extends Codewords {
    lefthandSpacing: Octals
    nominal: Nominal
    subsetExcluded?: boolean
    staveIndex: Index<Stave>
    situationReC4: SituationReC4
}

interface HydrationState {
    stepInStaveIndex: Index<EdoStep>
    staveIndex: Index<Stave>
    step: EdoStep
    codewordsList: Codewords[]
    widths: Octals[]
    subsetExclusions: Maybe<boolean>[]
    nominals: Nominal[]
    staveIndices: Index<Stave>[]
    areC4s: boolean[]
}

export {
    EdoSizeCategory,
    StepCountParametersByStave,
    StepCountsByStave,
    WholeTone,
    Limma,
    DiagramStep,
    HydrationState,
    Codewords,
    SituationReC4,
}
