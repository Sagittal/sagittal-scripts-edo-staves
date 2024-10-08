import { Io, Sentence } from "@sagittal/general"
import { EdoNotationName } from "@sagittal/system"
import { computeSentencesAndDifferenceCase } from "../difference"
import { Subsection } from "./types"
import { DiagramType, DifferenceCase } from "../types"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
} from "../diagram"

const gatherSubsectionsForEdoNotationName = (
    edoNotationName: EdoNotationName,
): Subsection[] => {
    const {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
        differenceCase,
    }: {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
            Sentence)[]
        differenceCase: DifferenceCase
    } = computeSentencesAndDifferenceCase(edoNotationName)

    if (differenceCase === DifferenceCase._1_ALL_DIFFERENT) {
        return [
            {
                diagramType: DiagramType.EVO,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.REVO,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        REVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.EVO_SZ,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_SZ_FLAVOR_INDEX
                    ],
            },
        ]
    } else if (
        differenceCase === DifferenceCase._1A_ALL_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        ;[
            {
                diagramType: DiagramType.GENERAL,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        REVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.ALTERNATE_EVO,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.EVO_SZ,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_SZ_FLAVOR_INDEX
                    ],
            },
        ]
    } else if (differenceCase === DifferenceCase._2_NONE_DIFFERENT) {
        return [
            {
                diagramType: DiagramType.GENERAL,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        REVO_FLAVOR_INDEX
                    ],
            },
        ]
    } else if (differenceCase === DifferenceCase._3_REVO_DIFFERENT) {
        return [
            {
                diagramType: DiagramType.EVO,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.REVO,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        REVO_FLAVOR_INDEX
                    ],
            },
        ]
    } else if (
        differenceCase === DifferenceCase._3A_REVO_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        return [
            {
                diagramType: DiagramType.GENERAL,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        REVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.ALTERNATE_EVO,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_FLAVOR_INDEX
                    ],
            },
        ]
    } else if (differenceCase === DifferenceCase._4_EVO_SZ_DIFFERENT) {
        return [
            {
                diagramType: DiagramType.GENERAL,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        REVO_FLAVOR_INDEX
                    ],
            },
            {
                diagramType: DiagramType.EVO_SZ,
                notation:
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                        EVO_SZ_FLAVOR_INDEX
                    ],
            },
        ]
    }

    return []
}

export { gatherSubsectionsForEdoNotationName }
