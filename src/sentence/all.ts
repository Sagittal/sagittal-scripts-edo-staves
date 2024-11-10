import { Io, Sentence } from "@sagittal/general"
import { EdoNotationName, Flavor } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "./sentence"

const FLAVORS: Flavor[] = Object.values(Flavor)

const computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor = (
    edoNotationName: EdoNotationName,
): (Io & Sentence)[] =>
    FLAVORS.map((flavor: Flavor): Io & Sentence =>
        computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(edoNotationName, flavor),
    )

export { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor }
