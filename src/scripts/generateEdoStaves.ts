import { program } from "commander"
import { Edo, Flavor } from "@sagittal/system"
import { Io, Sentence } from "@sagittal/general"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../sentence"
import { generateOneOffDiagram } from "../diagram"

program
    .option("-e, --edo <number>", "edo number")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")

program.parse()
const { edo: edoString, flavor: flavorString }: { edo: string, flavor: string } = program.opts()
const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor

const defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence: Io & Sentence = computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(edo, flavor)
console.log(defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence)

generateOneOffDiagram(defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence, edo, { flavor })
