import { Count, Index } from "@sagittal/general"
import { Flavor, Sagittal } from "@sagittal/system"
import { Spelling, EdoStep, SpellingChoices, Whorl, Link } from "./types"
import { MAXIMUM_ABSOLUTE_VALUE_OF_NATURAL_WHORL_LINK_INDICES, MAXIMUM_ABSOLUTE_VALUE_OF_SHARP_OR_FLAT_WHORL_LINK_INDICES } from "./constants"

const computeStepsFromNominal = (
    { linkIndex, sagittalIndex }: Spelling,
    { sharpStep }: { sharpStep: EdoStep },
): Count<EdoStep> => {
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

    return Math.abs(whorlIndex * sharpStep + sagittalIndex) as Count<EdoStep>
}

const computeLinksFromD = (
    { linkIndex, sagittalIndex }: Spelling,
    { flavor, sharpStep, evoSagittalsCount }: { flavor: Flavor, sharpStep: EdoStep, evoSagittalsCount: Count<Sagittal> },
): Count<Link> => {
    if (flavor == Flavor.EVO) {
        return Math.abs(linkIndex) as Count<Link>
    } else {
        if (Math.abs(sagittalIndex) > evoSagittalsCount + sharpStep) {
            return Math.abs(linkIndex + 14 * Math.sign(sagittalIndex)) as Count<Link>
        } else if (Math.abs(sagittalIndex) > evoSagittalsCount) {
            return Math.abs(linkIndex + 7 * Math.sign(sagittalIndex)) as Count<Link>
        } else {
            return Math.abs(linkIndex) as Count<Link>
        }
    }
}

const chooseSingleSpellingPerEdoStep = (
    spellingChoicesList: SpellingChoices[],
    { sharpStep, flavor, evoSagittalsCount }: { sharpStep: EdoStep, flavor: Flavor, evoSagittalsCount: Count<Sagittal> }
): Spelling[] => {
    return spellingChoicesList.map((spellingChoices: Spelling[]): Spelling => {
        return spellingChoices.reduce((chosenSpelling: Spelling, candidateSpelling: Spelling): Spelling => {
            const chosenStepsFromNominal: Count<EdoStep> = computeStepsFromNominal(chosenSpelling, { sharpStep }) as Count<EdoStep>
            const candidateStepsFromNominal: Count<EdoStep> = computeStepsFromNominal(candidateSpelling, { sharpStep }) as Count<EdoStep>

            if (candidateStepsFromNominal > chosenStepsFromNominal) {
                return chosenSpelling
            } else if (candidateStepsFromNominal < chosenStepsFromNominal) {
                return candidateSpelling
            } else {
                const chosenLinksFromD: Count<Link> = computeLinksFromD(chosenSpelling, { flavor, sharpStep, evoSagittalsCount })
                const candidateLinksFromD: Count<Link> = computeLinksFromD(candidateSpelling, { flavor, sharpStep, evoSagittalsCount })

                if (candidateLinksFromD > chosenLinksFromD) {
                    return chosenSpelling
                } else if (candidateLinksFromD < chosenLinksFromD) {
                    return candidateSpelling
                } else {
                    // tie-breaking in favor of positive sagittal

                    if (chosenSpelling.sagittalIndex > candidateSpelling.sagittalIndex) {
                        return chosenSpelling
                    } else {
                        return candidateSpelling
                    }
                }
            }
        });
    })
}

export {
    chooseSingleSpellingPerEdoStep,
}
