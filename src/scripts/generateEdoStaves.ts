import { program } from "commander"
import { Filename } from "@sagittal/general"
import { Flavor } from "@sagittal/system"
import { asyncGenerateDiagram } from "../diagram"
import { Edo } from "../types"

const font = "./node_modules/staff-code/dist/package/assets/fonts/BravuraTextSC.otf" as Filename

program
    .option("-e, --edo <number>", "edo")
    .option("-f, --flavor <string>", "flavor")

program.parse()
const { edo: edoString, flavor: flavorString }: { edo: string, flavor: string } = program.opts()
const edo: Edo = parseInt(edoString) as Edo
const flavor: Flavor = flavorString.toLowerCase() as Flavor

asyncGenerateDiagram({ edo, flavor }).then()
