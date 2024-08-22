import { Count, Index } from "@sagittal/general"
import { EdoStepNotation, EdoStep, EdoStepNotationPossibilities, Whorl } from "./types"
import { MAXIMUM_ABSOLUTE_VALUE_OF_NATURAL_WHORL_LINK_INDICES, MAXIMUM_ABSOLUTE_VALUE_OF_SHARP_OR_FLAT_WHORL_LINK_INDICES } from "./constants"

const computeStepCost = ({ linkIndex, sagittalIndex }: EdoStepNotation, sharpStep: EdoStep): Count<EdoStep> => {
    let whorlIndex: Index<Whorl>
    if (linkIndex < -MAXIMUM_ABSOLUTE_VALUE_OF_SHARP_OR_FLAT_WHORL_LINK_INDICES) {
        whorlIndex = -2 as Index<Whorl>
    } else if (linkIndex < -MAXIMUM_ABSOLUTE_VALUE_OF_NATURAL_WHORL_LINK_INDICES) {
        whorlIndex = -1 as Index<Whorl>
    } else if (linkIndex <= MAXIMUM_ABSOLUTE_VALUE_OF_NATURAL_WHORL_LINK_INDICES) {
        whorlIndex = 0 as Index<Whorl>
    } else if (linkIndex <= MAXIMUM_ABSOLUTE_VALUE_OF_SHARP_OR_FLAT_WHORL_LINK_INDICES) {
        whorlIndex = 1 as Index<Whorl>
    } else {
        whorlIndex = 2 as Index<Whorl>
    }
    
    return Math.abs(whorlIndex) * sharpStep + Math.abs(sagittalIndex) as Count<EdoStep>
}

const chooseOneEdoStepNotationPerEdoStep = (edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[], sharpStep: EdoStep) => {
    return edoStepNotationPossibilitiesList.map((edoStepNotationPossibilities: EdoStepNotation[]): EdoStepNotation => {
        return edoStepNotationPossibilities.reduce((chosenEdoStepNotation: EdoStepNotation, candidateEdoStepNotation: EdoStepNotation): EdoStepNotation => {
            const candidateStepCost: Count<EdoStep> = computeStepCost(candidateEdoStepNotation, sharpStep) as Count<EdoStep>
            const chosenStepCost: Count<EdoStep> = computeStepCost(chosenEdoStepNotation, sharpStep) as Count<EdoStep>

            if (candidateStepCost < chosenStepCost) {
                return candidateEdoStepNotation
            } else if (candidateStepCost > chosenStepCost) {
                return chosenEdoStepNotation
            } else {
                if (Math.abs(candidateEdoStepNotation.linkIndex) < Math.abs(chosenEdoStepNotation.linkIndex)) {
                    return candidateEdoStepNotation
                } else {
                    return chosenEdoStepNotation
                }
            }
        });
    })
}

export {
    chooseOneEdoStepNotationPerEdoStep,
}
