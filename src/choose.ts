import { Index } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"
import { EdoStepNotation, EdoStep, EdoStepNotationPossibilities } from "./types"

// TODO: CLEANUP Steps from nominal instead of adjusted sagittal index
// TODO: CLEANUP Have links be indices not the things themselves so no need to compute whorl index 
const computeAdjustedSagittalIndex = ({ sagittalIndex, linkIndex }: EdoStepNotation, sharpStep: EdoStep): Index<Sagittal> => {
    let adjustedSagitalIndex: Index<Sagittal> = sagittalIndex as Index<Sagittal>

    if (sagittalIndex <= 0) { // sagittal is down
        if (linkIndex > 3 || linkIndex < -3) adjustedSagitalIndex = adjustedSagitalIndex - sharpStep as Index<Sagittal>
        if (linkIndex > 10 || linkIndex < -10) adjustedSagitalIndex = adjustedSagitalIndex - sharpStep as Index<Sagittal>
    } else {
        if (linkIndex > 3 || linkIndex < -3) adjustedSagitalIndex = adjustedSagitalIndex + sharpStep as Index<Sagittal>
        if (linkIndex > 10 || linkIndex < -10) adjustedSagitalIndex = adjustedSagitalIndex + sharpStep as Index<Sagittal>
    }

    return adjustedSagitalIndex
}

const chooseOneEdoStepNotationPerEdoStep = (edoStepNotationPossibilitiesList: EdoStepNotationPossibilities[], sharpStep: EdoStep, sagittals: Sagittal[]) => {
    return edoStepNotationPossibilitiesList.map((edoStepNotationPossibilities: EdoStepNotation[]): EdoStepNotation => {
        return edoStepNotationPossibilities.reduce((chosenEdoStepNotation: EdoStepNotation, candidateEdoStepNotation: EdoStepNotation): EdoStepNotation => {
            const candidateAdjustedSagittalIndex: Index<Sagittal> = computeAdjustedSagittalIndex(candidateEdoStepNotation, sharpStep)
            const chosenAdjustedSagittalIndex: Index<Sagittal> = computeAdjustedSagittalIndex(chosenEdoStepNotation, sharpStep)

            if (Math.abs(candidateAdjustedSagittalIndex) < Math.abs(chosenAdjustedSagittalIndex)) {
                return candidateEdoStepNotation
            } else if (Math.abs(candidateAdjustedSagittalIndex) > Math.abs(chosenAdjustedSagittalIndex)) {
                return chosenEdoStepNotation
            } else {
                if (candidateAdjustedSagittalIndex > chosenAdjustedSagittalIndex) {
                    return candidateEdoStepNotation
                } else if (candidateAdjustedSagittalIndex < chosenAdjustedSagittalIndex) {
                    return chosenEdoStepNotation
                } else {
                    if (Math.abs(candidateEdoStepNotation.linkIndex) < Math.abs(chosenEdoStepNotation.linkIndex)) {
                        return candidateEdoStepNotation
                    } else {
                        return chosenEdoStepNotation
                    }
                }
            }
        });
    })
}

export {
    chooseOneEdoStepNotationPerEdoStep,
}
