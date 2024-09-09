import { Clause, Index } from "@sagittal/general"
import { Stave } from "../types"
import { CLEF, STAVE_BREAK } from "./constants"
import { computeNominalCodeword } from "./nominal"
import { AssemblyState } from "./types"
import { Code } from "staff-code"

const computeStaveBreakClause = (
    startingNewStave: boolean,
    { assemblyState, staveIndex }: { assemblyState: AssemblyState, staveIndex: Index<Stave> },
): Code & Clause => {
    if (startingNewStave) {
        assemblyState.currentStave = staveIndex

        return `${STAVE_BREAK}${CLEF}${computeNominalCodeword(assemblyState)} ` as Code & Clause
    }

    return "" as Code & Clause
}

export {
    computeStaveBreakClause,
}
