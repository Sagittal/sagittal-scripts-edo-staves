import { Code } from "staff-code"
import { Clause, Column, Index, Word } from "@sagittal/general"
import { MIDSTAVE_BARLINE } from "./constants"
import { NotationState } from "./types"

const computeBarClause = (
    { sagittalCodewords, whorlCodewords, notationState, columnIndex, subsetExcluded }: {
        sagittalCodewords: (Code & Word)[],
        whorlCodewords: (Code & Word)[],
        notationState: NotationState,
        columnIndex: Index<Column>,
        subsetExcluded: boolean,
    }
) =>
    columnIndex !== 0 && sagittalCodewords.length === 0 && whorlCodewords.length === 0 && notationState.noteCount !== 0 ?
        `${MIDSTAVE_BARLINE}` as Code & Clause :
        "" as Code & Clause

export {
    computeBarClause,
}
