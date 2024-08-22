import { Count, Index } from "@sagittal/general"
import { Flavor } from "@sagittal/system"
import { EdoStepNotation, EdoStep, EdoStepNotationPossibilities, Whorl, Link } from "./types"
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

const computeLinksFromD = ({ linkIndex, sagittalIndex }: EdoStepNotation, flavor: Flavor, sharpStep: EdoStep): Count<Link> => {
    if (flavor == Flavor.EVO) {
        return Math.abs(linkIndex) as Count<Link>
    } else if (Math.abs(sagittalIndex) == sharpStep * 2) {
        return Math.abs(linkIndex + 14 * Math.sign(sagittalIndex)) as Count<Link>
    } else if (Math.abs(sagittalIndex) >= sharpStep) {
        return Math.abs(linkIndex + 7 * Math.sign(sagittalIndex)) as Count<Link>
    } else {
        return Math.abs(linkIndex) as Count<Link>
    }
}

const chooseOneEdoStepNotationPerEdoStep = (edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[], sharpStep: EdoStep, flavor: Flavor) => {
    return edoStepNotationPossibilitiesList.map((edoStepNotationPossibilities: EdoStepNotation[]): EdoStepNotation => {
        return edoStepNotationPossibilities.reduce((chosenEdoStepNotation: EdoStepNotation, candidateEdoStepNotation: EdoStepNotation): EdoStepNotation => {
            const chosenStepCost: Count<EdoStep> = computeStepCost(chosenEdoStepNotation, sharpStep) as Count<EdoStep>
            const candidateStepCost: Count<EdoStep> = computeStepCost(candidateEdoStepNotation, sharpStep) as Count<EdoStep>

            if (candidateStepCost > chosenStepCost) {
                return chosenEdoStepNotation
            } else if (candidateStepCost < chosenStepCost) {
                return candidateEdoStepNotation
            } else {
                const chosenLinksFromD: Count<Link> = computeLinksFromD(chosenEdoStepNotation, flavor, sharpStep)
                const candidateLinksFromD: Count<Link> = computeLinksFromD(candidateEdoStepNotation, flavor, sharpStep)

                if (candidateLinksFromD > chosenLinksFromD) {
                    return chosenEdoStepNotation
                } else if (candidateLinksFromD < chosenLinksFromD) {
                    return candidateEdoStepNotation
                } else {
                    // tie-breaking in favor of positive sagittal

                    if (chosenEdoStepNotation.sagittalIndex > candidateEdoStepNotation.sagittalIndex) {
                        return chosenEdoStepNotation
                    } else {
                        return candidateEdoStepNotation
                    }
                }
            }
        });
    })
}

export {
    chooseOneEdoStepNotationPerEdoStep,
}
