import { Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"

const computeLefthandSpacingClause = (lefthandSpacingForAlignment: Octals) =>
    `${lefthandSpacingForAlignment + COLUMN_BUFFER_WIDTH}; `

export {
    computeLefthandSpacingClause,
}
