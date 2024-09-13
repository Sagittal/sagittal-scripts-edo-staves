import { program } from "commander"
import { Edo, Flavor } from "@sagittal/system"
import { Io, isUndefined, Sentence } from "@sagittal/general"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../sentence"
import { generateOneOffDiagram } from "../diagram"

program
    .option("-e, --edo <number>", "edo number")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")

program.parse()
const { edo: edoString, flavor: flavorString }: { edo: string, flavor: string } = program.opts()

if (isUndefined(edoString)) throw new Error ("You must provide an EDO.")
if (isUndefined(flavorString)) throw new Error("You must choose a flavor (Evo, Revo, or Evo-SZ).")
// TODO: actually could consider letting them leave it off, generating all, 
// and seeing if they're all the same, sort of inverting all the logic from generate-all

const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor

const defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence: Io & Sentence = computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(edo, flavor)
console.log(defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence)

generateOneOffDiagram(defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence, edo, { flavor })
