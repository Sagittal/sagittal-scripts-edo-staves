import { computeRange, Direction, Index, Maybe } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { Spelling, Edo, Link, EdoStep } from "./types"
import { C_LINK_INDEX } from "./constants"
import { computeLinkSpellings } from "./links"
import { computeUseOnlyPlainNominals } from "./onlyPlain"
import { link } from "fs"

// const addSpelling = (
//     spellingChoicesList: SpellingChoices[],
//     step: EdoStep,
//     spelling: Spelling
// ): void => {
//     if (spellingChoicesList[step] == null) spellingChoicesList[step] = []
//     spellingChoicesList[step].push(spelling)
// }

// const addSpellingForLink = (
//     spellingChoicesList: SpellingChoices[],
//     linkStep: EdoStep,
//     { dIsZeroLinkIndex }: { dIsZeroLinkIndex: Index<Link> },
// ) => {
//     addSpelling(
//         spellingChoicesList,
//         linkStep,
//         {
//             linkIndex: dIsZeroLinkIndex,
//             sagittalIndex: 0 as Index<Sagittal>,
//         }
//     )
// }

// const addSpellingChoicesAboveLink = (
//     spellingChoicesList: SpellingChoices[],
//     linkStep: EdoStep,
//     { dIsZeroLinkIndex, edo, sagittals }: {
//         dIsZeroLinkIndex: Index<Link>,
//         edo: Edo,
//         sagittals: Sagittal[],
//     },
// ) => {
//     computeRange(sagittals.length as Index<Sagittal>)
//         .map((sagittalIndex: Index<Sagittal>): Index<Sagittal> => sagittalIndex + 1 as Index<Sagittal>)
//         .forEach((sagittalIndex: Index<Sagittal>): void => {
//             const step = (linkStep + sagittalIndex) % edo as EdoStep
//             addSpelling(
//                 spellingChoicesList,
//                 step,
//                 {
//                     linkIndex: dIsZeroLinkIndex,
//                     sagittalIndex
//                 }
//             )
//         })
// }

// const addSpellingChoicesBelowLink = (
//     spellingChoicesList: SpellingChoices[],
//     linkStep: EdoStep,
//     { dIsZeroLinkIndex, edo, sagittals }: {
//         dIsZeroLinkIndex: Index<Link>,
//         edo: Edo,
//         sagittals: Sagittal[],
//     },
// ) => {
//     computeRange(sagittals.length as Index<Sagittal>)
//         .map((sagittalIndex: Index<Sagittal>): Index<Sagittal> => sagittalIndex + 1 as Index<Sagittal>)
//         .forEach((sagittalIndex: Index<Sagittal>): void => {
//             const step = sagittalIndex > linkStep ?
//                 edo - sagittalIndex as EdoStep :
//                 linkStep - sagittalIndex as EdoStep
//             addSpelling(
//                 spellingChoicesList,
//                 step,
//                 {
//                     linkIndex: dIsZeroLinkIndex,
//                     sagittalIndex: -sagittalIndex as Index<Sagittal>
//                 }
//             )
//         })
// }

// const addSpellingChoices = (
//     spellingChoicesList: SpellingChoices[],
//     linkStep: EdoStep,
//     { fDoubleFlatIsZeroLinkIndex, edo, sagittals, useOnlyPlainNominals }: {
//         fDoubleFlatIsZeroLinkIndex: Index<Link>,
//         edo: Edo,
//         sagittals: Sagittal[],
//         useOnlyPlainNominals: boolean,
//     }
// ) => {
//     // d is zero here because it's the center of FCGDAEB and so if we want to trim the nominals F and B first for low EDOs, we need them at the extremes
//     const dIsZeroLinkIndex: Index<Link> = useOnlyPlainNominals ?
//         fDoubleFlatIsZeroLinkIndex - 3 as Index<Link> :
//         fDoubleFlatIsZeroLinkIndex - 17 as Index<Link>

//     addSpellingForLink(spellingChoicesList, linkStep, { dIsZeroLinkIndex })
//     addSpellingChoicesAboveLink(spellingChoicesList, linkStep, { dIsZeroLinkIndex, edo, sagittals })
//     addSpellingChoicesBelowLink(spellingChoicesList, linkStep, { dIsZeroLinkIndex, edo, sagittals })
// }

// const computeSpellingChoicesListFromLinkSteps = (
//     linkSteps: EdoStep[],
//     { edo, sagittals, useOnlyPlainNominals }: { edo: Edo, sagittals: Sagittal[], useOnlyPlainNominals: boolean }
// ) => {
//     const spellingChoicesList: SpellingChoices[] = []

//     // f double flat is zero here because that's the first link in the master list
//     linkSteps.forEach((linkStep: EdoStep, fDoubleFlatIsZeroLinkIndex: number): void => {
//         addSpellingChoices(
//             spellingChoicesList,
//             linkStep,
//             {
//                 fDoubleFlatIsZeroLinkIndex: fDoubleFlatIsZeroLinkIndex as Index<Link>,
//                 edo,
//                 sagittals,
//                 useOnlyPlainNominals,
//             })
//     })

//     const concludingEdoNotationOnC: Spelling = { linkIndex: C_LINK_INDEX, sagittalIndex: 0 as Index<Sagittal> }
//     spellingChoicesList.push([concludingEdoNotationOnC])

//     return spellingChoicesList
// }

const doUp = (linkIndex, linkSpellings, sagittalIndex, edo) => {
    linkSpellings.forEach((linkSpelling, index) => {
        if (!linkSpelling) return
        if (linkSpelling.linkIndex != linkIndex) return

        // if (Math.abs(linkSpelling.linkIndex) > 3) return

        if (
            linkSpelling.sagittalIndex == 0 && sagittalIndex == 1 ||
            linkSpelling.sagittalIndex > 0 && linkSpelling.sagittalIndex == sagittalIndex - 1
        ) {
            const nextIndex = (index + 1) % edo

            if (!linkSpellings[nextIndex]) {
                linkSpellings[nextIndex] = { linkIndex: linkSpelling.linkIndex, sagittalIndex }
            }
        }
    })
}

const doDown = (linkIndex, linkSpellings, sagittalIndex, edo) => {
    linkSpellings.forEach((linkSpelling, index) => {
        if (!linkSpelling) return
        if (linkSpelling.linkIndex != linkIndex) return

        // if (Math.abs(linkSpelling.linkIndex) > 3) return

        if (
            linkSpelling.sagittalIndex == 0 && sagittalIndex == 1 ||
            linkSpelling.sagittalIndex < 0 && -linkSpelling.sagittalIndex == sagittalIndex - 1
        ) {
            const previousIndex = (index + edo - 1) % edo

            if (!linkSpellings[previousIndex]) {
                linkSpellings[previousIndex] = { linkIndex: linkSpelling.linkIndex, sagittalIndex: -sagittalIndex as Index<Sagittal> }
            }
        }
    })
}

enum Chaining {
    UPWARD = "upward",
    DOWNWARD = "downward",
}

const PRIORITIES = [
    { linkIndex: -3, chaining: Chaining.UPWARD }, // 0:  F  up   (eol F#)
    { linkIndex: 3, chaining: Chaining.DOWNWARD }, // 1:  B  down (eol Bb)
    { linkIndex: -2, chaining: Chaining.UPWARD }, // 2:  C  up   (eol C#)
    { linkIndex: 2, chaining: Chaining.DOWNWARD }, // 3:  E  down (eol Eb)
    { linkIndex: -1, chaining: Chaining.UPWARD }, // 4:  G  up   (eol G#)
    { linkIndex: 1, chaining: Chaining.DOWNWARD }, // 5:  A  down (eol Ab)
    { linkIndex: 0, chaining: Chaining.UPWARD }, // 6:  D  up   (eol D#)
    { linkIndex: 0, chaining: Chaining.DOWNWARD }, // 7:  D  down (eol Db)
    { linkIndex: 1, chaining: Chaining.UPWARD }, // 8:  A  up   (eol A#)
    { linkIndex: -1, chaining: Chaining.DOWNWARD }, // 9:  G  down (eol Gb)
    { linkIndex: 2, chaining: Chaining.UPWARD }, // 10: E  up   (eol E#)
    { linkIndex: -2, chaining: Chaining.DOWNWARD }, // 11: C  down (eol Cb)
    { linkIndex: 3, chaining: Chaining.UPWARD }, // 12: B  up   (eol B#)
    { linkIndex: -3, chaining: Chaining.DOWNWARD }, // 13: F  down (eol Fb)

    // what about this though    
    { linkIndex: 4, chaining: Chaining.DOWNWARD }, // 0:  F# down   (hmmm)
    { linkIndex: -4, chaining: Chaining.UPWARD }, // 1:  Bb  up (hmmm)
    { linkIndex: 5, chaining: Chaining.DOWNWARD }, // 2:  C# down   (hmmm)
    { linkIndex: -5, chaining: Chaining.UPWARD }, // 3:  Eb  up (hmmm)
    { linkIndex: 6, chaining: Chaining.DOWNWARD }, // 4:  G# down   (hmmm)
    { linkIndex: -6, chaining: Chaining.UPWARD }, // 5:  Ab  up (hmmm)
    { linkIndex: 7, chaining: Chaining.DOWNWARD }, // 6:  D# down   (hmmm)
    { linkIndex: -7, chaining: Chaining.UPWARD }, // 7:  Db  up (hmmm)
    { linkIndex: 8, chaining: Chaining.DOWNWARD }, // 8:  A# down   (hmmm)
    { linkIndex: -8, chaining: Chaining.UPWARD }, // 9:  Gb  up (hmmm)
    { linkIndex: 9, chaining: Chaining.DOWNWARD }, // 10: E# down   (hmmm)
    { linkIndex: -9, chaining: Chaining.UPWARD }, // 11: Cb  up (hmmm)
    { linkIndex: 10, chaining: Chaining.DOWNWARD }, // 12: B# down   (hmmm)
    { linkIndex: -10, chaining: Chaining.UPWARD }, // 13: Fb  up (hmmm)

    // (then repeat first wave for the 2nd level)
    { linkIndex: 4, chaining: Chaining.UPWARD }, // 0:  F#  up   (eol F##) 
    { linkIndex: -4, chaining: Chaining.DOWNWARD }, // 1:  Bb  down (eol Bbb)
    { linkIndex: 5, chaining: Chaining.UPWARD }, // 2:  C#  up   (eol C##)
    { linkIndex: -5, chaining: Chaining.DOWNWARD }, // 3:  Eb  down (eol Ebb)
    { linkIndex: 6, chaining: Chaining.UPWARD }, // 4:  G#  up   (eol G##)
    { linkIndex: -6, chaining: Chaining.DOWNWARD }, // 5:  Ab  down (eol Abb)
    { linkIndex: 7, chaining: Chaining.UPWARD }, // 6:  D#  up   (eol D##)
    { linkIndex: -7, chaining: Chaining.DOWNWARD }, // 7:  Db  down (eol Dbb)
    { linkIndex: 8, chaining: Chaining.UPWARD }, // 8:  A#  up   (eol A##)
    { linkIndex: -8, chaining: Chaining.DOWNWARD }, // 9:  Gb  down (eol Gbb)
    { linkIndex: 9, chaining: Chaining.UPWARD }, // 10: E#  up   (eol E##)
    { linkIndex: -9, chaining: Chaining.DOWNWARD }, // 11: Cb  down (eol Cbb)
    { linkIndex: 10, chaining: Chaining.UPWARD }, // 12: B#  up   (eol B##)
    { linkIndex: -10, chaining: Chaining.DOWNWARD }, // 13: Fb  down (eol Fbb)

    // what about this though too, 2nd level
    { linkIndex: 11, chaining: Chaining.DOWNWARD }, // 0:  F## down   (hmmm)
    { linkIndex: -11, chaining: Chaining.UPWARD }, // 1:  Bbb  up (hmmm)
    { linkIndex: 12, chaining: Chaining.DOWNWARD }, // 2:  C## down   (hmmm)
    { linkIndex: -12, chaining: Chaining.UPWARD }, // 3:  Ebb  up (hmmm)
    { linkIndex: 13, chaining: Chaining.DOWNWARD }, // 4:  G## down   (hmmm)
    { linkIndex: -13, chaining: Chaining.UPWARD }, // 5:  Abb  up (hmmm)
    { linkIndex: 14, chaining: Chaining.DOWNWARD }, // 6:  D## down   (hmmm)
    { linkIndex: -14, chaining: Chaining.UPWARD }, // 7:  Dbb  up (hmmm)
    { linkIndex: 15, chaining: Chaining.DOWNWARD }, // 8:  A## down   (hmmm)
    { linkIndex: -15, chaining: Chaining.UPWARD }, // 9:  Gbb  up (hmmm)
    { linkIndex: 16, chaining: Chaining.DOWNWARD }, // 10: E## down   (hmmm)
    { linkIndex: -16, chaining: Chaining.UPWARD }, // 11: Cbb  up (hmmm)
    { linkIndex: 17, chaining: Chaining.DOWNWARD }, // 12: B## down   (hmmm)
    { linkIndex: -17, chaining: Chaining.UPWARD }, // 13: Fbb  up (hmmm)
]
const addSagittalSpellings = (linkSpellings: Maybe<Spelling>[], { edo, sagittals }: { edo: Edo, sagittals: Sagittal[] }): Spelling[] => {
    sagittals.forEach((_, sagittalZeroIndex) => {
        const sagittalIndex = sagittalZeroIndex + 1 as Index<Sagittal>

        // based on plain nominals


        // negative nominal, above F up-twd-> F#
        // positive nominal, below B dn-twd-> Bb

        // negative nominal, below F dn-twd-> Fb but this has to wait until all the others... Eb, Ab, Db, Gb, Cb.

        /* 
        so what if we just count up from 0 to 35, or something

        eol = essentially/occasionally literally


        */


        PRIORITIES.forEach(({ linkIndex, chaining }) => {
            // [1, -1].forEach(direction => {
            // ups
            if (chaining == Chaining.UPWARD) doUp(linkIndex, linkSpellings, sagittalIndex, edo)

            // downs
            if (chaining == Chaining.DOWNWARD) doDown(linkIndex, linkSpellings, sagittalIndex, edo)

            // console.log("")
            // console.log("linkIndex: ", linkIndex)
            // console.log("chaining: ", chaining)
            // console.log("linkSpellings: ", linkSpellings)
        })
    })



    // // based on sharps/flats

    // // ups
    // linkSpellings.forEach((linkSpelling, index) => {
    //     if (!linkSpelling) return

    //     if (Math.abs(linkSpelling.linkIndex) <= 3 || Math.abs(linkSpelling.linkIndex) > 10) return

    //     if (
    //         linkSpelling.sagittalIndex == 0 && sagittalIndex == 1 ||
    //         linkSpelling.sagittalIndex > 0 && linkSpelling.sagittalIndex == sagittalIndex - 1
    //     ) {
    //         const nextIndex = (index + 1) % edo

    //         if (!linkSpellings[nextIndex]) {
    //             linkSpellings[nextIndex] = { linkIndex: linkSpelling.linkIndex, sagittalIndex }
    //         }
    //     }
    // })

    // // downs
    // linkSpellings.forEach((linkSpelling, index) => {
    //     if (!linkSpelling) return

    //     if (Math.abs(linkSpelling.linkIndex) <= 3 || Math.abs(linkSpelling.linkIndex) > 10) return

    //     if (
    //         linkSpelling.sagittalIndex == 0 && sagittalIndex == 1 ||
    //         linkSpelling.sagittalIndex < 0 && -linkSpelling.sagittalIndex == sagittalIndex - 1
    //     ) {
    //         const previousIndex = (index + edo - 1) % edo

    //         if (!linkSpellings[previousIndex]) {
    //             linkSpellings[previousIndex] = { linkIndex: linkSpelling.linkIndex, sagittalIndex: -sagittalIndex as Index<Sagittal> }
    //         }
    //     }
    // })

    // // based on double sharps/flats

    // // ups
    // linkSpellings.forEach((linkSpelling, index) => {
    //     if (!linkSpelling) return

    //     if (Math.abs(linkSpelling.linkIndex) <= 10) return

    //     if (
    //         linkSpelling.sagittalIndex == 0 && sagittalIndex == 1 ||
    //         linkSpelling.sagittalIndex > 0 && linkSpelling.sagittalIndex == sagittalIndex - 1
    //     ) {
    //         const nextIndex = (index + 1) % edo

    //         if (!linkSpellings[nextIndex]) {
    //             linkSpellings[nextIndex] = { linkIndex: linkSpelling.linkIndex, sagittalIndex }
    //         }
    //     }
    // })

    // // downs
    // linkSpellings.forEach((linkSpelling, index) => {
    //     if (!linkSpelling) return

    //     if (Math.abs(linkSpelling.linkIndex) <= 10) return

    //     if (
    //         linkSpelling.sagittalIndex == 0 && sagittalIndex == 1 ||
    //         linkSpelling.sagittalIndex < 0 && -linkSpelling.sagittalIndex == sagittalIndex - 1
    //     ) {
    //         const previousIndex = (index + edo - 1) % edo

    //         if (!linkSpellings[previousIndex]) {
    //             linkSpellings[previousIndex] = { linkIndex: linkSpelling.linkIndex, sagittalIndex: -sagittalIndex as Index<Sagittal> }
    //         }
    //     }
    // })
    // })

    return linkSpellings as Spelling[]
}

const computeSpellings = (
    { edo, fifthStep, sagittals, flavor, isLimmaFraction }: {
        edo: Edo,
        fifthStep: EdoStep,
        sagittals: Sagittal[],
        flavor: Flavor,
        isLimmaFraction: boolean,
    }
): Spelling[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, isLimmaFraction })

    const linkSpellings: Maybe<Spelling>[] = computeLinkSpellings({ edo, fifthStep, useOnlyPlainNominals })

    return addSagittalSpellings(linkSpellings, { edo, sagittals }) // TODO: now that there's far less of an emphasis on multiple spellings, this is no longer the best name for this. back to EdoStepNotation perhaps? but Spelling is so nice and pithy...

    // return computeSpellingChoicesListFromLinkSteps(linkSteps, { edo, sagittals, useOnlyPlainNominals })
}

export {
    computeSpellings,
}
