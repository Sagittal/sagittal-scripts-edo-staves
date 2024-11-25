import { deepClone } from "@sagittal/general"
import { BRAVURA_TEXT_SC_FONT_FILE, BRAVURA_TEXT_SC_FONT_SIZE } from "../../diagram/svg/constants"
import { MEANINGS_FONT } from "../../diagram/svg/meaning/constants"
import { Font } from "../../diagram/svg/types"

const DEFINIENDUM_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}
const DEFINIENS_FONT: Font = deepClone(MEANINGS_FONT)
const FONTS = [DEFINIENDUM_FONT, DEFINIENS_FONT]

export { DEFINIENDUM_FONT, DEFINIENS_FONT, FONTS }
