import { Code, Octals } from "staff-code"
import { Octave } from "./types"
import { Clause, Index } from "@sagittal/general"

const COLUMN_BUFFER_WIDTH: Octals = 5 as Octals

const EARLIER_NOMINALS_OCTAVE: Index<Octave> = 4 as Index<Octave>
const LATER_NOMINALS_OCTAVE: Index<Octave> = 5 as Index<Octave>

const CLEF: Code & Clause = "\n5; Gcl; 15;\n" as Code & Clause

export {
    COLUMN_BUFFER_WIDTH,
    EARLIER_NOMINALS_OCTAVE,
    LATER_NOMINALS_OCTAVE,
    CLEF,
}
