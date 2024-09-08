import { Clause, Index } from "@sagittal/general"
import { Stave } from "../types"
import { CLEF, STAVE_BREAK } from "./constants"
import { computeNominalCodeword } from "./nominal"
import { NotationState } from "./types"
import { Code } from "staff-code"

const computeStaveBreakClause = (staveIndex: Index<Stave>, { notationState }: { notationState: NotationState }): Code & Clause =>
    staveIndex > 0 ?
        `${STAVE_BREAK}${CLEF}${computeNominalCodeword(notationState)} ` as Code & Clause :
        "" as Code & Clause

export {
    computeStaveBreakClause,
}
