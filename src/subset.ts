import {
    EdoStepNotation,
    Edo,
    SubsetEdoNotationDefinition,
    EdoNotationDefinition,
    NonSubsetEdoNotationDefinition,
} from "./types"
import { EDO_NOTATION_DEFINITIONS } from "./definitions"

const isSubsetNotation = (edoNotationDefinition: EdoNotationDefinition): edoNotationDefinition is SubsetEdoNotationDefinition =>
    (<SubsetEdoNotationDefinition>edoNotationDefinition).supersetEdo !== undefined

const computeSubsetSagitypes = (edoNotationDefinition: SubsetEdoNotationDefinition) => {
    const nonSubsetEdoNotationDefinition: NonSubsetEdoNotationDefinition = EDO_NOTATION_DEFINITIONS[edoNotationDefinition.supersetEdo] as NonSubsetEdoNotationDefinition

    return nonSubsetEdoNotationDefinition.sagitypes
}

const computeSubsetEdoStepNotations = ({ edo, subsetEdo, edoStepNotations }: { edo: Edo, subsetEdo: Edo, edoStepNotations: EdoStepNotation[] }) => {
    const subsetFactor = edo / subsetEdo

    return edoStepNotations.filter((_, index) => index % subsetFactor == 0)
}

export {
    isSubsetNotation,
    computeSubsetSagitypes,
    computeSubsetEdoStepNotations,
}
