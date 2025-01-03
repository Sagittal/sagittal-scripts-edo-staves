import {
    Index,
    Maybe,
    Count,
    isUndefined,
    mod,
    EdoStep,
    Edo,
    indexOf,
    Integer,
    Decimal,
} from "@sagittal/general"
import { Sagittal, Link, Nominal, NOMINALS, Spelling } from "@sagittal/system"
import { LIMMA_LESS_THAN_OR_EQUAL_TO_ZERO_NOMINAL_COUNT, NOMINAL_COUNT } from "./constants"
import { computeHaveNominalsCrossed } from "./nominalCrossing"
import { Way, ChainingState } from "./types"

const computeDStep = ({ edo, fifthStep }: { edo: Edo; fifthStep: EdoStep }): EdoStep =>
    mod(
        (fifthStep * (indexOf(NOMINALS, Nominal.D) - indexOf(NOMINALS, Nominal.C))) as Decimal<Integer>,
        edo,
    ) as EdoStep

const computeLinkSpellingsFromEdoStepLinks = (edoStepLinkIndices: Index<Link>[]): Spelling[] =>
    edoStepLinkIndices.map(
        (linkIndex: Index<Link>): Spelling => ({
            linkIndex,
            sagittalIndex: 0 as Index<Sagittal>,
        }),
    )

const computeDefaultSingleSpellingLinkSpellings = ({
    edo,
    fifthStep,
    useOnlyPlainNominals,
    limmaStep,
}: {
    edo: Edo
    fifthStep: EdoStep
    useOnlyPlainNominals: boolean
    limmaStep: EdoStep
}): Spelling[] => {
    const dStep: EdoStep = computeDStep({ edo, fifthStep })

    let edoStepLinkIndices: Maybe<Index<Link>>[] = Array(edo) as Maybe<Index<Link>>[]
    edoStepLinkIndices[dStep] = 0 as Index<Link>
    let candidateEdoStepLinkIndices: Maybe<Index<Link>>[] = Array(edo) as Maybe<Index<Link>>[]

    let chainingState: ChainingState
    let way: Way = Way.UP
    const chainingStates: Record<Way, ChainingState> = {
        [Way.UP]: { edoStep: dStep, linkIndex: 0 as Index<Link> },
        [Way.DOWN]: { edoStep: dStep, linkIndex: 0 as Index<Link> },
    }

    let areLinksComplete = false

    let spellingPlacedCount: Count<Spelling> = 1 as Count<Spelling>

    while (!areLinksComplete) {
        candidateEdoStepLinkIndices = edoStepLinkIndices.slice()
        chainingState = chainingStates[way]
        chainingState.edoStep = mod(
            (chainingState.edoStep + way * fifthStep) as Decimal<Integer>,
            edo,
        ) as EdoStep

        if (!isUndefined(candidateEdoStepLinkIndices[chainingState.edoStep])) {
            areLinksComplete = true
        } else {
            spellingPlacedCount++
            chainingState.linkIndex = (chainingState.linkIndex + way) as Index<Link>
            candidateEdoStepLinkIndices[chainingState.edoStep] = chainingState.linkIndex
        }

        if (
            !areLinksComplete &&
            limmaStep <= 0 &&
            spellingPlacedCount ===
                (LIMMA_LESS_THAN_OR_EQUAL_TO_ZERO_NOMINAL_COUNT as Count as Count<Spelling>)
        )
            areLinksComplete = true
        if (
            !areLinksComplete &&
            useOnlyPlainNominals &&
            spellingPlacedCount === (NOMINAL_COUNT as Count as Count<Spelling>)
        )
            areLinksComplete = true

        if (!areLinksComplete && computeHaveNominalsCrossed(candidateEdoStepLinkIndices)) {
            areLinksComplete = true
        } else {
            edoStepLinkIndices = candidateEdoStepLinkIndices
        }

        way = way === Way.UP ? Way.DOWN : Way.UP
    }

    return computeLinkSpellingsFromEdoStepLinks(edoStepLinkIndices as Index<Link>[])
}

export { computeDefaultSingleSpellingLinkSpellings }
