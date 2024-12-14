import { Filename, HexColor, Hyperlink, Index, Io, Maybe, Px } from "@sagittal/general"

// ordered according to the order they should appear on the Xen wiki page
enum DiagramType {
    GENERAL = "general",
    EVO = "Evo",
    REVO = "Revo",
    ALTERNATE_EVO = "alternative Evo",
    EVO_SZ = "Evo-SZ",
}

enum DifferenceCase {
    _1_ALL_DIFFERENT,
    _1A_ALL_DIFFERENT_REVO_COULD_BE_EVO,
    _2_NONE_DIFFERENT,
    _3_REVO_DIFFERENT,
    _3A_REVO_DIFFERENT_REVO_COULD_BE_EVO,
    _4_EVO_SZ_DIFFERENT,
}

interface Font {
    fontFile: Filename
    fontSize: Px
}

interface PathifiableTexts {
    texts: Io[]
    fonts: Font[]
    fontIndices: Index<Font>[]
    additionalYOffsets?: Px[]
    hyperlinks?: Maybe<Hyperlink>[]
    colors?: HexColor[]
}

export { DiagramType, DifferenceCase, Font, PathifiableTexts }
