import { EdoName } from "@sagittal/system"
import {
    computeRevoCouldBeEvo,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    extractKeyInfoFromInputSentence,
    REVO_FLAVOR_INDEX,
} from "./diagram"
import { Io, Sentence } from "@sagittal/general"
import { DifferenceCase } from "./types"

const computeDifferenceCase = (
    edoName: EdoName,
    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
        Sentence)[],
): DifferenceCase => {
    const revoCouldBeEvo: boolean = computeRevoCouldBeEvo(edoName)

    const keyInfos: Sentence[] =
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor.map(
            extractKeyInfoFromInputSentence,
        )

    if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX]) {
        if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
            // CASE 2: all three identical, so one shared diagram
            return DifferenceCase._2_NONE_DIFFERENT
        } else {
            if (revoCouldBeEvo) {
                // CASE 3.A: Evo and Evo-SZ identical, Revo different,
                // but Revo could be Evo, so Revo is general, and Evo(-SZ) is alt. Evo
                return DifferenceCase._3A_REVO_DIFFERENT_REVO_COULD_BE_EVO
            } else {
                // CASE 3: Evo and Evo-SZ identical, Revo different
                return DifferenceCase._3_REVO_DIFFERENT
            }
        }
    } else if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
        // CASE 4: Evo and Revo identical, Evo-SZ different (note: no current occurrences)
        return DifferenceCase._4_EVO_SZ_DIFFERENT
    } else {
        if (revoCouldBeEvo) {
            // CASE 1.A: none identical, but Revo could be Evo,
            // so Revo is general, Evo is alt. Evo, and Evo-SZ is Evo-SZ
            return DifferenceCase._1A_ALL_DIFFERENT_REVO_COULD_BE_EVO
        } else {
            // CASE 1: none identical; three separate diagrams
            return DifferenceCase._1_ALL_DIFFERENT
        }
    }
}

export { computeDifferenceCase }
