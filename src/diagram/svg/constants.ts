import { Filename, Px } from "@sagittal/general"

const SVG_NS = "http://www.w3.org/2000/svg"

const BRAVURA_TEXT_SC_FONT_FILE: Filename =
    "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename
const SANOMAT_FONT_FILE: Filename =
    "/Users/douglasblumeyer/Library/Fonts/Sanomat-Semibold.otf" as Filename
const OPEN_SANS_REGULAR_FONT_FILE: Filename =
    "/Users/douglasblumeyer/Library/Fonts/OpenSans-Regular.ttf" as Filename
const OPEN_SANS_SEMIBOLD_FONT_FILE: Filename =
    "/Users/douglasblumeyer/Library/Fonts/OpenSans-SemiBold.ttf" as Filename

const LEFT_AND_RIGHT_MARGIN: Px = 20 as Px
const TOP_MARGIN: Px = 40 as Px
const BOTTOM_MARGIN: Px = 20 as Px
const TILE_TOP_MARGIN: Px = 18 as Px
const EXTRA_SPACE_TO_COMFORTABLY_CLEAR_TILE_AND_EXPRESSIONS: Px = 15 as Px
const TOTAL_WIDTH_NEEDED_FOR_TILE: Px = 140 as Px
const A_LITTLE_EXTRA_ROOM_FOR_SHARP_SIZE: Px = 15 as Px

const OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION: Px = 0.5 as Px

const BRAVURA_TEXT_SC_FONT_SIZE: Px = 40 as Px
const BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP: Px = 33 as Px
const TITLE_FONT_SIZE: Px = 19 as Px
const SUBTITLE_FONT_SIZE: Px = 10 as Px
const TILE_EDO_TEXT_FONT_SIZE: Px = TITLE_FONT_SIZE
const STEP_FONT_SIZE: Px = 13 as Px
const SUBSET_TEXT_FONT_SIZE: Px = 16 as Px

const TITLE_Y_OFFSET: Px = 10 as Px
const SUBTITLE_FURTHER_Y_OFFSET: Px = 10 as Px

const TILE_SIZE: Px = 45 as Px

const EDO_Y_OFFSET: Px = -10 as Px

const SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE: Px[] =
    [
        -6, // 17
        -1, // 64b
        5, // 71
        12, // 145
        19, // 224
        25, // 311
        30, // 494
        34, // 581
    ] as Px[]
const SUBSET_Y_OFFSET: Px = 14 as Px

const WHOLE_TONE_X_OFFSET: Px = -7 as Px
const WHOLE_TONE_Y_OFFSET: Px = 8 as Px
const LIMMA_AND_SHARP_Y_OFFSET: Px = -4 as Px

const CORNER_TRIANGLE_SIZE: Px = 6 as Px

const TILE_MARGIN: Px = 1 as Px
const SAGITTALS_MAX_WIDTH: Px = (TILE_SIZE - TILE_MARGIN * 2) as Px

const DEFINIENS_Y_OFFSET: Px = -16 as Px

export {
    SVG_NS,
    LEFT_AND_RIGHT_MARGIN,
    TOP_MARGIN,
    BOTTOM_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    TITLE_FONT_SIZE,
    SUBTITLE_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_FONT_SIZE,
    TILE_SIZE,
    TILE_TOP_MARGIN,
    TILE_EDO_TEXT_FONT_SIZE,
    STEP_FONT_SIZE,
    SANOMAT_FONT_FILE,
    OPEN_SANS_REGULAR_FONT_FILE,
    OPEN_SANS_SEMIBOLD_FONT_FILE,
    WHOLE_TONE_X_OFFSET,
    WHOLE_TONE_Y_OFFSET,
    LIMMA_AND_SHARP_Y_OFFSET,
    TITLE_Y_OFFSET,
    SUBTITLE_FURTHER_Y_OFFSET,
    EDO_Y_OFFSET,
    SUBSET_Y_OFFSET,
    SAGITTAL_Y_OFFSETS_BASED_ON_HOW_MANY_TIMES_SCALE_NEEDED_TO_CHANGE,
    CORNER_TRIANGLE_SIZE,
    SAGITTALS_MAX_WIDTH,
    EXTRA_SPACE_TO_COMFORTABLY_CLEAR_TILE_AND_EXPRESSIONS,
    TOTAL_WIDTH_NEEDED_FOR_TILE,
    A_LITTLE_EXTRA_ROOM_FOR_SHARP_SIZE,
    SUBSET_TEXT_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_SIZE_FOR_SZ_SEMISHARP,
    DEFINIENS_Y_OFFSET,
}
