import { Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"

const computeLefthandSpacingClause = (lefthandSpacing: Octals) =>
    `${lefthandSpacing + COLUMN_BUFFER_WIDTH}; `

export {
    computeLefthandSpacingClause,
}
