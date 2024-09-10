import { Edo, EDO_NOTATION_DEFINITIONS, Flavor } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../sentence"
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
    REVO_FLAVOR_INDEX
} from "../diagram"
import { computeRevoCouldBeEvo } from "../diagram/revoCouldBeEvo"

const FLAVORS: Flavor[] = Object.values(Flavor)

program
    .option("-d, --dry-run")

program.parse()
const { dryRun: dryRunString }: { dryRun: string } = program.opts()
const dryRun: boolean = !isUndefined(dryRunString)

Object.keys(EDO_NOTATION_DEFINITIONS)
    .map((edoString: string): Edo => parseInt(edoString) as Edo)
    .forEach((edo: Edo): void => {
        if (edo > 72) return
        
        const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences: (Io & Sentence)[] = FLAVORS.map((flavor: Flavor): Io & Sentence =>
            computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(edo, flavor)
        )

        const revoCouldBeEvo: boolean = computeRevoCouldBeEvo(edo)

        const keyInfos: Sentence[] = defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences.map(extractKeyInfoFromInputSentence)

        if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX]) {
            if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
                // CASE 2: all three identical, generate one big shared diagram
                generateGeneralDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            } else {
                if (revoCouldBeEvo) {
                    // CASE 3.A: 
                    generateGeneralDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                    generateAlternativeEvoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                } else {
                    // CASE 3: evo and evo_sz identical, revo different
                    generateEvoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                    generateRevoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                }
            }
        } else if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
            // CASE 4: evo and revo identical, evo-sz different
            generateGeneralDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            generateEvoSZDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
        } else {
            if (revoCouldBeEvo) {
                // CASE 1.A: 
                generateGeneralDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                generateAlternativeEvoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                generateEvoSZDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            } else {
                // CASE 1: none identical; three separate diagrams
                generateEvoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                generateEvoSZDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
                generateRevoDiagram(defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentences, edo, { dryRun })
            }
        }
    })
