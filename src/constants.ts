import { Max, Edo, Filename, Px, deepClone } from "@sagittal/general"
import { EDO_NOTATION_DEFINITIONS, EdoNotationDefinition, EdoNotationName } from "@sagittal/system"
import { Font } from "./types"

const BRAVURA_TEXT_SC_FONT_FILE: Filename =
    "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename
const SANOMAT_FONT_FILE: Filename = "/Users/douglasblumeyer/Library/Fonts/Sanomat-Semibold.otf" as Filename
const OPEN_SANS_REGULAR_FONT_FILE: Filename =
    "/Users/douglasblumeyer/Library/Fonts/OpenSans-Regular.ttf" as Filename
const OPEN_SANS_SEMIBOLD_FONT_FILE: Filename =
    "/Users/douglasblumeyer/Library/Fonts/OpenSans-SemiBold.ttf" as Filename

const MAX_PERIODIC_TABLE_EDO: Max<Edo> = 77 as Max<Edo>

const EDO_NOTATION_DEFINITIONS_ENTRIES: [EdoNotationName, EdoNotationDefinition][] = Object.entries(
    EDO_NOTATION_DEFINITIONS,
) as [EdoNotationName, EdoNotationDefinition][]
const EDO_NOTATION_NAMES: EdoNotationName[] = Object.keys(EDO_NOTATION_DEFINITIONS) as EdoNotationName[]

const BRAVURA_TEXT_SC_FONT_SIZE: Px = 40 as Px
const STEP_AND_MEANINGS_FONT_SIZE: Px = 13 as Px

const BRAVURA_TEXT_FONT: Font = {
    fontFile: BRAVURA_TEXT_SC_FONT_FILE,
    fontSize: BRAVURA_TEXT_SC_FONT_SIZE,
}

const MEANINGS_FONT: Font = {
    fontFile: OPEN_SANS_REGULAR_FONT_FILE,
    fontSize: STEP_AND_MEANINGS_FONT_SIZE,
}

const MEANINGS_FONTS = [deepClone(BRAVURA_TEXT_FONT), deepClone(MEANINGS_FONT)]

const BRAVURA_Y_OFFSET: Px = -16 as Px
const MEANINGS_Y_OFFSET: Px = 20 as Px

export {
    MAX_PERIODIC_TABLE_EDO,
    EDO_NOTATION_DEFINITIONS_ENTRIES,
    EDO_NOTATION_NAMES,
    MEANINGS_FONTS,
    MEANINGS_FONT,
    BRAVURA_TEXT_SC_FONT_SIZE,
    SANOMAT_FONT_FILE,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    STEP_AND_MEANINGS_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_FONT,
    OPEN_SANS_REGULAR_FONT_FILE,
    BRAVURA_Y_OFFSET,
    MEANINGS_Y_OFFSET,
}
