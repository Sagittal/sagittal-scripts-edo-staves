import { Index } from "@sagittal/general"
import { Edo, EdoStep, Link } from "@sagittal/system"

const C_LINK_INDICES: Index<Link>[] = [
    // C flat and C double flat will never appear as C4
    -2, // C
    5,  // C sharp
    12  // C double sharp
] as Index<Link>[]
const HALF_BECAUSE_NO_WAY_ANY_C5_OCCURS_IN_THE_FIRST_HALF_OF_THE_STEPS: number =
    1 / 2

const computeIsC4 = (
    step: EdoStep,
    {
        linkIndex,
        edo,
    }: {
        linkIndex: Index<Link>
        edo: Edo
    },
): boolean =>
    C_LINK_INDICES.includes(linkIndex) &&
    step <
        edo * HALF_BECAUSE_NO_WAY_ANY_C5_OCCURS_IN_THE_FIRST_HALF_OF_THE_STEPS

export { computeIsC4 }
