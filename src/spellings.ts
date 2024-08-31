import { computeRange, Index, Maybe } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { Spelling, Edo, Link, EdoStep } from "./types"
import { C_LINK_INDEX } from "./constants"
import { computeLinkSpellings } from "./links"
// import { computeUseOnlyPlainNominals } from "./onlyPlain"

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

const addSagittalSpellings = (linkSpellings: Maybe<Spelling>[], { edo, sagittals }: { edo: Edo, sagittals: Sagittal[] }): Spelling[] => {
    sagittals.forEach((_, sagittalZeroIndex) => {
        const sagittalIndex = sagittalZeroIndex + 1 as Index<Sagittal>

        // based on plain nominals

        linkSpellings.forEach((linkSpelling, index) => {
            if (!linkSpelling) return

            if (Math.abs(linkSpelling.linkIndex) > 3) return 

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

        linkSpellings.forEach((linkSpelling, index) => {
            if (!linkSpelling) return

            if (Math.abs(linkSpelling.linkIndex) > 3) return 

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

        // based on sharps/flats

        linkSpellings.forEach((linkSpelling, index) => {
            if (!linkSpelling) return

            if (Math.abs(linkSpelling.linkIndex) <= 3 || Math.abs(linkSpelling.linkIndex) > 10) return 

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

        linkSpellings.forEach((linkSpelling, index) => {
            if (!linkSpelling) return

            if (Math.abs(linkSpelling.linkIndex) <= 3 || Math.abs(linkSpelling.linkIndex) > 10) return 

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

         // based on double sharps/flats

         linkSpellings.forEach((linkSpelling, index) => {
            if (!linkSpelling) return

            if (Math.abs(linkSpelling.linkIndex) <= 10) return 

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

        linkSpellings.forEach((linkSpelling, index) => {
            if (!linkSpelling) return

            if (Math.abs(linkSpelling.linkIndex) <= 10) return 

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
    })

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
    // const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, isLimmaFraction })

    const linkSpellings: Maybe<Spelling>[] = computeLinkSpellings({ edo, fifthStep, isLimmaFraction })

    return addSagittalSpellings(linkSpellings, { edo, sagittals }) // TODO: now that there's far less of an emphasis on multiple spellings, this is no longer the best name for this. back to EdoStepNotation perhaps? but Spelling is so nice and pithy...

    // return computeSpellingChoicesListFromLinkSteps(linkSteps, { edo, sagittals, useOnlyPlainNominals })
}

export {
    computeSpellings,
}
