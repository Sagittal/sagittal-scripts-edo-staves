import {
    Flavor,
    Sagittal,
    Edo,
    EdoStep,
    NonSubsetEdoNotationDefinition,
} from "@sagittal/system"
import { computeDefaultSingleSpellingLinkEdoStepNotationIndicesList } from "./links"
import { placeDefaultSingleSpellingSagittalEdoStepNotationIndices } from "./sagittals"
import { EdoStepNotationIndices } from "./types"
import { computeEdoNotationDefinition } from "../../definition"

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

const computeDefaultEdoStepNotationIndicesList = ({
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
}): EdoStepNotationIndices[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({
        flavor,
        edo,
        useSecondBestFifth,
    })

    const defaultSingleSpellingLinkEdoStepNotationIndicesList: EdoStepNotationIndices[] =
        computeDefaultSingleSpellingLinkEdoStepNotationIndicesList({
            edo,
            fifthStep,
            useOnlyPlainNominals,
            limmaStep,
        })

    return placeDefaultSingleSpellingSagittalEdoStepNotationIndices(
        defaultSingleSpellingLinkEdoStepNotationIndicesList,
        { edo, sagittals },
    )
}

export { computeDefaultEdoStepNotationIndicesList }
