import {
    OPEN_SANS_REGULAR_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
} from "../constants"
import { Font } from "../types"
import { PathifiableTexts } from "./types"

const MEANINGS_FONT: Font = {
    fontFile: OPEN_SANS_REGULAR_FONT_FILE,
    fontSize: STEP_AND_MEANINGS_FONT_SIZE,
}

const EMPTY_PATHIFIABLE_TEXTS: PathifiableTexts = {
    fontIndices: [],
    fonts: [],
    texts: [],
    additionalYOffsets: [],
}

export { MEANINGS_FONT, EMPTY_PATHIFIABLE_TEXTS }
