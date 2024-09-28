import { Io, Sentence } from "@sagittal/general"
import { EdoName } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../sentence"
import { computeDifferenceCase } from "../difference"
import { Subsection } from "./types"
import { DiagramType, DifferenceCase } from "../types"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
} from "../diagram"

const gatherSubsectionsForEdoName = (
    edoName: EdoName,
    subsections: Subsection[],
) => {
    // TODO: well now maybe the thing to DRY up instead of `getInfos` is just getting these two things?
    const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
        Sentence)[] =
        computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor(
            edoName,
        )
    // flavor-type-thing: general, evo, revo, alt evo, evo-sz, to be sorted in that order, with general being special
    // is-b-notation: boolean... although maybe just lump this in together?
    // general, general-b, evo, evo-b, revo, revo-b, alt evo, alt evo b
    const differenceCase: DifferenceCase = computeDifferenceCase(
        edoName,
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
    )

    if (differenceCase === DifferenceCase._1_ALL_DIFFERENT) {
        subsections.push({
            diagramType: DiagramType.EVO,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.REVO,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    REVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.EVO_SZ,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_SZ_FLAVOR_INDEX
                ],
        })
    } else if (
        differenceCase === DifferenceCase._1A_ALL_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        subsections.push({
            diagramType: DiagramType.GENERAL,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    REVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.ALTERNATE_EVO,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.EVO_SZ,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_SZ_FLAVOR_INDEX
                ],
        })
    } else if (differenceCase === DifferenceCase._2_NONE_DIFFERENT) {
        subsections.push({
            diagramType: DiagramType.GENERAL,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    REVO_FLAVOR_INDEX
                ],
        })
    } else if (differenceCase === DifferenceCase._3_REVO_DIFFERENT) {
        subsections.push({
            diagramType: DiagramType.EVO,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.REVO,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    REVO_FLAVOR_INDEX
                ],
        })
    } else if (
        differenceCase === DifferenceCase._3A_REVO_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        subsections.push({
            diagramType: DiagramType.GENERAL,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    REVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.EVO,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_FLAVOR_INDEX
                ],
        })
    } else if (differenceCase === DifferenceCase._4_EVO_SZ_DIFFERENT) {
        subsections.push({
            diagramType: DiagramType.GENERAL,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    REVO_FLAVOR_INDEX
                ],
        })
        subsections.push({
            diagramType: DiagramType.EVO_SZ,
            notation:
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                    EVO_SZ_FLAVOR_INDEX
                ],
        })
    }
}

export { gatherSubsectionsForEdoName }
