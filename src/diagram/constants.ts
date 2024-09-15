import { Filename, Index, Io, Px } from "@sagittal/general"
import { Flavor } from "@sagittal/system"

const LEFT_AND_RIGHT_MARGIN: Px = 20 as Px
const TOP_MARGIN: Px = 40 as Px
const BOTTOM_MARGIN: Px = 20 as Px
const OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION: Px = 0.5 as Px

const TITLE_FONT_SIZE: Px = 20 as Px
const TITLE_FONT_NAME: string = "Sanomat"

const SUBTITLE_FONT_SIZE: Px = 10 as Px
const SUBTITLE_FONT_NAME: string = "Open Sans, sans-serif"

const BRAVURA_TEXT_SC_TITLE_FONT_SIZE: Px = 40 as Px
const BRAVURA_TEXT_SC_FONT_FILE: Filename =
    "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

const FORMATTED_FLAVOR_NAMES: Record<Flavor, Io> = {
    [Flavor.EVO]: "Evo",
    [Flavor.EVO_SZ]: "Evo-SZ",
    [Flavor.REVO]: "Revo",
}

const EVO_FLAVOR_INDEX: Index<Flavor> = 0 as Index<Flavor>
const EVO_SZ_FLAVOR_INDEX: Index<Flavor> = 1 as Index<Flavor>
const REVO_FLAVOR_INDEX: Index<Flavor> = 2 as Index<Flavor>

export {
    LEFT_AND_RIGHT_MARGIN,
    TOP_MARGIN,
    BOTTOM_MARGIN,
    OFFSET_FOR_CLEANER_MEDIAWIKI_PNGIFICATION,
    TITLE_FONT_NAME,
    TITLE_FONT_SIZE,
    SUBTITLE_FONT_NAME,
    SUBTITLE_FONT_SIZE,
    BRAVURA_TEXT_SC_FONT_FILE,
    BRAVURA_TEXT_SC_TITLE_FONT_SIZE,
    FORMATTED_FLAVOR_NAMES,
    EVO_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
}
