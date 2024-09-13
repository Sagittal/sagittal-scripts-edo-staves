import { Code } from "staff-code"
import { Clause, Word } from "@sagittal/general"
import { MIDSTAVE_BARLINE } from "./constants"
import { AssemblyState } from "./types"

const computeBarClause = ({
    sagittalCodewords,
    whorlCodewords,
    assemblyState,
    startingNewStave,
}: {
    sagittalCodewords: (Code & Word)[]
    whorlCodewords: (Code & Word)[]
    assemblyState: AssemblyState
    startingNewStave: boolean
}) =>
    !startingNewStave &&
    sagittalCodewords.length === 0 &&
    whorlCodewords.length === 0 &&
    assemblyState.stepCount !== 0
        ? (`${MIDSTAVE_BARLINE}` as Code & Clause)
        : ("" as Code & Clause)

export { computeBarClause }
