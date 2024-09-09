import { Code } from "staff-code"
import { Clause, Word } from "@sagittal/general"
import { Nominal } from "@sagittal/system"
import { AssemblyState } from "./types"
import { EARLIER_NOMINALS_OCTAVE, LATER_NOMINALS_OCTAVE } from "./constants"

const computeNominalCodeword = (assemblyState: AssemblyState): Code & Word =>
    `${assemblyState.currentNominal}${assemblyState.reachedC ? LATER_NOMINALS_OCTAVE : EARLIER_NOMINALS_OCTAVE} ` as Code & Word

const computeNominalClause = (
    nominal: Nominal,
    { assemblyState, subsetExcluded }: { assemblyState: AssemblyState, subsetExcluded: boolean }
): Code & Clause => {
    if (!subsetExcluded && nominal !== assemblyState.currentNominal) {
        assemblyState.currentNominal = nominal
        if (assemblyState.currentNominal === Nominal.C) assemblyState.reachedC = true

        return `\n${computeNominalCodeword(assemblyState)}` as Code & Clause
    }

    return "" as Code & Clause
}

export {
    computeNominalClause,
    computeNominalCodeword,
}
