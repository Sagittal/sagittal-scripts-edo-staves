import { Octals } from "staff-code"
import { SituationReC4 } from "../hydration"
import { COLUMN_BUFFER_WIDTH } from "./constants"

const computeLefthandSpacingClause = (
    lefthandSpacing: Octals,
    { situationReC4 }: { situationReC4: SituationReC4 },
) =>
    `${situationReC4 === SituationReC4.ALIGNED_WITH_A_C4 ? "2; " : ""}${
        lefthandSpacing + COLUMN_BUFFER_WIDTH
    }; `

export { computeLefthandSpacingClause }
