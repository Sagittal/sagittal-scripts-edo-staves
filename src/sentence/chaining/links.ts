import { Index, Maybe, Count, isUndefined, mod } from "@sagittal/general"
import { Sagittal, Edo, Link, EdoStep, Nominal, NOMINALS } from "@sagittal/system"
import { Way, ChainingState, EdoStepNotationIndices } from "./types"
import { computeHaveNominalsCrossed } from "./nominalCrossing"
import { NOMINAL_COUNT } from "./constants"

const computeDStep = ({ edo, fifthStep }: { edo: Edo, fifthStep: EdoStep }): EdoStep =>
    mod(
        fifthStep * (NOMINALS.indexOf(Nominal.D) - NOMINALS.indexOf(Nominal.C)),
        edo
    ) as EdoStep

const computeLinkEdoStepNotationIndicesListFromEdoStepLinks = (edoStepLinkIndices: Index<Link>[]): EdoStepNotationIndices[] =>
    edoStepLinkIndices.map((linkIndex: Index<Link>): EdoStepNotationIndices => ({ linkIndex, sagittalIndex: 0 as Index<Sagittal> }))

const computeDefaultSingleSpellingLinkEdoStepNotationIndicesList = ({ edo, fifthStep, useOnlyPlainNominals }: {
    edo: Edo,
    fifthStep: EdoStep,
    useOnlyPlainNominals: boolean,
}): EdoStepNotationIndices[] => {
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

    let edoStepNotationIndicesPlacedCount: Count<EdoStepNotationIndices> = 1 as Count<EdoStepNotationIndices>

    // TODO: extract this and put more stuff on chaining state, to better parallel the other phases in this module
    while (!areLinksComplete) {
        candidateEdoStepLinkIndices = edoStepLinkIndices.slice()
        chainingState = chainingStates[way]
        chainingState.edoStep = mod(chainingState.edoStep + way * fifthStep, edo) as EdoStep

        if (!isUndefined(candidateEdoStepLinkIndices[chainingState.edoStep])) {
            areLinksComplete = true
        } else {
            edoStepNotationIndicesPlacedCount++
            chainingState.linkIndex = chainingState.linkIndex + way as Index<Link>
            candidateEdoStepLinkIndices[chainingState.edoStep] = chainingState.linkIndex
        }

        if (!areLinksComplete && useOnlyPlainNominals && edoStepNotationIndicesPlacedCount as Count === NOMINAL_COUNT) areLinksComplete = true

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

    return computeLinkEdoStepNotationIndicesListFromEdoStepLinks(
        edoStepLinkIndices as Index<Link>[]
    )
}


export {
    computeDefaultSingleSpellingLinkEdoStepNotationIndicesList,
}
