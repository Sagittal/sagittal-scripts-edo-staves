import { Cents, Count, Index } from "@sagittal/general"
import { Compatible, Section } from "@sagittal/system"
import { Nominal, Whorl, Link } from "./types"

const LINKS: Link[] = Object.values(Whorl)
    .map(whorl => Object.values(Nominal)
        .map(nominal => ({ whorl, nominal }))
    )
    .flat()

const JI_FIFTH_SIZE: Cents = 701.955000865 as Cents

const FIFTHS_UNTIL_SHARP: Count = 7 as Count

const SECTION_BETWEEN_EVO_SAGITTALS_AND_SHARP: Section = { negated: false, shifted: false, mirrored: true }

const COMPATIBLE_FOR_WHORL: Record<Whorl, Compatible> = {
    [Whorl.DOUBLE_FLAT]: Compatible.DOUBLE_FLAT,
    [Whorl.FLAT]: Compatible.FLAT,
    [Whorl.NATURAL]: Compatible.NATURAL,
    [Whorl.SHARP]: Compatible.SHARP,
    [Whorl.DOUBLE_SHARP]: Compatible.DOUBLE_SHARP,
}

// const REVO_VERSION_OF_WHORL: Record<Whorl, Sagitype> = {
//     [Whorl.DOUBLE_FLAT]: "\\Y/",
//     [Whorl.FLAT]: "\\!!/",
//     [Whorl.NATURAL]: " ",
//     [Whorl.SHARP]: "/||\\",
//     [Whorl.DOUBLE_SHARP]: "/X\\",
// } as Record<Whorl, Sagitype>

const NOTES_PER_SYSTEM: Count = 27 as Count

const C_LINK_INDEX: Index<Link> = -2 as Index<Link>

const REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT: Index<Link> = 17 as Index<Link>

const MAXIMUM_ABSOLUTE_VALUE_OF_NATURAL_WHORL_LINK_INDICES: Index<Link> = 3 as Index<Link>
const MAXIMUM_ABSOLUTE_VALUE_OF_SHARP_OR_FLAT_WHORL_LINK_INDICES: Index<Link> = 10 as Index<Link>


export {
    COMPATIBLE_FOR_WHORL,
    FIFTHS_UNTIL_SHARP,
    JI_FIFTH_SIZE,
    LINKS,
    NOTES_PER_SYSTEM,
    SECTION_BETWEEN_EVO_SAGITTALS_AND_SHARP,
    // REVO_VERSION_OF_WHORL,
    C_LINK_INDEX,
    REINDEX_LINK_FROM_D_TO_F_DOUBLE_FLAT,
    MAXIMUM_ABSOLUTE_VALUE_OF_NATURAL_WHORL_LINK_INDICES,
    MAXIMUM_ABSOLUTE_VALUE_OF_SHARP_OR_FLAT_WHORL_LINK_INDICES
}
