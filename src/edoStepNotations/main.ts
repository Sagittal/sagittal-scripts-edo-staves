import { Flavor, Sagittal } from "@sagittal/system"
import { EdoStepNotation, Edo, EdoStep, NonSubsetEdoNotationDefinition, Nominal } from "../types"
import { computeLinkEdoStepNotations } from "./links"
import { placeSagittalEdoStepNotations } from "./sagittals"
import { EDO_NOTATION_DEFINITIONS } from "../definitions";

const computeIsLimmaNotation = (edo: Edo) =>
    !!(<NonSubsetEdoNotationDefinition>EDO_NOTATION_DEFINITIONS[edo]).isLimmaFraction

const computeUseOnlyPlainNominals = ({ flavor, edo }: { flavor: Flavor, edo: Edo }): boolean =>
    flavor == Flavor.REVO || computeIsLimmaNotation(edo)

const computeEdoStepNotations = (
    { edo, fifthStep, sagittals, flavor, root }: {
        edo: Edo,
        fifthStep: EdoStep,
        sagittals: Sagittal[],
        flavor: Flavor,
        root: Nominal,
    }): EdoStepNotation[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, edo })

    const linkEdoStepNotations: EdoStepNotation[] = computeLinkEdoStepNotations({ edo, fifthStep, useOnlyPlainNominals, root })

    return placeSagittalEdoStepNotations(linkEdoStepNotations, { edo, sagittals })
}

export {
    computeEdoStepNotations,
}
