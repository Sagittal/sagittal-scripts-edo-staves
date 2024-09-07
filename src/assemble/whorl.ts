import { Clause, Word } from "@sagittal/general"
import { Code } from "staff-code"

const computeWhorlClause = (whorlCodewords: (Code & Word)[]): Code & Clause =>
    whorlCodewords.length === 0 ?
        "" as Code & Clause :
        `${whorlCodewords[0]}; ` as Code & Clause

export {
    computeWhorlClause,
}
