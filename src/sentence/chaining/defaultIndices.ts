import {
    Flavor,
    Sagittal,
    Edo,
    EdoStep,
    NonSubsetEdoNotationDefinition,
    Spelling,
    EdoName,
    EDO_NOTATION_DEFINITIONS,
    parseEdoName,
} from "@sagittal/system"
import { computeDefaultSingleSpellingLinkSpellings } from "./links"
import { placeDefaultSingleSpellingSagittalSpelling } from "./sagittals"

const computeIsLimmaNotation = (edoName: EdoName) =>
    !!(<NonSubsetEdoNotationDefinition>EDO_NOTATION_DEFINITIONS[edoName])
        .isLimmaFraction

const computeUseOnlyPlainNominals = ({
    flavor,
    edoName,
}: {
    flavor: Flavor
    edoName: EdoName
}): boolean => flavor === Flavor.REVO || computeIsLimmaNotation(edoName)

const computeDefaultSpellings = ({
    edoName,
    fifthStep,
    sagittals,
    flavor,
    limmaStep,
}: {
    edoName: EdoName
    fifthStep: EdoStep
    sagittals: Sagittal[]
    flavor: Flavor
    limmaStep: EdoStep
}): Spelling[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({
        edoName,
        flavor,
    })

    const edo: Edo = parseEdoName(edoName).edo

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
