import { Index, Decimal } from "@sagittal/general";
import { EdoStep, Link } from "../types"

enum Direction {
    UP = 1,
    DOWN = -1,
}

interface Priority {
    linkIndexRestriction?: Index<Link>,
    direction: Direction,
}

interface ChainingState {
    edoStep: EdoStep,
    linkIndex: Index<Link>,
}

type Difference<T = void> =
    Decimal<{integer: true}> & {_DifferenceBrand: boolean} & (T extends void ? {} : {_DifferenceOfBrand: T})

export {
    Direction,
    Priority,
    ChainingState,
    Difference,
}
