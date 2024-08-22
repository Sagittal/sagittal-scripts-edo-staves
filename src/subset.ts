import {
    EdoStepNotation,
    Edo,
    SubsetNotationDefinition,
    EdoNotationDefinition,
    NonSubsetNotationDefinition,
} from "./types"
import { EDO_NOTATION_DEFINITIONS } from "./definitions"

const isSubsetNotation = (edoNotationDefinition: EdoNotationDefinition): edoNotationDefinition is SubsetNotationDefinition =>
    (<SubsetNotationDefinition>edoNotationDefinition).subset !== undefined

const computeSubsetSagitypes = (edoNotationDefinition: EdoNotationDefinition) => (<NonSubsetNotationDefinition>EDO_NOTATION_DEFINITIONS[edoNotationDefinition.subset]).sagitypes

const computeSubsetEdoStepNotations = (
    { subsetNotationDefinition, edo, edoStepNotations }: {
        subsetNotationDefinition: SubsetNotationDefinition,
        edo: Edo,
        edoStepNotations: EdoStepNotation[],
    },
) => {
    const subsetFactor = subsetNotationDefinition.subset / edo

    return edoStepNotations.filter((_, index) => index % subsetFactor == 0)
}

export {
    isSubsetNotation,
    computeSubsetSagitypes,
    computeSubsetEdoStepNotations,
}
