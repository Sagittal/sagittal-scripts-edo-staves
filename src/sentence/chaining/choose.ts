import { Index } from "@sagittal/general"
import { Link, Spelling, Whorl } from "@sagittal/system"
import {
    MAX_ABSOLUTE_LINK_INDEX_IN_NATURAL_WHORL,
    MAX_ABSOLUTE_LINK_INDEX_IN_SHARP_OR_FLAT_WHORL,
} from "./constants"

const NATURAL_WHORL_INDEX: Index<Whorl> = 0 as Index<Whorl>
const SHARP_OR_FLAT_ABSOLUTE_WHORL_INDEX: Index<Whorl> = 1 as Index<Whorl>
const DOUBLE_SHARP_OR_FLAT_ABSOLUTE_WHORL_INDEX: Index<Whorl> =
    2 as Index<Whorl>

const getAbsoluteWhorlIndex = (linkIndex: Index<Link>): Index<Whorl> => {
    const absoluteLinkIndex: Index<Link> = Math.abs(linkIndex) as Index<Link>
    return absoluteLinkIndex > MAX_ABSOLUTE_LINK_INDEX_IN_SHARP_OR_FLAT_WHORL
        ? DOUBLE_SHARP_OR_FLAT_ABSOLUTE_WHORL_INDEX
        : absoluteLinkIndex > MAX_ABSOLUTE_LINK_INDEX_IN_NATURAL_WHORL
        ? SHARP_OR_FLAT_ABSOLUTE_WHORL_INDEX
        : NATURAL_WHORL_INDEX
}

const chooseSpelling = (
    chosenSpelling: Spelling,
    candidateSpelling: Spelling,
): Spelling =>
    getAbsoluteWhorlIndex(candidateSpelling.linkIndex) <
        getAbsoluteWhorlIndex(chosenSpelling.linkIndex) &&
    chosenSpelling.sagittalIndex !== 0
        ? candidateSpelling
        : chosenSpelling

export { chooseSpelling }
