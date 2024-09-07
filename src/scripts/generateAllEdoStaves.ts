import { program } from "commander"
import { Edo, EDO_NOTATION_DEFINITIONS, Flavor, Nominal } from "@sagittal/system"
import { asyncGenerateDiagram } from "../diagram"
import { computeStaffCodeInputSentence } from "../inputSentence"
import { Filename, Index, Io, Sentence } from "@sagittal/general"
import { extractKeyInfoFromInputSentence } from "../compare"
import { Code } from "staff-code/dist/package/cjs/bin"

program
    .option("-r, --root <string>", "root (F, C, G, D, A, E, or B; default C)", "c")

program.parse()
const { root: rootString }: { root: string } = program.opts()
const root: Nominal = rootString.toLowerCase() as Nominal

const EVO: Index<Io & Sentence> = 0 as Index<Io & Sentence>
const EVO_SZ: Index<Io & Sentence> = 1 as Index<Io & Sentence>
const REVO: Index<Io & Sentence> = 2 as Index<Io & Sentence>

const FLAVORS: Flavor[] = Object.values(Flavor)

Object.keys(EDO_NOTATION_DEFINITIONS)
    .map((edoString: string): Edo => parseInt(edoString) as Edo)
    .forEach((edo: Edo): void => {
        const inputSentences: (Io & Sentence)[] = FLAVORS.map((flavor: Flavor): Io & Sentence =>
            computeStaffCodeInputSentence(edo, flavor, { root })
        )

        const keyInfos: Sentence[] = inputSentences.map(extractKeyInfoFromInputSentence)

        if (keyInfos[EVO] === keyInfos[EVO_SZ]) {
            if (keyInfos[EVO] === keyInfos[REVO]) {
                // case 2: all three identical, generate one big shared diagram
                asyncGenerateDiagram(
                    inputSentences[EVO],
                    `Sagittal notation for ${edo}-EDO`,
                    `${edo}-EDO.svg` as Filename
                ).then()
            } else {
                // case 3: evo and evo_sz identical, revo different
                asyncGenerateDiagram(
                    inputSentences[EVO],
                    `Evo Sagittal notation for ${edo}-EDO`,
                    `${edo}-EDO_Evo.svg` as Filename
                ).then()
                asyncGenerateDiagram(
                    inputSentences[REVO],
                    `Revo Sagittal notation for ${edo}-EDO`,
                    `${edo}-EDO_Revo.svg` as Filename
                ).then()
            }
        } else if (keyInfos[EVO] === keyInfos[REVO]) {
            // case 4: evo and revo identical, evo-sz different
            asyncGenerateDiagram(
                inputSentences[EVO],
                `Sagittal notation for ${edo}-EDO`,
                `${edo}-EDO.svg` as Filename
            ).then()
            asyncGenerateDiagram(
                inputSentences[EVO_SZ],
                `Evo-SZ Sagittal notation for ${edo}-EDO`,
                `${edo}-EDO_Evo-SZ.svg` as Filename
            ).then()
        } else {
            // case 1: none identical; three separate diagrams
            asyncGenerateDiagram(
                inputSentences[EVO],
                `Evo Sagittal notation for ${edo}-EDO`,
                `${edo}-EDO_Evo.svg` as Filename
            ).then()
            asyncGenerateDiagram(
                inputSentences[EVO_SZ],
                `Evo-SZ Sagittal notation for ${edo}-EDO`,
                `${edo}-EDO_Evo-SZ.svg` as Filename
            ).then()
            asyncGenerateDiagram(
                inputSentences[REVO],
                `Revo Sagittal notation for ${edo}-EDO`,
                `${edo}-EDO_Revo.svg` as Filename
            ).then()
        }
    })
