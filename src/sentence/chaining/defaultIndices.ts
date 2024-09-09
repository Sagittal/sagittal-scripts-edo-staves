import { Flavor, Sagittal, Edo, EdoStep, NonSubsetEdoNotationDefinition, Nominal, EDO_NOTATION_DEFINITIONS } from "@sagittal/system"
import { computeDefaultSingleSpellingLinkEdoStepNotationIndicesList } from "./links"
import { placeDefaultSingleSpellingSagittalEdoStepNotationIndices } from "./sagittals"
import { EdoStepNotationIndices } from "./types"

const computeIsLimmaNotation = (edo: Edo) =>
    !!(<NonSubsetEdoNotationDefinition>EDO_NOTATION_DEFINITIONS[edo]).isLimmaFraction

const computeUseOnlyPlainNominals = ({ flavor, edo }: { flavor: Flavor, edo: Edo }): boolean =>
    flavor === Flavor.REVO || computeIsLimmaNotation(edo)

const computeDefaultEdoStepNotationIndicesList = (
    { edo, fifthStep, sagittals, flavor }: {
        edo: Edo,
        fifthStep: EdoStep,
        sagittals: Sagittal[],
        flavor: Flavor
    }
): EdoStepNotationIndices[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, edo })

    const defaultSingleSpellingLinkEdoStepNotationIndicesList: EdoStepNotationIndices[] = computeDefaultSingleSpellingLinkEdoStepNotationIndicesList({ edo, fifthStep, useOnlyPlainNominals })

    return placeDefaultSingleSpellingSagittalEdoStepNotationIndices(defaultSingleSpellingLinkEdoStepNotationIndicesList, { edo, sagittals })
}

export {
    computeDefaultEdoStepNotationIndicesList,
}
