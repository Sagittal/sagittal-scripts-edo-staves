import { Index, Decimal, EdoStep, Integer } from "@sagittal/general"
import { Link } from "@sagittal/system"

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

type Difference<T = void> = Decimal<Integer> & {
    _DifferenceBrand: boolean
} & (T extends void ? void : { _DifferenceOfBrand: T }) // TODO: should I just do it like this everywhere?

export { Way, Priority, ChainingState, Difference }
