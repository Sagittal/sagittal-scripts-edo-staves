import { computeRange, Index } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { Spelling, Edo, Link, EdoStep, SpellingChoices } from "./types"
import { C_LINK_INDEX } from "./constants"

const computeUseOnlyPlainNominals = ({ flavor, isLimmaFraction }: { flavor: Flavor, isLimmaFraction: boolean }) =>
    flavor == Flavor.REVO || isLimmaFraction

const addSpelling = (
    spellingChoicesList: SpellingChoices[],
    step: EdoStep,
    spelling: Spelling
): void => {
    if (spellingChoicesList[step] == null) spellingChoicesList[step] = []
    spellingChoicesList[step].push(spelling)
}

const addSpellingForLink = (
    spellingChoicesList: SpellingChoices[],
    linkStep: EdoStep,
    { dIsZeroLinkIndex }: { dIsZeroLinkIndex: Index<Link> },
) => {
    addSpelling(
        spellingChoicesList,
        linkStep,
        {
            linkIndex: dIsZeroLinkIndex,
            sagittalIndex: 0 as Index<Sagittal>,
        }
    )
}

const addSpellingChoicesAboveLink = (
    spellingChoicesList: SpellingChoices[],
    linkStep: EdoStep,
    { dIsZeroLinkIndex, edo, sagittals }: {
        dIsZeroLinkIndex: Index<Link>,
        edo: Edo,
        sagittals: Sagittal[],
    },
) => {
    computeRange(sagittals.length as Index<Sagittal>)
        .map((sagittalIndex: Index<Sagittal>): Index<Sagittal> => sagittalIndex + 1 as Index<Sagittal>)
        .forEach((sagittalIndex: Index<Sagittal>): void => {
            const step = (linkStep + sagittalIndex) % edo as EdoStep
            addSpelling(
                spellingChoicesList,
                step,
                {
                    linkIndex: dIsZeroLinkIndex,
                    sagittalIndex
                }
            )
        })
}

const addSpellingChoicesBelowLink = (
    spellingChoicesList: SpellingChoices[],
    linkStep: EdoStep,
    { dIsZeroLinkIndex, edo, sagittals }: {
        dIsZeroLinkIndex: Index<Link>,
        edo: Edo,
        sagittals: Sagittal[],
    },
) => {
    computeRange(sagittals.length as Index<Sagittal>)
        .map((sagittalIndex: Index<Sagittal>): Index<Sagittal> => sagittalIndex + 1 as Index<Sagittal>)
        .forEach((sagittalIndex: Index<Sagittal>): void => {
            const step = sagittalIndex > linkStep ?
                edo - sagittalIndex as EdoStep :
                linkStep - sagittalIndex as EdoStep
            addSpelling(
                spellingChoicesList,
                step,
                {
                    linkIndex: dIsZeroLinkIndex,
                    sagittalIndex: -sagittalIndex as Index<Sagittal>
                }
            )
        })
}

const addSpellingChoices = (
    spellingChoicesList: SpellingChoices[],
    linkStep: EdoStep,
    { fDoubleFlatIsZeroLinkIndex, edo, sagittals, useOnlyPlainNominals }: {
        fDoubleFlatIsZeroLinkIndex: Index<Link>,
        edo: Edo,
        sagittals: Sagittal[],
        useOnlyPlainNominals: boolean,
    }
) => {
    // d is zero here because it's the center of FCGDAEB and so if we want to trim the nominals F and B first for low EDOs, we need them at the extremes
    const dIsZeroLinkIndex: Index<Link> = useOnlyPlainNominals ?
        fDoubleFlatIsZeroLinkIndex - 3 as Index<Link> :
        fDoubleFlatIsZeroLinkIndex - 17 as Index<Link>

    addSpellingForLink(spellingChoicesList, linkStep, { dIsZeroLinkIndex })
    addSpellingChoicesAboveLink(spellingChoicesList, linkStep, { dIsZeroLinkIndex, edo, sagittals })
    addSpellingChoicesBelowLink(spellingChoicesList, linkStep, { dIsZeroLinkIndex, edo, sagittals })
}

const computeSpellingChoicesList = (
    { edo, fifthStep, sagittals, flavor, isLimmaFraction }: {
        edo: Edo,
        fifthStep: EdoStep,
        sagittals: Sagittal[],
        flavor: Flavor,
        isLimmaFraction: boolean,
    }
) => {
    const spellingChoicesList: SpellingChoices[] = []

    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, isLimmaFraction })

    const cIsZeroLinkIndexRange = useOnlyPlainNominals ?
        computeRange(-1 as Index<Link>, 6 as Index<Link>) :
        computeRange(-15 as Index<Link>, 20 as Index<Link>)

    // c is zero here because we want the notation to be based on c 
    const linkSteps: EdoStep[] = cIsZeroLinkIndexRange
        .map((linkIndex: Index<Link>): EdoStep => linkIndex * fifthStep % edo as EdoStep)
        .map((linkStep: EdoStep): EdoStep => linkStep < 0 ? linkStep + edo as EdoStep : linkStep)

    // f double flat is zero here because that's the first link in the master list 
    linkSteps.forEach((linkStep: EdoStep, fDoubleFlatIsZeroLinkIndex: number): void => {
        addSpellingChoices(
            spellingChoicesList,
            linkStep,
            {
                fDoubleFlatIsZeroLinkIndex: fDoubleFlatIsZeroLinkIndex as Index<Link>,
                edo,
                sagittals,
                useOnlyPlainNominals,
            })
    })

    const concludingEdoNotationOnC: Spelling = { linkIndex: C_LINK_INDEX, sagittalIndex: 0 as Index<Sagittal> }
    spellingChoicesList.push([concludingEdoNotationOnC])

    return spellingChoicesList
}

export {
    computeSpellingChoicesList,
}
