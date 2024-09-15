import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationDefinition,
} from "@sagittal/system"
import {
    BEST_FIFTH_EDO_NOTATION_DEFINITION_INDEX,
    SECOND_BEST_FIFTH_EDO_NOTATION_DEFINITION_INDEX,
} from "./constants"

const computeEdoNotationDefinition = (
    edo: Edo,
    useSecondBestFifth: boolean,
): EdoNotationDefinition =>
    EDO_NOTATION_DEFINITIONS[edo][
        useSecondBestFifth
            ? SECOND_BEST_FIFTH_EDO_NOTATION_DEFINITION_INDEX
            : BEST_FIFTH_EDO_NOTATION_DEFINITION_INDEX
    ]

export { computeEdoNotationDefinition }
