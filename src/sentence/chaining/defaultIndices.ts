import {
    Flavor,
    Sagittal,
    Edo,
    EdoStep,
    NonSubsetEdoNotationDefinition,
    Spelling,
    computeEdoNotationDefinition,
} from "@sagittal/system"
import { computeDefaultSingleSpellingLinkSpellings } from "./links"
import { placeDefaultSingleSpellingSagittalSpelling } from "./sagittals"

const computeIsLimmaNotation = (edo: Edo, useSecondBestFifth: boolean) =>
    !!(<NonSubsetEdoNotationDefinition>(
        computeEdoNotationDefinition(edo, useSecondBestFifth)
    )).isLimmaFraction

const computeUseOnlyPlainNominals = ({
    flavor,
    edo,
    useSecondBestFifth,
}: {
    flavor: Flavor
    edo: Edo
    useSecondBestFifth: boolean
}): boolean =>
    flavor === Flavor.REVO || computeIsLimmaNotation(edo, useSecondBestFifth)

const computeDefaultSpellings = ({
    edo,
    fifthStep,
    sagittals,
    flavor,
    useSecondBestFifth,
    limmaStep,
}: {
    edo: Edo
    fifthStep: EdoStep
    sagittals: Sagittal[]
    flavor: Flavor
    useSecondBestFifth: boolean
    limmaStep: EdoStep
}): Spelling[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({
        flavor,
        edo,
        useSecondBestFifth,
    })

    const defaultSingleSpellingLinkSpellings: Spelling[] =
        computeDefaultSingleSpellingLinkSpellings({
            edo,
            fifthStep,
            useOnlyPlainNominals,
            limmaStep,
        })

    return placeDefaultSingleSpellingSagittalSpelling(
        defaultSingleSpellingLinkSpellings,
        { edo, sagittals },
    )
}

export { computeDefaultSpellings }
