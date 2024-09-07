import { Code } from "staff-code"
import { Clause, Word } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { NotationState } from "./types"
import { EARLIER_NOMINALS_OCTAVE, LATER_NOMINALS_OCTAVE } from "./constants"

const computeNominalCodeword = (notationState: NotationState): Code & Word =>
    `${notationState.currentNominal}${notationState.reachedC ? LATER_NOMINALS_OCTAVE : EARLIER_NOMINALS_OCTAVE} ` as Code & Word

const computeNominalClause = (
    nominal: Nominal,
    { notationState }: { notationState: NotationState }
): Code & Clause => {
    if (nominal !== notationState.currentNominal) {
        notationState.currentNominal = nominal
        if (notationState.currentNominal === Nominal.C) notationState.reachedC = true

        return `\n${computeNominalCodeword(notationState)}` as Code & Clause
    }

    return "" as Code & Clause
}

export {
    computeNominalClause,
    computeNominalCodeword,
}
