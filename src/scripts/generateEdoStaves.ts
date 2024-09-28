import { program } from "commander"
import { Flavor } from "@sagittal/system"
import {
    Io,
    isUndefined,
    saveLog,
    scriptSettings,
    Sentence,
} from "@sagittal/general"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    generateOneOffDiagram,
    generateOneOffGeneralDiagram,
    REVO_FLAVOR_INDEX,
} from "../diagram"
import { EdoName } from "@sagittal/system/dist/cjs/notations"
import { generateOneOffAlternateEvoDiagram } from "../diagram/generate/oneOff"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../sentence"
import { computeDifferenceCase } from "../difference"
import { DifferenceCase } from "../types"

const ALL_IDENTICAL_MESSAGE_FOR_ANY: Io =
    "Every flavor has the same default notation for this EDO, so a general diagram has been generated."
const EVO_AND_REVO_IDENTICAL_MESSAGE_FOR_EITHER: Io =
    "The Evo and Revo flavors have the same default notation for this EDO, so a general diagram has been generated."

const EVO_SZ_COULD_BE_EVO_MESSAGE_FOR_EVO_SZ: Io =
    "The default Evo notation for this EDO is identical to the Evo-SZ notation, so an Evo notation has been generated."

const REVO_COULD_BE_EVO_MESSAGE_FOR_REVO: Io =
    "The default Revo notation could be any flavor for this EDO, so a general diagram has been generated."
const REVO_COULD_BE_EVO_MESSAGE_FOR_EVO: Io =
    "The default Revo notation could be any flavor for this EDO, but the Evo notation is different from it, so the generated diagram for Evo is considered to be an alternative Evo."
const REVO_COULD_BE_EVO_MESSAGE_FOR_EVO_SZ: Io =
    "The default Revo notation could be any flavor for this EDO, but the Evo notation is different from it, so the generated diagram for Evo is considered to be an alternative Evo, and Evo-SZ is identical to Evo for this EDO too."

scriptSettings.disableColors = true

program
    .option("-e, --edo <string>", "EDO name (e.g. 17, 64b)")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")

program.parse()
const { edo: edoName, flavor: flavorString }: { edo: EdoName; flavor: string } =
    program.opts()

if (isUndefined(edoName)) throw new Error("You must provide an EDO.")

const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
    Sentence)[] =
    computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor(
        edoName,
    )

const differenceCase: DifferenceCase = computeDifferenceCase(
    edoName,
    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
)

const maybeThrowError = (flavorString: string) => {
    if (isUndefined(flavorString)) {
        throw new Error(
            "The notations differ by flavor for this EDO. You must specify a flavor.",
        )
    }
}

if (differenceCase === DifferenceCase._1_ALL_DIFFERENT) {
    // CASE 1: none identical; three separate diagrams
    maybeThrowError(flavorString)
    const flavor: Flavor = flavorString.toLowerCase() as Flavor
    generateOneOffDiagram(
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
            Object.values(Flavor).indexOf(flavor)
        ],
        edoName,
        flavor,
    )
} else if (
    differenceCase === DifferenceCase._1A_ALL_DIFFERENT_REVO_COULD_BE_EVO
) {
    // CASE 1.A: none identical, but Revo could be Evo,
    // so Revo is general, Evo is alt. Evo, and Evo-SZ is Evo-SZ
    maybeThrowError(flavorString)

    const flavor: Flavor = flavorString.toLowerCase() as Flavor
    if (flavor === Flavor.EVO_SZ) {
        generateOneOffDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                EVO_SZ_FLAVOR_INDEX
            ],
            edoName,
            flavor,
        )
    } else if (flavor === Flavor.EVO) {
        saveLog(REVO_COULD_BE_EVO_MESSAGE_FOR_EVO)

        generateOneOffAlternateEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
        )
    } else if (flavor === Flavor.REVO) {
        saveLog(REVO_COULD_BE_EVO_MESSAGE_FOR_REVO)

        generateOneOffGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
        )
    }
} else if (differenceCase === DifferenceCase._2_NONE_DIFFERENT) {
    // CASE 2: all three identical, generate one big shared diagram
    if (!isUndefined(flavorString)) saveLog(ALL_IDENTICAL_MESSAGE_FOR_ANY)

    generateOneOffGeneralDiagram(
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
        edoName,
    )
} else if (differenceCase === DifferenceCase._3_REVO_DIFFERENT) {
    // CASE 3: Evo and Evo-SZ identical, Revo different
    maybeThrowError(flavorString)

    const flavor: Flavor = flavorString.toLowerCase() as Flavor
    if (flavor === Flavor.REVO) {
        generateOneOffDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                REVO_FLAVOR_INDEX
            ],
            edoName,
            flavor,
        )
    } else {
        if (flavor === Flavor.EVO_SZ) {
            saveLog(EVO_SZ_COULD_BE_EVO_MESSAGE_FOR_EVO_SZ)
        }
        generateOneOffDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                EVO_FLAVOR_INDEX
            ],
            edoName,
            Flavor.EVO,
        )
    }
} else if (
    differenceCase === DifferenceCase._3A_REVO_DIFFERENT_REVO_COULD_BE_EVO
) {
    // CASE 3.A: Evo and Evo-SZ identical, Revo different,
    // but Revo could be Evo, so Revo is general, and Evo(-SZ) is alt. Evo
    maybeThrowError(flavorString)
    const flavor: Flavor = flavorString.toLowerCase() as Flavor

    if (flavor === Flavor.REVO) {
        saveLog(REVO_COULD_BE_EVO_MESSAGE_FOR_REVO)

        generateOneOffGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
        )
    } else {
        if (flavor === Flavor.EVO) {
            saveLog(REVO_COULD_BE_EVO_MESSAGE_FOR_EVO)
        } else if (flavor === Flavor.EVO_SZ) {
            saveLog(REVO_COULD_BE_EVO_MESSAGE_FOR_EVO_SZ)
        }

        generateOneOffAlternateEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
        )
    }
} else if (differenceCase === DifferenceCase._4_EVO_SZ_DIFFERENT) { // TODO: audit these CASE messages
    // CASE 4: Evo and Revo identical, Evo-SZ different (note: no current occurrences)
    maybeThrowError(flavorString)

    const flavor: Flavor = flavorString.toLowerCase() as Flavor
    if (flavor === Flavor.EVO_SZ) {
        generateOneOffDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor[
                EVO_SZ_FLAVOR_INDEX
            ],
            edoName,
            flavor,
        )
    } else {
        saveLog(EVO_AND_REVO_IDENTICAL_MESSAGE_FOR_EITHER)

        generateOneOffGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
        )
    }
}
