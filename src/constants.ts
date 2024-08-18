import { Cents, Count } from "@sagittal/general"
import { Compatible, Sagitype } from "@sagittal/system"
import { Section } from "../../../system/src/notation"
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

const REVO_VERSION_OF_WHORL: Record<Whorl, Sagitype> = {
    [Whorl.DOUBLE_FLAT]: "\\Y/",
    [Whorl.FLAT]: "\\!!/",
    [Whorl.NATURAL]: " ",
    [Whorl.SHARP]: "/||\\",
    [Whorl.DOUBLE_SHARP]: "/X\\",
} as Record<Whorl, Sagitype>

const NOTES_PER_SYSTEM: Count = 27 as Count

export {
    COMPATIBLE_FOR_WHORL,
    FIFTHS_UNTIL_SHARP,
    JI_FIFTH_SIZE,
    LINKS,
    NOTES_PER_SYSTEM,
    SECTION_BETWEEN_EVO_SAGITTALS_AND_SHARP,
    REVO_VERSION_OF_WHORL,
}
