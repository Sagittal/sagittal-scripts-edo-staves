import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    parseEdoNotationName,
} from "@sagittal/system"
import {
    Io,
    isUndefined,
    Max,
    program,
    scriptSettings,
    Sentence,
} from "@sagittal/general"
import {
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateGeneralDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
} from "../diagram"
import { computeSentencesAndDifferenceCase } from "../difference"
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

const edoNotationNames: EdoNotationName[] = Object.keys(
    EDO_NOTATION_DEFINITIONS,
) as EdoNotationName[]

edoNotationNames.forEach((edoNotationName: EdoNotationName): void => {
    const edo: Edo = parseEdoNotationName(edoNotationName).edo
    if (edo > maxEdo) return

    const {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
        differenceCase,
    }: {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
            Sentence)[]
        differenceCase: DifferenceCase
    } = computeSentencesAndDifferenceCase(edoNotationName)

    if (differenceCase === DifferenceCase._1_ALL_DIFFERENT) {
        generateEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateEvoSZDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateRevoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
    } else if (
        differenceCase === DifferenceCase._1A_ALL_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateAlternativeEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateEvoSZDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
    } else if (differenceCase === DifferenceCase._2_NONE_DIFFERENT) {
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
    } else if (differenceCase === DifferenceCase._3_REVO_DIFFERENT) {
        generateEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateRevoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
    } else if (
        differenceCase === DifferenceCase._3A_REVO_DIFFERENT_REVO_COULD_BE_EVO
    ) {
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateAlternativeEvoDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
    } else if (differenceCase === DifferenceCase._4_EVO_SZ_DIFFERENT) {
        generateGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
        generateEvoSZDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edoNotationName,
            { dryRun },
        )
    }
})
