import { Code, Octals } from "staff-code"
import { Octave } from "./types"
import { Clause, Index } from "@sagittal/general"

const COLUMN_BUFFER_WIDTH: Octals = 5 as Octals

const EARLIER_NOMINALS_OCTAVE: Index<Octave> = 4 as Index<Octave>
const LATER_NOMINALS_OCTAVE: Index<Octave> = 5 as Index<Octave>

const ACTIVATE_STAFF: Code & Clause = "ston " as Code & Clause
const CLEF: Code & Clause = "\n5; trcl; 15;\n" as Code & Clause
const BARLINE: Code & Clause = "en; bl " as Code & Clause
const FINAL_BARLINE: Code & Clause = "\nen; blfn" as Code & Clause
const STAVE_BREAK: Code & Clause = "nl; " as Code & Clause

export {
    COLUMN_BUFFER_WIDTH,
    EARLIER_NOMINALS_OCTAVE,
    LATER_NOMINALS_OCTAVE,
    CLEF,
    BARLINE,
    FINAL_BARLINE,
    STAVE_BREAK,
    ACTIVATE_STAFF,
}
