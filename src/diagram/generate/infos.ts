import { Io, Sentence } from "@sagittal/general"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../../sentence"
import { EdoName } from "@sagittal/system"
import { computeRevoCouldBeEvo } from "./revoCouldBeEvo"
import { extractKeyInfoFromInputSentence } from "./keyInfo"

const getInfos = (
    edoName: EdoName,
): {
    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
        Sentence)[]
    revoCouldBeEvo: boolean
    keyInfos: Sentence[]
} => {
    const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
        Sentence)[] =
        computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor(
            edoName,
        )

    const revoCouldBeEvo: boolean = computeRevoCouldBeEvo(edoName)

    const keyInfos: Sentence[] =
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor.map(
            extractKeyInfoFromInputSentence,
        )

    return {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
        revoCouldBeEvo,
        keyInfos,
    }
}

export { getInfos }
