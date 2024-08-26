import { Io, Sentence, Count } from "@sagittal/general"
import { Flavor, Sagittal, Sagitype } from "@sagittal/system"
import { Spelling, Edo, EdoStep, SpellingChoices, EdoNotationDefinition } from "./types"
import { computeFifthStep, computeSharpStep } from "./steps"
import { EDO_NOTATION_DEFINITIONS } from "./definitions"
import { computeSpellingChoicesList } from "./choices"
import { chooseSingleSpellingPerEdoStep } from "./choose"
import { resolveSpellingsToIntermediateStringFormOfActualFinalVisualNotation } from "./resolve"
import { assembleAsStaffCodeInputSentence } from "./staffCode"
import { computeSagittals } from "./sagittals"
import { isSubsetNotation, computeSubsetSagitypes, computeSubsetSpellings } from "./subset"
import { computeIsLimmaFraction } from "./limmaFraction"

const computeSagitypes = (edoNotationDefinition: EdoNotationDefinition): Sagitype[] =>
    isSubsetNotation(edoNotationDefinition) ?
        computeSubsetSagitypes(edoNotationDefinition) :
        edoNotationDefinition.sagitypes

const computeStaffCodeInputSentence = (edo: Edo, flavor: Flavor): Io & Sentence => {
    const edoNotationDefinition = EDO_NOTATION_DEFINITIONS[edo]
    const sagitypes = computeSagitypes(edoNotationDefinition)
    const notationEdo = isSubsetNotation(edoNotationDefinition) ? edoNotationDefinition.subset : edo
    const fifthStep: EdoStep = computeFifthStep(notationEdo)
    const sharpStep: EdoStep = computeSharpStep(notationEdo, fifthStep)
    const sagittals: Sagittal[] = computeSagittals({ sagitypes, flavor, sharpStep })
    const spellingChoicesList: SpellingChoices[] = computeSpellingChoicesList({
        edo: notationEdo,
        fifthStep,
        sagittals,
        flavor,
        isLimmaFraction: computeIsLimmaFraction(notationEdo)
    })
    let spellings: Spelling[] = chooseSingleSpellingPerEdoStep(
        spellingChoicesList,
        { sharpStep, flavor, evoSagittalsCount: sagitypes.length as Count<Sagittal> }
    )

    if (isSubsetNotation(edoNotationDefinition)) {
        spellings = computeSubsetSpellings({ subsetNotationDefinition: edoNotationDefinition, edo, spellings })
    }

    const intermediateStringForm = resolveSpellingsToIntermediateStringFormOfActualFinalVisualNotation(spellings, { sagittals, flavor })

    return assembleAsStaffCodeInputSentence(intermediateStringForm)
}

export {
    computeStaffCodeInputSentence,
}
