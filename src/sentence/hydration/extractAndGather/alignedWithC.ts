import { Index } from "@sagittal/general"
import { Edo, EdoStep, Link } from "@sagittal/system"

const C_LINK_INDICES: Index<Link>[] = [/*-16, -9, */ -2, 5, 12] as Index<Link>[] // TODO: make good

const computeIsC4 = (
    step: EdoStep,
    {
        linkIndex,
        edo,
    }: {
        linkIndex: Index<Link>
        edo: Edo
    },
): boolean => C_LINK_INDICES.includes(linkIndex) && step < edo / 2 // TODO: clean up

export { computeIsC4 }
