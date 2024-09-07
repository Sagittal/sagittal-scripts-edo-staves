import { Code } from "staff-code"
import { Clause, Word } from "@sagittal/general"
import { BARLINE } from "./constants"
import { NotationState } from "./types"

const computeBarClause = (
    { sagittalCodewords, whorlCodewords, notationState }: {
        sagittalCodewords: (Code & Word)[],
        whorlCodewords: (Code & Word)[],
        notationState: NotationState,
    }
) =>
    sagittalCodewords.length === 0 && whorlCodewords.length === 0 && notationState.noteCount !== 0 ?
        `${BARLINE}` as Code & Clause :
        "" as Code & Clause

export {
    computeBarClause,
}
