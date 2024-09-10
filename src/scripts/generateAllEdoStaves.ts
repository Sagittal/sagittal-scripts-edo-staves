import { Edo, EDO_NOTATION_DEFINITIONS, Flavor } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../sentence"
import { Io, program, Sentence } from "@sagittal/general"
import {
    extractKeyInfoFromInputSentence,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateGeneralDiagram,
    generateRevoDiagram,
    REVO_FLAVOR_INDEX
} from "../diagram"

const FLAVORS: Flavor[] = Object.values(Flavor)

program
    .option("-d, --dry-run")

program.parse()
const { dryRun }: { dryRun: string } = program.opts()

Object.keys(EDO_NOTATION_DEFINITIONS)
    .map((edoString: string): Edo => parseInt(edoString) as Edo)
    .forEach((edo: Edo): void => {
        if (edo > 72) return
        
        const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences: (Io & Sentence)[] = FLAVORS.map((flavor: Flavor): Io & Sentence =>
            computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(edo, flavor)
        )

        const keyInfos: Sentence[] = defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences.map(extractKeyInfoFromInputSentence)

        if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX]) {
            if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
                // CASE 2: all three identical, generate one big shared diagram
                generateGeneralDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            } else {
                // CASE 3: evo and evo_sz identical, revo different
                generateEvoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                generateRevoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            }
        } else if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
            // CASE 4: evo and revo identical, evo-sz different
            generateGeneralDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            generateEvoSZDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
        } else {
            // CASE 1: none identical; three separate diagrams
            generateEvoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            generateEvoSZDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            generateRevoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
        }
    })
