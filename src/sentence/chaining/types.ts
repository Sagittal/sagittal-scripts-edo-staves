import { Index, Decimal } from "@sagittal/general"
import { EdoStep, Link, Sagittal } from "@sagittal/system"

enum Way {
    UP = 1,
    DOWN = -1,
}

interface Priority {
    linkIndexRestriction?: Index<Link>,
    way: Way,
}

interface ChainingState {
    edoStep: EdoStep,
    linkIndex: Index<Link>,
}

type Difference<T = void> =
    Decimal<{ integer: true }> & { _DifferenceBrand: boolean } & (T extends void ? {} : { _DifferenceOfBrand: T })

interface EdoStepNotationIndices {
    linkIndex: Index<Link>              // 35 possibilities, -17 to 17, for FCGDAEB flanked by sharps and flats and doubles thereof
    sagittalIndex: Index<Sagittal>      // 0 is none, 1 is the first sagittal in the sequence
}

export {
    Way,
    Priority,
    ChainingState,
    Difference,
    EdoStepNotationIndices,
}
