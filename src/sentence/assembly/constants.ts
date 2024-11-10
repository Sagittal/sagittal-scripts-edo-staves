import { Clause, Index } from "@sagittal/general"
import { Code, Octals } from "staff-code"
import { Octave } from "./types"

const COLUMN_BUFFER_WIDTH: Octals = 4 as Octals

const EARLIER_NOMINALS_OCTAVE: Index<Octave> = 4 as Index<Octave>
const LATER_NOMINALS_OCTAVE: Index<Octave> = 5 as Index<Octave>

const BARLINE: Code & Clause = "\n3; en; bl " as Code & Clause
const ACTIVATE_STAFF: Code & Clause = "ston " as Code & Clause
const CLEF: Code & Clause = `\n4; trcl; 12;\n` as Code & Clause
const MIDSTAVE_BARLINE: Code & Clause = `${BARLINE}10; ` as Code & Clause
const FINAL_BARLINE: Code & Clause = "\nen; blfn" as Code & Clause
const STAVE_BREAK: Code & Clause = `${BARLINE}nl; ` as Code & Clause

export {
    COLUMN_BUFFER_WIDTH,
    EARLIER_NOMINALS_OCTAVE,
    LATER_NOMINALS_OCTAVE,
    CLEF,
    MIDSTAVE_BARLINE,
    FINAL_BARLINE,
    STAVE_BREAK,
    ACTIVATE_STAFF,
}
