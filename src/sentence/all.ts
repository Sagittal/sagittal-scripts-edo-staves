import { Io, Sentence } from "@sagittal/general"
import { EdoName, Flavor } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "./sentence"

const FLAVORS: Flavor[] = Object.values(Flavor)

const computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor =
    (edoName: EdoName): (Io & Sentence)[] =>
        FLAVORS.map((flavor: Flavor): Io & Sentence =>
            computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                edoName,
                flavor,
            ),
        )

export { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor }
