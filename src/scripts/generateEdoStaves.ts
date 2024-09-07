import { program } from "commander"
import { Edo, Flavor, Nominal } from "@sagittal/system"
import { computeStaffCodeInputSentence } from "../inputSentence"
import { Io, Sentence } from "@sagittal/general"
import { generateOneOffDiagram } from "../diagram"

program
    .option("-e, --edo <number>", "edo number")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")
    .option("-r, --root <string>", "root (F, C, G, D, A, E, or B; default C)", "c")

program.parse()
const { edo: edoString, flavor: flavorString, root: rootString }: { edo: string, flavor: string, root: string } = program.opts()
const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor
// TODO: FIX OR COMPLETELY REMOVE ROOT 
// okay shit but won't the choice of root affect which things align? I think for now I just need to totally rip out all the stuff about custom root
const root: Nominal = rootString.toLowerCase() as Nominal

const inputSentence: Io & Sentence = computeStaffCodeInputSentence(edo, flavor, { root })
console.log(inputSentence)

generateOneOffDiagram(inputSentence, edo, { flavor })
