import { Io, Sentence } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "./sentence"

const FLAVORS: Flavor[] = Object.values(Flavor)

const computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor =
    (edo: Edo): (Io & Sentence)[] =>
        FLAVORS.map((flavor: Flavor): Io & Sentence =>
            computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                edo,
                flavor,
            ),
        )

export { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor }
