import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    parseEdoName,
} from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../sentence"
import { Io, isUndefined, Max, program, Sentence } from "@sagittal/general"
import {
    extractKeyInfoFromInputSentence,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateGeneralDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
    REVO_FLAVOR_INDEX,
    computeRevoCouldBeEvo,
} from "../diagram"

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

    const revoCouldBeEvo: boolean = computeRevoCouldBeEvo(edoName)

    const keyInfos: Sentence[] =
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor.map(
            extractKeyInfoFromInputSentence,
        )

    if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX]) {
        if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
            // CASE 2: all three identical, generate one big shared diagram
            generateGeneralDiagram(
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                edoName,
                { dryRun },
            )
        } else {
            if (revoCouldBeEvo) {
                // CASE 3.A:
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
            } else {
                // CASE 3: evo and evo_sz identical, revo different
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
            }
        }
    } else if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
        // CASE 4: evo and revo identical, evo-sz different
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
    } else {
        if (revoCouldBeEvo) {
            // CASE 1.A:
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
        } else {
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
        }
    }
})
