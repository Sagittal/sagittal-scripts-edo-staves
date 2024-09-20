import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    parseEdoName,
} from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../sentence"
import { Io, isUndefined, program, Sentence } from "@sagittal/general"
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

program.option("-d, --dry-run")

program.parse()
const { dryRun: dryRunString }: { dryRun: string } = program.opts()
const dryRun: boolean = !isUndefined(dryRunString)

const edoNames: EdoName[] = Object.keys(EDO_NOTATION_DEFINITIONS) as EdoName[]

edoNames.forEach((edoName: EdoName): void => {
    const edo: Edo = parseEdoName(edoName).edo

    // TODO: make sure it does works up to 581-EDO, using Dave's further size categories
    // maybe past a certain point it just goes into non-aligned 18 size rows
    if (edo > 72) return

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
