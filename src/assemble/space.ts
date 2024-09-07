import { Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"

const computeLefthandSpacingClause = (leftSpacingForAlignment: Octals) =>
    `${leftSpacingForAlignment + COLUMN_BUFFER_WIDTH}; `

export {
    computeLefthandSpacingClause,
}
