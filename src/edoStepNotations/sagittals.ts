import { Count, Index, ZERO_ONE_INDEX_DIFF, computeRange } from "@sagittal/general"
import { Edo, EdoStep, EdoStepNotation, Link, Sagittal } from "@sagittal/system"
import { Priority, Way } from "./types"

const WAY_PRIORITIES: Priority[] = Object.values(Way)
    .map((way: string | Way): Priority => ({ way: way as Way }))

const LINK_AND_WAY_PRIORITIES: Priority[] = [
    // SECTION_(P/N)1A
    { linkIndexRestriction: -3, way: Way.UP },       // 1:  F   up   (essentially / occasionally literally F#)
    { linkIndexRestriction: 3, way: Way.DOWN },      // 2:  B   down (essentially / occasionally literally Bb)
    { linkIndexRestriction: -2, way: Way.UP },       // 3:  C   up   (essentially / occasionally literally C#)
    { linkIndexRestriction: 2, way: Way.DOWN },      // 4:  E   down (essentially / occasionally literally Eb)
    { linkIndexRestriction: -1, way: Way.UP },       // 5:  G   up   (essentially / occasionally literally G#)
    { linkIndexRestriction: 1, way: Way.DOWN },      // 6:  A   down (essentially / occasionally literally Ab)
    { linkIndexRestriction: 0, way: Way.UP },        // 7:  D   up   (essentially / occasionally literally D#)
    { linkIndexRestriction: 0, way: Way.DOWN },      // 8:  D   down (essentially / occasionally literally Db)
    { linkIndexRestriction: 1, way: Way.UP },        // 9:  A   up   (essentially / occasionally literally A#)
    { linkIndexRestriction: -1, way: Way.DOWN },     // 10: G   down (essentially / occasionally literally Gb)
    { linkIndexRestriction: 2, way: Way.UP },        // 11: E   up   (essentially / occasionally literally E#)
    { linkIndexRestriction: -2, way: Way.DOWN },     // 12: C   down (essentially / occasionally literally Cb)
    { linkIndexRestriction: 3, way: Way.UP },        // 13: B   up   (essentially / occasionally literally B#)
    { linkIndexRestriction: -3, way: Way.DOWN },     // 14: F   down (essentially / occasionally literally Fb)

    // SECTION_(P/N)1T
    { linkIndexRestriction: 4, way: Way.DOWN },      // 15: F#  down 
    { linkIndexRestriction: -4, way: Way.UP },       // 16: Bb  up   
    { linkIndexRestriction: 5, way: Way.DOWN },      // 17: C#  down 
    { linkIndexRestriction: -5, way: Way.UP },       // 18: Eb  up   
    { linkIndexRestriction: 6, way: Way.DOWN },      // 19: G#  down 
    { linkIndexRestriction: -6, way: Way.UP },       // 20: Ab  up   
    { linkIndexRestriction: 7, way: Way.DOWN },      // 21: D#  down 
    { linkIndexRestriction: -7, way: Way.UP },       // 22: Db  up   
    { linkIndexRestriction: 8, way: Way.DOWN },      // 23: A#  down 
    { linkIndexRestriction: -8, way: Way.UP },       // 24: Gb  up   
    { linkIndexRestriction: 9, way: Way.DOWN },      // 25: E#  down 
    { linkIndexRestriction: -9, way: Way.UP },       // 26: Cb  up   
    { linkIndexRestriction: 10, way: Way.DOWN },     // 27: B#  down 
    { linkIndexRestriction: -10, way: Way.UP },      // 28: Fb  up   

    // SECTION_(P/N)2A
    { linkIndexRestriction: 4, way: Way.UP },        // 29: F#  up   (essentially / occasionally literally F##)
    { linkIndexRestriction: -4, way: Way.DOWN },     // 30: Bb  down (essentially / occasionally literally Bbb)
    { linkIndexRestriction: 5, way: Way.UP },        // 31: C#  up   (essentially / occasionally literally C##)
    { linkIndexRestriction: -5, way: Way.DOWN },     // 32: Eb  down (essentially / occasionally literally Ebb)
    { linkIndexRestriction: 6, way: Way.UP },        // 33: G#  up   (essentially / occasionally literally G##)
    { linkIndexRestriction: -6, way: Way.DOWN },     // 34: Ab  down (essentially / occasionally literally Abb)
    { linkIndexRestriction: 7, way: Way.UP },        // 35: D#  up   (essentially / occasionally literally D##)
    { linkIndexRestriction: -7, way: Way.DOWN },     // 36: Db  down (essentially / occasionally literally Dbb)
    { linkIndexRestriction: 8, way: Way.UP },        // 37: A#  up   (essentially / occasionally literally A##)
    { linkIndexRestriction: -8, way: Way.DOWN },     // 38: Gb  down (essentially / occasionally literally Gbb)
    { linkIndexRestriction: 9, way: Way.UP },        // 39: E#  up   (essentially / occasionally literally E##)
    { linkIndexRestriction: -9, way: Way.DOWN },     // 40: Cb  down (essentially / occasionally literally Cbb)
    { linkIndexRestriction: 10, way: Way.UP },       // 41: B#  up   (essentially / occasionally literally B##)
    { linkIndexRestriction: -10, way: Way.DOWN },    // 42: Fb  down (essentially / occasionally literally Fbb)

    // SECTION_(P/N)2T
    { linkIndexRestriction: 11, way: Way.DOWN },     // 43: F## down 
    { linkIndexRestriction: -11, way: Way.UP },      // 44: Bbb up   
    { linkIndexRestriction: 12, way: Way.DOWN },     // 45: C## down 
    { linkIndexRestriction: -12, way: Way.UP },      // 46: Ebb up   
    { linkIndexRestriction: 13, way: Way.DOWN },     // 47: G## down 
    { linkIndexRestriction: -13, way: Way.UP },      // 48: Abb up   
    { linkIndexRestriction: 14, way: Way.DOWN },     // 49: D## down 
    { linkIndexRestriction: -14, way: Way.UP },      // 50: Dbb up   
    { linkIndexRestriction: 15, way: Way.DOWN },     // 51: A## down 
    { linkIndexRestriction: -15, way: Way.UP },      // 52: Gbb up   
    { linkIndexRestriction: 16, way: Way.DOWN },     // 53: E## down 
    { linkIndexRestriction: -16, way: Way.UP },      // 54: Cbb up   
    { linkIndexRestriction: 17, way: Way.DOWN },     // 55: B## down 
    { linkIndexRestriction: -17, way: Way.UP },      // 56: Fbb up   
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
    way: Way,
    { edo, linkIndexRestriction }: { edo: Edo, linkIndexRestriction?: Index<Link> }
): void =>
    edoStepNotations.forEach((edoStepNotation: EdoStepNotation, edoStep: number): void => {
        if (!edoStepNotation) return

        const { linkIndex, sagittalIndex } = edoStepNotation
        if (linkIndexRestriction !== undefined && linkIndex !== linkIndexRestriction) return
        if (linkIndex >= 10 && way > 0) return
        if (linkIndex <= -10 && way < 0) return

        if (way * sagittalIndex == placingSagittalIndex - 1) {
            const neighborIndex: Index<EdoStepNotation> = (edoStep + edo + way) % edo as Index<EdoStepNotation>
            if (!edoStepNotations[neighborIndex]) {
                edoStepNotations[neighborIndex] = {
                    linkIndex,
                    sagittalIndex: way * placingSagittalIndex as Index<Sagittal>,
                }
            }
        }
    })

const placeSagittalsAccordingToPriorities = (edoStepNotations: EdoStepNotation[], sagittals: Sagittal[], priorities: Priority[], { edo }: { edo: Edo }) => {
    let isNotationComplete = false

    computeRange(sagittals.length as Count<Sagittal>).forEach((sagittalZeroIndex: number): void => {
        if (isNotationComplete) return
        const placingSagittalIndex = sagittalZeroIndex + ZERO_ONE_INDEX_DIFF as Index<Sagittal>

        priorities.forEach(({ linkIndexRestriction, way }: Priority): void => {
            if (isNotationComplete) return

            placeAllOfGivenDirectedSagittal(edoStepNotations, placingSagittalIndex, way, { linkIndexRestriction, edo })

            isNotationComplete = computeIsNotationComplete(edoStepNotations)
        })
    })

    return edoStepNotations as EdoStepNotation[]
}

const placeSagittalEdoStepNotations = (linkEdoStepNotations: EdoStepNotation[], { edo, sagittals }: { edo: Edo, sagittals: Sagittal[] }): EdoStepNotation[] => {
    const priorities = equalGapsBetweenLinks(linkEdoStepNotations) ?
        WAY_PRIORITIES :
        LINK_AND_WAY_PRIORITIES

    return placeSagittalsAccordingToPriorities(linkEdoStepNotations, sagittals, priorities, { edo })
}

export {
    placeSagittalEdoStepNotations,
}
