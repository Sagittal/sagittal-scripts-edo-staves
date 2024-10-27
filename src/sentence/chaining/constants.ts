import { Abs, Count, Index, Max } from "@sagittal/general"
import { Link, NOMINALS, Nominal } from "@sagittal/system"

const NOMINAL_COUNT: Count<Nominal> = NOMINALS.length as Count<Nominal>

const LIMMA_LESS_THAN_OR_EQUAL_TO_ZERO_NOMINAL_COUNT: Count<Nominal> = (NOMINAL_COUNT - 2) as Count<Nominal> // no B or F

const MAX_ABSOLUTE_LINK_INDEX_IN_NATURAL_WHORL: Max<Abs<Index<Link>>> = 3 as Max<Abs<Index<Link>>>
const MAX_ABSOLUTE_LINK_INDEX_IN_SHARP_OR_FLAT_WHORL: Max<Abs<Index<Link>>> =
    (MAX_ABSOLUTE_LINK_INDEX_IN_NATURAL_WHORL + NOMINAL_COUNT) as Max<Abs<Index<Link>>>

export {
    NOMINAL_COUNT,
    LIMMA_LESS_THAN_OR_EQUAL_TO_ZERO_NOMINAL_COUNT,
    MAX_ABSOLUTE_LINK_INDEX_IN_NATURAL_WHORL,
    MAX_ABSOLUTE_LINK_INDEX_IN_SHARP_OR_FLAT_WHORL,
}
