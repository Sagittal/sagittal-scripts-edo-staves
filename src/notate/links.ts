import { Index, Maybe, Count, isUndefined, mod } from "@sagittal/general"
import { Sagittal, Edo, Link, EdoStep, EdoStepNotation, Nominal, NOMINALS } from "@sagittal/system"
import { Way, ChainingState } from "./types"
import { computeHaveNominalsCrossed } from "./nominalCrossing"
import { NOMINAL_COUNT } from "./constants"

const computeDStep = ({ edo, fifthStep }: { edo: Edo, fifthStep: EdoStep }): EdoStep =>
    mod(
        fifthStep * (NOMINALS.indexOf(Nominal.D) - NOMINALS.indexOf(Nominal.C)),
        edo
    ) as EdoStep

const computeLinkEdoStepNotationsFromEdoStepLinks = (edoStepLinkIndices: Index<Link>[]): EdoStepNotation[] =>
    edoStepLinkIndices.map((linkIndex: Index<Link>): EdoStepNotation => ({ linkIndex, sagittalIndex: 0 as Index<Sagittal> }))

const computeLinkEdoStepNotations = ({ edo, fifthStep, useOnlyPlainNominals }: {
    edo: Edo,
    fifthStep: EdoStep,
    useOnlyPlainNominals: boolean,
}): EdoStepNotation[] => {
    const dStep: EdoStep = computeDStep({ edo, fifthStep })

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
        chainingState.edoStep = mod(chainingState.edoStep + way * fifthStep, edo) as EdoStep

        if (!isUndefined(candidateEdoStepLinkIndices[chainingState.edoStep])) {
            areLinksComplete = true
        } else {
            edoStepNotationsPlacedCount++
            chainingState.linkIndex = chainingState.linkIndex + way as Index<Link>
            candidateEdoStepLinkIndices[chainingState.edoStep] = chainingState.linkIndex
        }

        if (!areLinksComplete && useOnlyPlainNominals && edoStepNotationsPlacedCount as Count === NOMINAL_COUNT) areLinksComplete = true

        if (!areLinksComplete && computeHaveNominalsCrossed(candidateEdoStepLinkIndices)) {
            areLinksComplete = true
        } else {
            edoStepLinkIndices = candidateEdoStepLinkIndices
        }

        way =
            way === Way.UP ?
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
