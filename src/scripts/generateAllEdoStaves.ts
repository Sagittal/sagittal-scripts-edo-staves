import {
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    parseEdoName,
} from "@sagittal/system"
import { Io, isUndefined, Max, program, scriptSettings, Sentence } from "@sagittal/general"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateGeneralDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
    REVO_FLAVOR_INDEX,
} from "../diagram"
import { getInfos } from "../diagram/generate/infos"

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

    const {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
        revoCouldBeEvo,
        keyInfos,
    }: {
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
            Sentence)[]
        revoCouldBeEvo: boolean
        keyInfos: Sentence[]
    } = getInfos(edoName)

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
            } else {
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
            }
        }
    } else if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
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
    } else {
        if (revoCouldBeEvo) {
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
