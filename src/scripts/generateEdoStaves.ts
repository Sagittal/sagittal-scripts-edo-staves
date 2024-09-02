import { program } from "commander"
import { Flavor } from "@sagittal/system"
import { asyncGenerateDiagram } from "../diagram"
import { Edo, Nominal } from "../../../../system/src/notations/edo/types"

program
    .option("-e, --edo <number>", "edo number")
    .option("-f, --flavor <string>", "flavor (Evo, Evo-SZ, or Revo)")
    .option("-r, --root <string>", "root (F, C, G, D, A, E, or B; default C)", "c")

program.parse()
const { edo: edoString, flavor: flavorString, root: rootString }: { edo: string, flavor: string, root: string } = program.opts()
const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor
const root: Nominal = rootString.toLowerCase() as Nominal

asyncGenerateDiagram({ edo, flavor, root }).then()
