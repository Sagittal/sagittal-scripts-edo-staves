import {
    Flavor,
    Sagittal,
    NonSubsetEdoNotationDefinition,
    Spelling,
    EdoNotationName,
    EDO_NOTATION_DEFINITIONS,
    parseEdoNotationName,
} from "@sagittal/system"
import { computeDefaultSingleSpellingLinkSpellings } from "./links"
import { placeDefaultSingleSpellingSagittalSpelling } from "./sagittals"
import { Edo, EdoStep } from "@sagittal/general"

const computeIsLimmaNotation = (edoNotationName: EdoNotationName) =>
    !!(<NonSubsetEdoNotationDefinition>EDO_NOTATION_DEFINITIONS[edoNotationName]).isLimmaFraction

const computeUseOnlyPlainNominals = ({
    flavor,
    edoNotationName,
}: {
    flavor: Flavor
    edoNotationName: EdoNotationName
}): boolean => flavor === Flavor.REVO || computeIsLimmaNotation(edoNotationName)

const computeDefaultSpellings = ({
    edoNotationName,
    fifthStep,
    sagittals,
    flavor,
    limmaStep,
}: {
    edoNotationName: EdoNotationName
    fifthStep: EdoStep
    sagittals: Sagittal[]
    flavor: Flavor
    limmaStep: EdoStep
}): Spelling[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({
        edoNotationName,
        flavor,
    })

    const edo: Edo = parseEdoNotationName(edoNotationName).edo

    const defaultSingleSpellingLinkSpellings: Spelling[] = computeDefaultSingleSpellingLinkSpellings({
        edo,
        fifthStep,
        useOnlyPlainNominals,
        limmaStep,
    })

    return placeDefaultSingleSpellingSagittalSpelling(defaultSingleSpellingLinkSpellings, { edo, sagittals })
}

export { computeDefaultSpellings }
