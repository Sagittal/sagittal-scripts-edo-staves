import { Maybe } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { EdoStepNotation, Edo, EdoStep, NonSubsetEdoNotationDefinition } from "../types"
import { computeLinkEdoStepNotations } from "./links"
import { addSagittalEdoStepNotations } from "./sagittals"
import { EDO_NOTATION_DEFINITIONS } from "../definitions";

const computeIsLimmaNotation = (edo: Edo) =>
    !!(<NonSubsetEdoNotationDefinition>EDO_NOTATION_DEFINITIONS[edo]).isLimmaFraction

const computeUseOnlyPlainNominals = ({ flavor, edo }: { flavor: Flavor, edo: Edo }): boolean =>
    flavor == Flavor.REVO || computeIsLimmaNotation(edo)

const computeEdoStepNotations = ({ edo, fifthStep, sagittals, flavor }: { edo: Edo, fifthStep: EdoStep, sagittals: Sagittal[], flavor: Flavor }): EdoStepNotation[] => {
    const useOnlyPlainNominals: boolean = computeUseOnlyPlainNominals({ flavor, edo })

    const linkEdoStepNotations: Maybe<EdoStepNotation>[] = computeLinkEdoStepNotations({ edo, fifthStep, useOnlyPlainNominals })

    return addSagittalEdoStepNotations(linkEdoStepNotations, { edo, sagittals })
}

export {
    computeEdoStepNotations,
}
