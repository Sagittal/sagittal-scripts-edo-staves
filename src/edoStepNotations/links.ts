import { Index, Maybe, Count } from "@sagittal/general"
import { Edo, Link, EdoStep, EdoStepNotation } from "../types"
import { Direction, ChainingState } from "./types"
import { Sagittal } from "@sagittal/system"
import { computeHaveNominalsCrossed } from "./nominalCrossing"
import { NOMINAL_COUNT } from "./constants"

const computeLinkEdoStepNotationsFromEdoStepLinks = (edoStepLinkIndices: Index<Link>[]): EdoStepNotation[] =>
    edoStepLinkIndices.map((linkIndex: Index<Link>) => ({ linkIndex, sagittalIndex: 0 as Index<Sagittal> }))

const computeLinkEdoStepNotations = ({ edo, fifthStep, useOnlyPlainNominals }: {
    edo: Edo,
    fifthStep: EdoStep,
    useOnlyPlainNominals: boolean,
}): Maybe<EdoStepNotation>[] => {
    const dStep: EdoStep = fifthStep * 2 % edo as EdoStep

    let edoStepLinkIndices: Maybe<Index<Link>>[] = Array(edo)
    edoStepLinkIndices[dStep] = 0 as Index<Link>
    let candidateEdoStepLinkIndices: Maybe<Index<Link>>[] = Array(edo)

    let chainingState: ChainingState
    let direction: Direction = Direction.UP
    const chainingStates: Record<Direction, ChainingState> = {
        [Direction.UP]: { edoStep: dStep, linkIndex: 0 as Index<Link> },
        [Direction.DOWN]: { edoStep: dStep, linkIndex: 0 as Index<Link> },
    }

    let areLinksComplete: boolean = false

    let edoStepNotationsPlacedCount: Count<EdoStepNotation> = 1 as Count<EdoStepNotation>

    while (!areLinksComplete) {
        candidateEdoStepLinkIndices = edoStepLinkIndices.slice()
        chainingState = chainingStates[direction]
        chainingState.edoStep = (chainingState.edoStep + edo + direction * fifthStep) % edo as EdoStep

        if (candidateEdoStepLinkIndices[chainingState.edoStep] !== undefined) {
            areLinksComplete = true
        } else {
            edoStepNotationsPlacedCount++
            chainingState.linkIndex = chainingState.linkIndex + direction as Index<Link>
            candidateEdoStepLinkIndices[chainingState.edoStep] = chainingState.linkIndex
        }

        if (!areLinksComplete && useOnlyPlainNominals && edoStepNotationsPlacedCount as Count == NOMINAL_COUNT) areLinksComplete = true

        if (!areLinksComplete && computeHaveNominalsCrossed(candidateEdoStepLinkIndices)) {
            areLinksComplete = true
        } else {
            edoStepLinkIndices = candidateEdoStepLinkIndices
        }

        direction =
            direction == Direction.UP ?
                Direction.DOWN :
                Direction.UP
    }

    return computeLinkEdoStepNotationsFromEdoStepLinks(
        edoStepLinkIndices as Index<Link>[]
    )
}


export {
    computeLinkEdoStepNotations,
}
