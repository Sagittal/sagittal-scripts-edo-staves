import { Index, isUndefined, Maybe } from "@sagittal/general"
import { Link, Nominal, NOMINALS } from "@sagittal/system"
import { Difference } from "./types"
import { NOMINAL_COUNT, ENOUGH_WHORLS_TO_GUARANTEE_POSITIVE_VALUE_BEFORE_MODULUS } from "./constants"

const NOMINALS_IN_CHROMATIC_ORDER: Nominal[] =
    NOMINALS.slice().sort()

const NOMINAL_INDEX_DIFFERENCE_FOR_SAME_NOMINAL: Difference<Index<Nominal>> =
    0 as Difference<Index<Nominal>>
const NOMINAL_INDEX_DIFFERENCE_FOR_NEXT_NOMINAL: Difference<Index<Nominal>> =
    1 as Difference<Index<Nominal>>
const NOMINAL_INDEX_DIFFERENCE_FOR_NEXT_NOMINAL_WHEN_WRAPPING_FROM_G_BACK_TO_A: Difference<Index<Nominal>> =
    -6 as Difference<Index<Nominal>>

const INDEX_OF_D_IN_NOMINALS_IN_CHROMATIC_ORDER: Index<Nominal> = NOMINALS_IN_CHROMATIC_ORDER.indexOf(Nominal.D) as Index<Nominal>

const computeNominalIndex = (edoStepLinkIndex: Index<Link>): Index<Nominal> =>
    NOMINALS_IN_CHROMATIC_ORDER.indexOf(
        NOMINALS[
        (edoStepLinkIndex + NOMINAL_COUNT * ENOUGH_WHORLS_TO_GUARANTEE_POSITIVE_VALUE_BEFORE_MODULUS + INDEX_OF_D_IN_NOMINALS_IN_CHROMATIC_ORDER) % NOMINAL_COUNT
        ]
    ) as Index<Nominal>

const computeHaveNominalsCrossed = (edoStepLinkIndices: Maybe<Index<Link>>[]): boolean => {
    const edoStepLinkIndicesWithNoGaps: Index<Link>[] = edoStepLinkIndices.filter(
        (edoStepLinkIndex: Maybe<Index<Link>>): boolean =>
            !isUndefined(edoStepLinkIndex)
    ) as Index<Link>[]

    if (edoStepLinkIndicesWithNoGaps.length <= NOMINAL_COUNT) return false

    let shouldStopPlacingLinksDueToNominalCrossing: boolean = false
    let nominalIndexDifference: Difference<Index<Nominal>>

    edoStepLinkIndicesWithNoGaps
        .concat(edoStepLinkIndicesWithNoGaps) // to ensure we check the notation cyclically, from B at the end back around to C at the beginning
        .reduce((previousEdoStepLinkIndex: Index<Link>, edoStepLinkIndex: Index<Link>): Index<Link> => {
            nominalIndexDifference = computeNominalIndex(edoStepLinkIndex) - computeNominalIndex(previousEdoStepLinkIndex) as Difference<Index<Nominal>>

            if (
                nominalIndexDifference != NOMINAL_INDEX_DIFFERENCE_FOR_SAME_NOMINAL &&
                nominalIndexDifference != NOMINAL_INDEX_DIFFERENCE_FOR_NEXT_NOMINAL &&
                nominalIndexDifference != NOMINAL_INDEX_DIFFERENCE_FOR_NEXT_NOMINAL_WHEN_WRAPPING_FROM_G_BACK_TO_A
            ) {
                shouldStopPlacingLinksDueToNominalCrossing = true
            }

            return edoStepLinkIndex // next previous edo step link index, per `reduce`
        })

    return shouldStopPlacingLinksDueToNominalCrossing
}

export {
    computeHaveNominalsCrossed,
}
