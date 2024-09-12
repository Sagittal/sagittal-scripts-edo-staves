import { Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { SituationReC4 } from "../hydration"

const computeLefthandSpacingClause = (
    lefthandSpacing: Octals,
    { situationReC4 }: { situationReC4: SituationReC4 },
) =>
    `${situationReC4 === SituationReC4.ALIGNED_WITH_A_C4 ? "2; " : ""}${
        lefthandSpacing + COLUMN_BUFFER_WIDTH
    }; `

export { computeLefthandSpacingClause }
