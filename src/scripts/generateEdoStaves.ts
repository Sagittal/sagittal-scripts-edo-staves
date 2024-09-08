import { program } from "commander"
import { Edo, Flavor, Nominal } from "@sagittal/system"
import { computeStaffCodeInputSentence } from "../inputSentence"
import { Io, Sentence } from "@sagittal/general"
import { generateOneOffDiagram } from "../diagram"

program
    .option("-e, --edo <number>", "edo number")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")

program.parse()
const { edo: edoString, flavor: flavorString }: { edo: string, flavor: string } = program.opts()
const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor

const inputSentence: Io & Sentence = computeStaffCodeInputSentence(edo, flavor)
console.log(inputSentence)

generateOneOffDiagram(inputSentence, edo, { flavor })
