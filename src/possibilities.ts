import { computeRange, Index } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { EdoStepNotation, Edo, Link, EdoStep, EdoStepNotationPossibilities } from "./types"

const addEdoStepNotationPossibility = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    step: EdoStep,
    stepNotationPossibility: EdoStepNotation
): void => {
    if (edoStepNotationPossibilitiesList[step] == null) edoStepNotationPossibilitiesList[step] = []
    edoStepNotationPossibilitiesList[step].push(stepNotationPossibility)
}

const addEdoStepNotationPossibilityForLink = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    dIsZeroLinkIndex: Index<Link>,
) => {
    addEdoStepNotationPossibility(
        edoStepNotationPossibilitiesList,
        linkStep,
        {
            linkIndex: dIsZeroLinkIndex,
            sagittalIndex: 0 as Index<Sagittal>,
        }
    )
}

const addEdoStepNotationPossibilitiesAboveLink = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    dIsZeroLinkIndex: Index<Link>,
    edo: Edo,
    sagittals: Sagittal[]
) => {
    computeRange(sagittals.length as Index<Sagittal>)
        .map((sagittalIndex: Index<Sagittal>): Index<Sagittal> => sagittalIndex + 1 as Index<Sagittal>)
        .forEach((sagittalIndex: Index<Sagittal>): void => {
            const step = (linkStep + sagittalIndex) % edo as EdoStep
            addEdoStepNotationPossibility(
                edoStepNotationPossibilitiesList,
                step,
                {
                    linkIndex: dIsZeroLinkIndex,
                    sagittalIndex
                }
            )
        })
}

const addEdoStepNotationPossibilitiesBelowLink = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    dIsZeroLinkIndex: Index<Link>,
    edo: Edo,
    sagittals: Sagittal[]
) => {
    computeRange(sagittals.length as Index<Sagittal>)
        .map((sagittalIndex: Index<Sagittal>): Index<Sagittal> => sagittalIndex + 1 as Index<Sagittal>)
        .forEach((sagittalIndex: Index<Sagittal>): void => {
            const step = sagittalIndex > linkStep ?
                edo - sagittalIndex as EdoStep :
                linkStep - sagittalIndex as EdoStep
            addEdoStepNotationPossibility(
                edoStepNotationPossibilitiesList,
                step,
                {
                    linkIndex: dIsZeroLinkIndex,
                    sagittalIndex: -sagittalIndex as Index<Sagittal>
                }
            )
        })
}

const addEdoStepNotationPossibilities = (
    edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[],
    linkStep: EdoStep,
    fDoubleFlatIsZeroLinkIndex: Index<Link>,
    edo: Edo,
    sagittals: Sagittal[]
) => {
    // d is zero here because it's the center of FCGDAEB and so if we want to trim the nominals F and B first for low EDOs, we need them at the extremes
    const dIsZeroLinkIndex: Index<Link> = fDoubleFlatIsZeroLinkIndex - 17 as Index<Link>

    addEdoStepNotationPossibilityForLink(edoStepNotationPossibilitiesList, linkStep, dIsZeroLinkIndex)
    addEdoStepNotationPossibilitiesAboveLink(edoStepNotationPossibilitiesList, linkStep, dIsZeroLinkIndex, edo, sagittals)
    addEdoStepNotationPossibilitiesBelowLink(edoStepNotationPossibilitiesList, linkStep, dIsZeroLinkIndex, edo, sagittals)
}

const computeEdoStepNotationPossibilitesList = (edo: Edo, fifthStep: EdoStep, sagittals: Sagittal[]) => {
    const edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[] = []

    const cIsZeroLinkIndexRange = computeRange(-15 as Index<Link>, 20 as Index<Link>)

    // c is zero here because we want the notation to be based on c 
    const linkSteps: EdoStep[] = cIsZeroLinkIndexRange
        .map((linkIndex: Index<Link>): EdoStep => linkIndex * fifthStep % edo as EdoStep)
        .map((linkStep: EdoStep): EdoStep => linkStep < 0 ? linkStep + edo as EdoStep : linkStep)

    // f double flat is zero here because that's the first link in the master list 
    linkSteps.forEach((linkStep: EdoStep, fDoubleFlatIsZeroLinkIndex: number): void => {
        addEdoStepNotationPossibilities(edoStepNotationPossibilitiesList, linkStep, fDoubleFlatIsZeroLinkIndex as Index<Link>, edo, sagittals)
    })

    // TODO: CLEANUP constantize this and the other magic numbered link indices around here
    const concludingEdoNotationOnC: EdoStepNotation = { linkIndex: -2 as Index<Link>, sagittalIndex: 0 as Index<Sagittal> }
    edoStepNotationPossibilitiesList.push([concludingEdoNotationOnC])

    return edoStepNotationPossibilitiesList
}

export {
    computeEdoStepNotationPossibilitesList,
}
