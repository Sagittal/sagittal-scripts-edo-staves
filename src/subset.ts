import {
    Spelling,
    Edo,
    SubsetNotationDefinition,
    EdoNotationDefinition,
    NonSubsetNotationDefinition,
} from "./types"
import { EDO_NOTATION_DEFINITIONS } from "./definitions"

const isSubsetNotation = (edoNotationDefinition: EdoNotationDefinition): edoNotationDefinition is SubsetNotationDefinition =>
    (<SubsetNotationDefinition>edoNotationDefinition).subset !== undefined

const computeSubsetSagitypes = (edoNotationDefinition: EdoNotationDefinition) => (<NonSubsetNotationDefinition>EDO_NOTATION_DEFINITIONS[edoNotationDefinition.subset]).sagitypes

const computeSubsetSpellings = (
    { subsetNotationDefinition, edo, spellings }: {
        subsetNotationDefinition: SubsetNotationDefinition,
        edo: Edo,
        spellings: Spelling[],
    },
) => {
    const subsetFactor = subsetNotationDefinition.subset / edo

    return spellings.filter((_, index) => index % subsetFactor == 0)
}

export {
    isSubsetNotation,
    computeSubsetSagitypes,
    computeSubsetSpellings,
}
