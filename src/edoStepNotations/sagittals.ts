import { Count, Index, Maybe, ZERO_ONE_INDEX_DIFF, computeRange } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { Edo, EdoStepNotation } from "../types"
import { Priority, Direction } from "./types"

const LINK_RELATIVE_NOTATIONAL_PRIORITIES: Priority[] = [
    // SECTION_(P/N)1A
    { linkIndex: -3, direction: Direction.UP },       // 1:  F   up   (essentially / occasionally literally F#)
    { linkIndex: 3, direction: Direction.DOWN },      // 2:  B   down (essentially / occasionally literally Bb)
    { linkIndex: -2, direction: Direction.UP },       // 3:  C   up   (essentially / occasionally literally C#)
    { linkIndex: 2, direction: Direction.DOWN },      // 4:  E   down (essentially / occasionally literally Eb)
    { linkIndex: -1, direction: Direction.UP },       // 5:  G   up   (essentially / occasionally literally G#)
    { linkIndex: 1, direction: Direction.DOWN },      // 6:  A   down (essentially / occasionally literally Ab)
    { linkIndex: 0, direction: Direction.UP },        // 7:  D   up   (essentially / occasionally literally D#)
    { linkIndex: 0, direction: Direction.DOWN },      // 8:  D   down (essentially / occasionally literally Db)
    { linkIndex: 1, direction: Direction.UP },        // 9:  A   up   (essentially / occasionally literally A#)
    { linkIndex: -1, direction: Direction.DOWN },     // 10: G   down (essentially / occasionally literally Gb)
    { linkIndex: 2, direction: Direction.UP },        // 11: E   up   (essentially / occasionally literally E#)
    { linkIndex: -2, direction: Direction.DOWN },     // 12: C   down (essentially / occasionally literally Cb)
    { linkIndex: 3, direction: Direction.UP },        // 13: B   up   (essentially / occasionally literally B#)
    { linkIndex: -3, direction: Direction.DOWN },     // 14: F   down (essentially / occasionally literally Fb)

    // SECTION_(P/N)1T
    { linkIndex: 4, direction: Direction.DOWN },      // 15: F#  down 
    { linkIndex: -4, direction: Direction.UP },       // 16: Bb  up   
    { linkIndex: 5, direction: Direction.DOWN },      // 17: C#  down 
    { linkIndex: -5, direction: Direction.UP },       // 18: Eb  up   
    { linkIndex: 6, direction: Direction.DOWN },      // 19: G#  down 
    { linkIndex: -6, direction: Direction.UP },       // 20: Ab  up   
    { linkIndex: 7, direction: Direction.DOWN },      // 21: D#  down 
    { linkIndex: -7, direction: Direction.UP },       // 22: Db  up   
    { linkIndex: 8, direction: Direction.DOWN },      // 23: A#  down 
    { linkIndex: -8, direction: Direction.UP },       // 24: Gb  up   
    { linkIndex: 9, direction: Direction.DOWN },      // 25: E#  down 
    { linkIndex: -9, direction: Direction.UP },       // 26: Cb  up   
    { linkIndex: 10, direction: Direction.DOWN },     // 27: B#  down 
    { linkIndex: -10, direction: Direction.UP },      // 28: Fb  up   

    // SECTION_(P/N)2A
    { linkIndex: 4, direction: Direction.UP },        // 29: F#  up   (essentially / occasionally literally F##)
    { linkIndex: -4, direction: Direction.DOWN },     // 30: Bb  down (essentially / occasionally literally Bbb)
    { linkIndex: 5, direction: Direction.UP },        // 31: C#  up   (essentially / occasionally literally C##)
    { linkIndex: -5, direction: Direction.DOWN },     // 32: Eb  down (essentially / occasionally literally Ebb)
    { linkIndex: 6, direction: Direction.UP },        // 33: G#  up   (essentially / occasionally literally G##)
    { linkIndex: -6, direction: Direction.DOWN },     // 34: Ab  down (essentially / occasionally literally Abb)
    { linkIndex: 7, direction: Direction.UP },        // 35: D#  up   (essentially / occasionally literally D##)
    { linkIndex: -7, direction: Direction.DOWN },     // 36: Db  down (essentially / occasionally literally Dbb)
    { linkIndex: 8, direction: Direction.UP },        // 37: A#  up   (essentially / occasionally literally A##)
    { linkIndex: -8, direction: Direction.DOWN },     // 38: Gb  down (essentially / occasionally literally Gbb)
    { linkIndex: 9, direction: Direction.UP },        // 39: E#  up   (essentially / occasionally literally E##)
    { linkIndex: -9, direction: Direction.DOWN },     // 40: Cb  down (essentially / occasionally literally Cbb)
    { linkIndex: 10, direction: Direction.UP },       // 41: B#  up   (essentially / occasionally literally B##)
    { linkIndex: -10, direction: Direction.DOWN },    // 42: Fb  down (essentially / occasionally literally Fbb)

    // SECTION_(P/N)2T
    { linkIndex: 11, direction: Direction.DOWN },     // 43: F## down 
    { linkIndex: -11, direction: Direction.UP },      // 44: Bbb up   
    { linkIndex: 12, direction: Direction.DOWN },     // 45: C## down 
    { linkIndex: -12, direction: Direction.UP },      // 46: Ebb up   
    { linkIndex: 13, direction: Direction.DOWN },     // 47: G## down 
    { linkIndex: -13, direction: Direction.UP },      // 48: Abb up   
    { linkIndex: 14, direction: Direction.DOWN },     // 49: D## down 
    { linkIndex: -14, direction: Direction.UP },      // 50: Dbb up   
    { linkIndex: 15, direction: Direction.DOWN },     // 51: A## down 
    { linkIndex: -15, direction: Direction.UP },      // 52: Gbb up   
    { linkIndex: 16, direction: Direction.DOWN },     // 53: E## down 
    { linkIndex: -16, direction: Direction.UP },      // 54: Cbb up   
    { linkIndex: 17, direction: Direction.DOWN },     // 55: B## down 
    { linkIndex: -17, direction: Direction.UP },      // 56: Fbb up   
] as Priority[]

const computeIsNotationComplete = (edoStepNotations: Maybe<EdoStepNotation>[]) =>
    edoStepNotations.reduce(
        (notatedStepCount: Count<EdoStepNotation>, edoStep: Maybe<EdoStepNotation>): Count<EdoStepNotation> =>
            notatedStepCount + (!!edoStep ? 1 : 0) as Count<EdoStepNotation>,
        0 as Count<EdoStepNotation>
    ) == edoStepNotations.length as Count<EdoStepNotation>

const addSagittalEdoStepNotations = (linkEdoStepNotations: Maybe<EdoStepNotation>[], { edo, sagittals }: { edo: Edo, sagittals: Sagittal[] }): EdoStepNotation[] => {
    const edoStepNotations: Maybe<EdoStepNotation>[] = linkEdoStepNotations.slice()

    let isNotationComplete = false
    computeRange(sagittals.length as Count<Sagittal>).forEach((sagittalZeroIndex: number): void => {
        if (isNotationComplete) return
        const prioritySagittalIndex = sagittalZeroIndex + ZERO_ONE_INDEX_DIFF as Index<Sagittal>

        LINK_RELATIVE_NOTATIONAL_PRIORITIES.forEach(({ linkIndex: priorityLinkIndex, direction }: Priority) => {
            if (isNotationComplete) return

            edoStepNotations.forEach((edoStepNotation: Maybe<EdoStepNotation>, edoStep: number) => {
                if (!edoStepNotation) return

                const { linkIndex, sagittalIndex } = edoStepNotation
                if (linkIndex !== priorityLinkIndex) return

                if (direction * sagittalIndex == prioritySagittalIndex - 1) {
                    const neighborIndex: Index<EdoStepNotation> = (edoStep + edo + direction) % edo as Index<EdoStepNotation>

                    if (!edoStepNotations[neighborIndex]) {
                        edoStepNotations[neighborIndex] = {
                            linkIndex,
                            sagittalIndex: direction * prioritySagittalIndex as Index<Sagittal>,
                        }
                    }
                }
            })

            isNotationComplete = computeIsNotationComplete(edoStepNotations)
        })
    })

    return edoStepNotations as EdoStepNotation[]
}

export {
    addSagittalEdoStepNotations,
}
