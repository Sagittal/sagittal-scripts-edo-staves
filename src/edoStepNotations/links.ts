import { Index, Maybe, Count } from "@sagittal/general"
import { Sagittal, Edo, Link, EdoStep, EdoStepNotation, Nominal, NOMINALS } from "@sagittal/system"
import { Way, ChainingState } from "./types"
import { computeHaveNominalsCrossed } from "./nominalCrossing"
import { NOMINAL_COUNT, ENOUGH_WHORLS_TO_GUARANTEE_POSITIVE_VALUE_BEFORE_MODULUS } from "./constants"

const computeDStep = ({ edo, fifthStep, root }: { edo: Edo, fifthStep: EdoStep, root: Nominal }) =>
    (
        ENOUGH_WHORLS_TO_GUARANTEE_POSITIVE_VALUE_BEFORE_MODULUS * edo +
        fifthStep * (NOMINALS.indexOf(Nominal.D) - NOMINALS.indexOf(root))
    ) % edo as EdoStep

const computeLinkEdoStepNotationsFromEdoStepLinks = (edoStepLinkIndices: Index<Link>[]): EdoStepNotation[] =>
    edoStepLinkIndices.map((linkIndex: Index<Link>): EdoStepNotation => ({ linkIndex, sagittalIndex: 0 as Index<Sagittal> }))

const computeLinkEdoStepNotations = ({ edo, fifthStep, useOnlyPlainNominals, root }: {
    edo: Edo,
    fifthStep: EdoStep,
    useOnlyPlainNominals: boolean,
    root: Nominal,
}): EdoStepNotation[] => {
    const dStep: EdoStep = computeDStep({ edo, fifthStep, root })

    let edoStepLinkIndices: Maybe<Index<Link>>[] = Array(edo)
    edoStepLinkIndices[dStep] = 0 as Index<Link>
    let candidateEdoStepLinkIndices: Maybe<Index<Link>>[] = Array(edo)

    let chainingState: ChainingState
    let way: Way = Way.UP
    const chainingStates: Record<Way, ChainingState> = {
        [Way.UP]: { edoStep: dStep, linkIndex: 0 as Index<Link> },
        [Way.DOWN]: { edoStep: dStep, linkIndex: 0 as Index<Link> },
    }

    let areLinksComplete: boolean = false

    let edoStepNotationsPlacedCount: Count<EdoStepNotation> = 1 as Count<EdoStepNotation>

    while (!areLinksComplete) {
        candidateEdoStepLinkIndices = edoStepLinkIndices.slice()
        chainingState = chainingStates[way]
        chainingState.edoStep = (chainingState.edoStep + edo + way * fifthStep) % edo as EdoStep

        if (candidateEdoStepLinkIndices[chainingState.edoStep] !== undefined) {
            areLinksComplete = true
        } else {
            edoStepNotationsPlacedCount++
            chainingState.linkIndex = chainingState.linkIndex + way as Index<Link>
            candidateEdoStepLinkIndices[chainingState.edoStep] = chainingState.linkIndex
        }

        if (!areLinksComplete && useOnlyPlainNominals && edoStepNotationsPlacedCount as Count == NOMINAL_COUNT) areLinksComplete = true

        if (!areLinksComplete && computeHaveNominalsCrossed(candidateEdoStepLinkIndices)) {
            areLinksComplete = true
        } else {
            edoStepLinkIndices = candidateEdoStepLinkIndices
        }

        way =
            way == Way.UP ?
                Way.DOWN :
                Way.UP
    }

    return computeLinkEdoStepNotationsFromEdoStepLinks(
        edoStepLinkIndices as Index<Link>[]
    )
}


export {
    computeLinkEdoStepNotations,
}
