import { computeRange, Index, Maybe } from "@sagittal/general"
import { Edo, Link, EdoStep, Nominal, Whorl, Spelling } from "./types"
import { Sagittal } from "@sagittal/system"

const LINK_INDEX_TO_NOMINALS: string[] =
    // Array(
    //     Object
    //         .values(Whorl)
    //         .length
    // )
    //     .fill(
    Object
        .values(Nominal)
// )
// .flat()

const computeLinkSpellings = ({ edo, fifthStep, useOnlyPlainNominals }: {
    edo: Edo,
    fifthStep: EdoStep,
    useOnlyPlainNominals: boolean,
}): Maybe<Spelling>[] => {
    // console.log('hjello presss')
    // if (useOnlyPlainNominals) {
    //     const cIsZeroLinkIndexRange = computeRange(-1 as Index<Link>, 6 as Index<Link>)

    //     // c is zero here because we want the notation to be based on c 
    //     const linkSteps: EdoStep[] = cIsZeroLinkIndexRange
    //         .map((linkIndex: Index<Link>): EdoStep => linkIndex * fifthStep % edo as EdoStep)
    //         .map((linkStep: EdoStep): EdoStep => linkStep < 0 ? linkStep + edo as EdoStep : linkStep)

    //     // console.log("linkSteps: ", linkSteps)

    //     const spellings = [] as Spelling[]

    //     linkSteps.forEach((ls, i) => {
    //         spellings[ls] = {
    //             linkIndex: i - 3,
    //             sagittalIndex: 0,
    //         } as Spelling
    //     })

    //     return spellings
    // } else {
    // console.log('hjello preswwegasdgdsadgdss')

    // const cIsZeroLinkIndexRange = computeRange(-15 as Index<Link>, 20 as Index<Link>)

    // let thing: Index = -17 as Index // dIsZeroLinkIndex?

    // // c is zero here because we want the notation to be based on c
    // const linkStepsWithIndicesAndNominals: [Nominal, Index, EdoStep][] = cIsZeroLinkIndexRange
    //     .map((linkIndex: Index<Link>): [Nominal, Index, EdoStep] => [LINK_INDEX_TO_NOMINALS[(thing + 21 + 1) % 7], thing++, linkIndex * fifthStep % edo] as [Nominal, Index, EdoStep])
    //     .map(([_, __, linkStep]: [Nominal, Index, EdoStep]): [Nominal, Index, EdoStep] => [_, __, linkStep < 0 ? linkStep + edo as EdoStep : linkStep])
    //     .sort(([_, __, aLinkStep]: [Nominal, Index, EdoStep], [___, ____, bLinkStep]: [Nominal, Index, EdoStep]): number => {
    //         return aLinkStep - bLinkStep
    //     })

    //     console.log("linkStepsWithIndicesAndNominals: ", linkStepsWithIndicesAndNominals)


    // let nominalsCrossed = true
    // while (nominalsCrossed) {
    //     nominalsCrossed = checkIfNominalsCrossed(linkStepsWithIndicesAndNominals)

    // }

    // console.log(LINK_INDEX_TO_NOMINALS)
    const thing: [Index<Link>, Nominal][] = Array(edo)
    const dStep = fifthStep * 2 % edo
    let currentEdoStepChainingUpward = dStep
    let currentEdoStepChainingDownward = dStep
    let currentLinkIndexChainingUpward = 0
    let currentLinkIndexChainingDownward = 0
    let chainingUpward
    thing[dStep] = [0 as Index<Link>, Nominal.D]
    let shouldBreakOutCross = false
    let shouldBreakOutOverlap = false
    let shouldBreakOutNominalLimit = false
    let oldThing: [Index<Link>, Nominal][] = thing.slice()
    let nominal
    let stepsPlaced = 1
    // console.log('what about here', thing)
    while (shouldBreakOutCross == false && shouldBreakOutOverlap == false && shouldBreakOutNominalLimit == false) {
        // console.log("weee")
        chainingUpward = !chainingUpward
        oldThing = thing.slice()
        if (chainingUpward) {
            currentEdoStepChainingUpward += fifthStep
            currentEdoStepChainingUpward %= edo

            if (thing[currentEdoStepChainingUpward]) {
                shouldBreakOutOverlap = true
            } else {
                stepsPlaced++
                currentLinkIndexChainingUpward += 1
                // currentLinkIndexChainingUpward %= 7

                nominal = LINK_INDEX_TO_NOMINALS[(currentLinkIndexChainingUpward + 21 + 3) % 7] // the extra +1 is needed for some 0- vs 1- indexing problem I guess
                thing[currentEdoStepChainingUpward] = [currentLinkIndexChainingUpward, nominal]
            }
        } else {
            currentEdoStepChainingDownward += edo - fifthStep
            currentEdoStepChainingDownward %= edo

            if (thing[currentEdoStepChainingDownward]) {
                shouldBreakOutOverlap = true
            } else {
                stepsPlaced++

                // currentLinkIndexChainingDownward += 6 // 7 - 1
                // currentLinkIndexChainingDownward %= 7
                currentLinkIndexChainingDownward -= 1

                nominal = LINK_INDEX_TO_NOMINALS[(currentLinkIndexChainingDownward + 21 + 3) % 7] // the extra +1 is needed for some 0- vs 1- indexing problem I guess
                thing[currentEdoStepChainingDownward] = [currentLinkIndexChainingDownward, nominal]
            }
        }

        if (stepsPlaced == 7 && useOnlyPlainNominals) shouldBreakOutNominalLimit = true

        // console.log("Thing: ", thing)

        if (!shouldBreakOutOverlap && !shouldBreakOutNominalLimit) {
            shouldBreakOutCross = checkIfNominalsCrossedAndIfSoDontDoThisOneAndBreakOut(thing)
        }


        // console.log("nomninals crossed? ", nominalsCrossed)
    }

    if (shouldBreakOutCross) {
        // console.log("okay, returning oldThing: ", oldThing)
        return convertThingToThingWeNeed(oldThing)
    } else {
        // console.log("okay, returning thing: ", thing)
        return convertThingToThingWeNeed(thing)
    }
    // }
}

const convertThingToThingWeNeed = (thing: [Index<Link>, Nominal][]): Spelling[] =>
    thing.map(([linkIndex, _]) => ({ linkIndex, sagittalIndex: 0 as Index<Sagittal> }))

// TODO: I think I forgot to check the cyclical thing, like you gotta concat a second copy onto it
const checkIfNominalsCrossedAndIfSoDontDoThisOneAndBreakOut = (thing: [Index, Nominal][]) => {
    const filteredThign = thing.filter(el => !!el)
    if (filteredThign.length <= 7) return false

    // let previousNominalIndex

    const NOMINALS_IN_CHROMATIC_ORDER = ["a", "b", "c", "d", "e", "f", "g"]

    // const diffs = []

    let shouldBreak = false

    filteredThign.reduce((previousLinkStepWithIndex: [Index, Nominal], linkStepWithIndex: [Index, Nominal]): [Index, Nominal] => {
        const [_, previousNominal] = previousLinkStepWithIndex
        const [__, nominal] = linkStepWithIndex

        const previousNominalIndex = NOMINALS_IN_CHROMATIC_ORDER.indexOf(previousNominal)
        const nominalIndex = NOMINALS_IN_CHROMATIC_ORDER.indexOf(nominal)
        const diff = nominalIndex - previousNominalIndex
        // console.log("diff: ", diff)

        if (diff == 0 || diff == 1 || diff == -6) {

        } else {
            shouldBreak = true
        }

        return linkStepWithIndex // nextPrevious
    })

    return shouldBreak
}

export {
    computeLinkSpellings,
}
