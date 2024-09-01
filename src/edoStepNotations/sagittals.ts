import { Count, Index, ZERO_ONE_INDEX_DIFF, computeRange } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { Edo, EdoStep, EdoStepNotation, Link } from "../types"
import { Priority, Direction } from "./types"

const DIRECTIONAL_PRIORITIES: Priority[] = Object.values(Direction)
    .map((direction: string | Direction): Priority => ({ direction: direction as Direction }))

// TODO: rename this "direction" to "way"

const LINK_AND_DIRECTIONAL_PRIORITIES: Priority[] = [
    // SECTION_(P/N)1A
    { linkIndexRestriction: -3, direction: Direction.UP },       // 1:  F   up   (essentially / occasionally literally F#)
    { linkIndexRestriction: 3, direction: Direction.DOWN },      // 2:  B   down (essentially / occasionally literally Bb)
    { linkIndexRestriction: -2, direction: Direction.UP },       // 3:  C   up   (essentially / occasionally literally C#)
    { linkIndexRestriction: 2, direction: Direction.DOWN },      // 4:  E   down (essentially / occasionally literally Eb)
    { linkIndexRestriction: -1, direction: Direction.UP },       // 5:  G   up   (essentially / occasionally literally G#)
    { linkIndexRestriction: 1, direction: Direction.DOWN },      // 6:  A   down (essentially / occasionally literally Ab)
    { linkIndexRestriction: 0, direction: Direction.UP },        // 7:  D   up   (essentially / occasionally literally D#)
    { linkIndexRestriction: 0, direction: Direction.DOWN },      // 8:  D   down (essentially / occasionally literally Db)
    { linkIndexRestriction: 1, direction: Direction.UP },        // 9:  A   up   (essentially / occasionally literally A#)
    { linkIndexRestriction: -1, direction: Direction.DOWN },     // 10: G   down (essentially / occasionally literally Gb)
    { linkIndexRestriction: 2, direction: Direction.UP },        // 11: E   up   (essentially / occasionally literally E#)
    { linkIndexRestriction: -2, direction: Direction.DOWN },     // 12: C   down (essentially / occasionally literally Cb)
    { linkIndexRestriction: 3, direction: Direction.UP },        // 13: B   up   (essentially / occasionally literally B#)
    { linkIndexRestriction: -3, direction: Direction.DOWN },     // 14: F   down (essentially / occasionally literally Fb)

    // SECTION_(P/N)1T
    { linkIndexRestriction: 4, direction: Direction.DOWN },      // 15: F#  down 
    { linkIndexRestriction: -4, direction: Direction.UP },       // 16: Bb  up   
    { linkIndexRestriction: 5, direction: Direction.DOWN },      // 17: C#  down 
    { linkIndexRestriction: -5, direction: Direction.UP },       // 18: Eb  up   
    { linkIndexRestriction: 6, direction: Direction.DOWN },      // 19: G#  down 
    { linkIndexRestriction: -6, direction: Direction.UP },       // 20: Ab  up   
    { linkIndexRestriction: 7, direction: Direction.DOWN },      // 21: D#  down 
    { linkIndexRestriction: -7, direction: Direction.UP },       // 22: Db  up   
    { linkIndexRestriction: 8, direction: Direction.DOWN },      // 23: A#  down 
    { linkIndexRestriction: -8, direction: Direction.UP },       // 24: Gb  up   
    { linkIndexRestriction: 9, direction: Direction.DOWN },      // 25: E#  down 
    { linkIndexRestriction: -9, direction: Direction.UP },       // 26: Cb  up   
    { linkIndexRestriction: 10, direction: Direction.DOWN },     // 27: B#  down 
    { linkIndexRestriction: -10, direction: Direction.UP },      // 28: Fb  up   

    // SECTION_(P/N)2A
    { linkIndexRestriction: 4, direction: Direction.UP },        // 29: F#  up   (essentially / occasionally literally F##)
    { linkIndexRestriction: -4, direction: Direction.DOWN },     // 30: Bb  down (essentially / occasionally literally Bbb)
    { linkIndexRestriction: 5, direction: Direction.UP },        // 31: C#  up   (essentially / occasionally literally C##)
    { linkIndexRestriction: -5, direction: Direction.DOWN },     // 32: Eb  down (essentially / occasionally literally Ebb)
    { linkIndexRestriction: 6, direction: Direction.UP },        // 33: G#  up   (essentially / occasionally literally G##)
    { linkIndexRestriction: -6, direction: Direction.DOWN },     // 34: Ab  down (essentially / occasionally literally Abb)
    { linkIndexRestriction: 7, direction: Direction.UP },        // 35: D#  up   (essentially / occasionally literally D##)
    { linkIndexRestriction: -7, direction: Direction.DOWN },     // 36: Db  down (essentially / occasionally literally Dbb)
    { linkIndexRestriction: 8, direction: Direction.UP },        // 37: A#  up   (essentially / occasionally literally A##)
    { linkIndexRestriction: -8, direction: Direction.DOWN },     // 38: Gb  down (essentially / occasionally literally Gbb)
    { linkIndexRestriction: 9, direction: Direction.UP },        // 39: E#  up   (essentially / occasionally literally E##)
    { linkIndexRestriction: -9, direction: Direction.DOWN },     // 40: Cb  down (essentially / occasionally literally Cbb)
    { linkIndexRestriction: 10, direction: Direction.UP },       // 41: B#  up   (essentially / occasionally literally B##)
    { linkIndexRestriction: -10, direction: Direction.DOWN },    // 42: Fb  down (essentially / occasionally literally Fbb)

    // SECTION_(P/N)2T
    { linkIndexRestriction: 11, direction: Direction.DOWN },     // 43: F## down 
    { linkIndexRestriction: -11, direction: Direction.UP },      // 44: Bbb up   
    { linkIndexRestriction: 12, direction: Direction.DOWN },     // 45: C## down 
    { linkIndexRestriction: -12, direction: Direction.UP },      // 46: Ebb up   
    { linkIndexRestriction: 13, direction: Direction.DOWN },     // 47: G## down 
    { linkIndexRestriction: -13, direction: Direction.UP },      // 48: Abb up   
    { linkIndexRestriction: 14, direction: Direction.DOWN },     // 49: D## down 
    { linkIndexRestriction: -14, direction: Direction.UP },      // 50: Dbb up   
    { linkIndexRestriction: 15, direction: Direction.DOWN },     // 51: A## down 
    { linkIndexRestriction: -15, direction: Direction.UP },      // 52: Gbb up   
    { linkIndexRestriction: 16, direction: Direction.DOWN },     // 53: E## down 
    { linkIndexRestriction: -16, direction: Direction.UP },      // 54: Cbb up   
    { linkIndexRestriction: 17, direction: Direction.DOWN },     // 55: B## down 
    { linkIndexRestriction: -17, direction: Direction.UP },      // 56: Fbb up   
] as Priority[]

const computeIsNotationComplete = (edoStepNotations: EdoStepNotation[]) =>
    edoStepNotations.reduce(
        (notatedStepCount: Count<EdoStepNotation>, edoStep: EdoStepNotation): Count<EdoStepNotation> =>
            notatedStepCount + (!!edoStep ? 1 : 0) as Count<EdoStepNotation>,
        0 as Count<EdoStepNotation>
    ) == edoStepNotations.length as Count<EdoStepNotation>

const equalGapsBetweenLinks = (linkEdoStepNotations: EdoStepNotation[]): boolean =>
    computeRange(linkEdoStepNotations.length as Edo).reduce(
        (
            {
                allPreviousGapSizes,
                currentGapSize,
                equalGapsBetweenLinks
            }: { allPreviousGapSizes: Count<EdoStep>, currentGapSize: Count<EdoStep>, equalGapsBetweenLinks: boolean },
            i: number
        ): { allPreviousGapSizes: Count<EdoStep>, currentGapSize: Count<EdoStep>, equalGapsBetweenLinks: boolean } => {
            if (!equalGapsBetweenLinks) return { allPreviousGapSizes, currentGapSize, equalGapsBetweenLinks }

            if (linkEdoStepNotations[i]) {
                if (!allPreviousGapSizes) allPreviousGapSizes = currentGapSize
                if (currentGapSize != allPreviousGapSizes) equalGapsBetweenLinks = false
                currentGapSize = 0 as Count<EdoStep>
            } else {
                currentGapSize++
            }

            return { allPreviousGapSizes, currentGapSize, equalGapsBetweenLinks }
        },
        {
            allPreviousGapSizes: undefined as any as Count<EdoStep>,
            currentGapSize: 0 as Count<EdoStep>,
            equalGapsBetweenLinks: true
        }
    ).equalGapsBetweenLinks

const placeAllOfGivenDirectedSagittal = (
    edoStepNotations: EdoStepNotation[],
    placingSagittalIndex: Index<Sagittal>,
    direction: Direction,
    { edo, linkIndexRestriction }: { edo: Edo, linkIndexRestriction?: Index<Link> }
): void =>
    edoStepNotations.forEach((edoStepNotation: EdoStepNotation, edoStep: number): void => {
        if (!edoStepNotation) return

        const { linkIndex, sagittalIndex } = edoStepNotation
        if (linkIndexRestriction !== undefined && linkIndex !== linkIndexRestriction) return

        if (direction * sagittalIndex == placingSagittalIndex - 1) {
            const neighborIndex: Index<EdoStepNotation> = (edoStep + edo + direction) % edo as Index<EdoStepNotation>
            if (!edoStepNotations[neighborIndex]) {
                edoStepNotations[neighborIndex] = {
                    linkIndex,
                    sagittalIndex: direction * placingSagittalIndex as Index<Sagittal>,
                }
            }
        }
    })

const placeSagittalsAccordingToPriorities = (edoStepNotations: EdoStepNotation[], sagittals: Sagittal[], priorities: Priority[], { edo }: { edo: Edo }) => {
    let isNotationComplete = false

    computeRange(sagittals.length as Count<Sagittal>).forEach((sagittalZeroIndex: number): void => {
        if (isNotationComplete) return
        const placingSagittalIndex = sagittalZeroIndex + ZERO_ONE_INDEX_DIFF as Index<Sagittal>

        priorities.forEach(({ linkIndexRestriction, direction }: Priority): void => {
            if (isNotationComplete) return

            placeAllOfGivenDirectedSagittal(edoStepNotations, placingSagittalIndex, direction, { linkIndexRestriction, edo })

            isNotationComplete = computeIsNotationComplete(edoStepNotations)
        })
    })

    return edoStepNotations as EdoStepNotation[]
}

const placeSagittalEdoStepNotations = (linkEdoStepNotations: EdoStepNotation[], { edo, sagittals }: { edo: Edo, sagittals: Sagittal[] }): EdoStepNotation[] => {
    const priorities = equalGapsBetweenLinks(linkEdoStepNotations) ?
        DIRECTIONAL_PRIORITIES :
        LINK_AND_DIRECTIONAL_PRIORITIES

    return placeSagittalsAccordingToPriorities(linkEdoStepNotations, sagittals, priorities, { edo })
}

export {
    placeSagittalEdoStepNotations,
}
