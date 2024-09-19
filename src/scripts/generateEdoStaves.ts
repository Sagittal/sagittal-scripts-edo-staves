import { program } from "commander"
import { Edo, Flavor } from "@sagittal/system"
import { Io, isUndefined, Sentence } from "@sagittal/general"
import {
    computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence,
    computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
} from "../sentence"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    extractKeyInfoFromInputSentence,
    generateOneOffDiagram,
    generateOneOffGeneralDiagram,
    REVO_FLAVOR_INDEX,
} from "../diagram"

program
    .option("-e, --edo <number>", "edo number")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")

program.parse()
let {
    edo: edoString,
    flavor: flavorString,
}: { edo: string; flavor: string } = program.opts()

if (isUndefined(edoString)) throw new Error("You must provide an EDO.")

let useSecondBestFifth: boolean = false
if (edoString.match(/b/)) {
    edoString = edoString.slice(0, edoString.length - 1)
    useSecondBestFifth = true
}
const edo: Edo = parseInt(edoString) as Edo

// TODO: actually this should be even smarter, and even if you ask for e.g. Revo when Revo === Evo,
// it should warn you of this on the console, then generate a diagram with a general name?
// so always check all flavors, even when you give a flavor?
// here's the plan: https://docs.google.com/spreadsheets/d/1qWXZb4KO2Y12HYF7Ln_XH1-dvDR2o5Ldwh4K_7dgM28/edit?gid=0#gid=0

if (isUndefined(flavorString)) {
    const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
        Sentence)[] =
        computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor(
            edo,
            useSecondBestFifth
        )
    const keyInfos: Sentence[] =
        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor.map(
            extractKeyInfoFromInputSentence,
        )

    if (
        keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX] &&
        keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]
    ) {
        generateOneOffGeneralDiagram(
            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
            edo,
            { useSecondBestFifth }
        )
    } else {
        throw new Error("The notations differ by flavor for this EDO. You must specify a flavor.")
    }
} else {
    const flavor: Flavor = flavorString.toLowerCase() as Flavor

    const defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence: Io &
        Sentence =
        computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            edo,
            flavor,
            { useSecondBestFifth }
        )

    generateOneOffDiagram(
        defaultSingleSpellingPerStepNotationAsStaffCodeInputSentence,
        edo,
        { flavor, useSecondBestFifth },
    )
}
