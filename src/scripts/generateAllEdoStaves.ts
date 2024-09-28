import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    parseEdoName,
} from "@sagittal/system"
import { Io, isUndefined, Max, program, scriptSettings, Sentence } from "@sagittal/general"
import {
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateGeneralDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
} from "../diagram"
import { computeDifferenceCase } from "../difference"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../sentence"
import { DifferenceCase } from "../types"

scriptSettings.disableColors = true

program
    .option("-d, --dry-run")
    .option("-m, --max-edo <number>", "max EDO to generate diagram for")

program.parse()
const {
    dryRun: dryRunString,
    maxEdo: maxEdoString,
}: { dryRun: string; maxEdo: string } = program.opts()
const dryRun: boolean = !isUndefined(dryRunString)
const maxEdo: Max<Edo> = isUndefined(maxEdoString)
    ? (Infinity as Max<Edo>)
    : (parseInt(maxEdoString) as Max<Edo>)

const edoNames: EdoName[] = Object.keys(EDO_NOTATION_DEFINITIONS) as EdoName[]

edoNames.forEach((edoName: EdoName): void => {
    const edo: Edo = parseEdoName(edoName).edo
    if (edo > maxEdo) return

    const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
        Sentence)[] =
        computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor(
            edoName,
        )
    
    const differenceCase: DifferenceCase = computeDifferenceCase(
        edoName,
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
    )
    
    if (differenceCase === DifferenceCase._1_ALL_DIFFERENT) {
        // CASE 1: none identical; three separate diagrams
        generateEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateEvoSZDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateRevoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
    } else if (
        differenceCase === DifferenceCase._1A_ALL_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        // CASE 1.A: none identical, but Revo could be Evo, 
        // so Revo is general, Evo is alt. Evo, and Evo-SZ is Evo-SZ
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateAlternativeEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateEvoSZDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
    } else if (differenceCase === DifferenceCase._2_NONE_DIFFERENT) {
        // CASE 2: all three identical, generate one big shared diagram
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
    } else if (differenceCase === DifferenceCase._3_REVO_DIFFERENT) {
        // CASE 3: Evo and Evo-SZ identical, Revo different
        generateEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateRevoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
    } else if (
        differenceCase === DifferenceCase._3A_REVO_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        // CASE 3.A: Evo and Evo-SZ identical, Revo different, 
        // but Revo could be Evo, so Revo is general, and Evo(-SZ) is alt. Evo
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateAlternativeEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
    } else if (differenceCase === DifferenceCase._4_EVO_SZ_DIFFERENT) {
        // CASE 4: Evo and Revo identical, Evo-SZ different (note: no current occurrences)
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
        generateEvoSZDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoName,
            { dryRun },
        )
    }
})
