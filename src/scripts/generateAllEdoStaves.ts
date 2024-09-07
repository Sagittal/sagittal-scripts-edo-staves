import { program } from "commander"
import { Edo, EDO_NOTATION_DEFINITIONS, Flavor, Nominal } from "@sagittal/system"
import { computeStaffCodeInputSentence } from "../inputSentence"
import { Io, Sentence } from "@sagittal/general"
import { extractKeyInfoFromInputSentence } from "../compare"
import { generateEvoDiagram, generateEvoSZDiagram, generateGeneralDiagram, generateRevoDiagram } from "../generate"
import { EVO_FLAVOR_INDEX, EVO_SZ_FLAVOR_INDEX, REVO_FLAVOR_INDEX } from "../constants"

program
    .option("-r, --root <string>", "root (F, C, G, D, A, E, or B; default C)", "c")

program.parse()
const { root: rootString }: { root: string } = program.opts()
const root: Nominal = rootString.toLowerCase() as Nominal

const FLAVORS: Flavor[] = Object.values(Flavor)

// TODO: this should create the archive (see staff-code deploy script for inspiration?) and names it according to existing ones 

Object.keys(EDO_NOTATION_DEFINITIONS)
    .map((edoString: string): Edo => parseInt(edoString) as Edo)
    .forEach((edo: Edo): void => {
        const inputSentences: (Io & Sentence)[] = FLAVORS.map((flavor: Flavor): Io & Sentence =>
            computeStaffCodeInputSentence(edo, flavor, { root })
        )

        const keyInfos: Sentence[] = inputSentences.map(extractKeyInfoFromInputSentence)

        if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX]) {
            if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
                // CASE 2: all three identical, generate one big shared diagram
                generateGeneralDiagram(inputSentences, edo)
            } else {
                // CASE 3: evo and evo_sz identical, revo different
                generateEvoDiagram(inputSentences, edo)
                generateRevoDiagram(inputSentences, edo)
            }
        } else if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]) {
            // CASE 4: evo and revo identical, evo-sz different
            generateGeneralDiagram(inputSentences, edo)
            generateEvoSZDiagram(inputSentences, edo)
        } else {
            // CASE 1: none identical; three separate diagrams
            generateEvoDiagram
            generateEvoSZDiagram(inputSentences, edo)
            generateRevoDiagram(inputSentences, edo)
        }
    })
