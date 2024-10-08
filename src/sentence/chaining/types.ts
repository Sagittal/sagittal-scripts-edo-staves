import { Index, Decimal } from "@sagittal/general"
import { EdoStep, Link, Sagittal } from "@sagittal/system"

enum Way {
    UP = 1,
    DOWN = -1,
}

interface Priority {
    linkIndexRestriction?: Index<Link>
    way: Way
}

interface ChainingState {
    edoStep: EdoStep
    linkIndex: Index<Link>
}

type Difference<T = void> = Decimal<{ integer: true }> & {
    _DifferenceBrand: boolean
} & (T extends void ? {} : { _DifferenceOfBrand: T })

export { Way, Priority, ChainingState, Difference }
