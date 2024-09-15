import { Flavor, Sagittal, Edo, EdoStep, NonSubsetEdoNotationDefinition, Nominal, EDO_NOTATION_DEFINITIONS } from "@sagittal/system"
import { computeDefaultSingleSpellingLinkEdoStepNotationIndicesList } from "./links"
import { placeDefaultSingleSpellingSagittalEdoStepNotationIndices } from "./sagittals"
import { EdoStepNotationIndices } from "./types"

const computeIsLimmaNotation = (edo: Edo, useSecondBestFifth: boolean) =>
    !!(<NonSubsetEdoNotationDefinition>EDO_NOTATION_DEFINITIONS[edo][useSecondBestFifth ? 1 : 0]).isLimmaFraction

const computeUseOnlyPlainNominals = ({ flavor, edo, useSecondBestFifth }: { flavor: Flavor, edo: Edo, useSecondBestFifth: boolean }): boolean =>
    flavor === Flavor.REVO || computeIsLimmaNotation(edo, useSecondBestFifth)

const computeDefaultEdoStepNotationIndicesList = (
    { edo, fifthStep, sagittals, flavor, useSecondBestFifth }: {
        edo: Edo,
        fifthStep: EdoStep,
        sagittals: Sagittal[],
        flavor: Flavor
        useSecondBestFifth: boolean
    }
): EdoStepNotationIndices[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, edo, useSecondBestFifth })

    const defaultSingleSpellingLinkEdoStepNotationIndicesList: EdoStepNotationIndices[] = computeDefaultSingleSpellingLinkEdoStepNotationIndicesList({ edo, fifthStep, useOnlyPlainNominals })

    return placeDefaultSingleSpellingSagittalEdoStepNotationIndices(defaultSingleSpellingLinkEdoStepNotationIndicesList, { edo, sagittals })
}

export {
    computeDefaultEdoStepNotationIndicesList,
}
