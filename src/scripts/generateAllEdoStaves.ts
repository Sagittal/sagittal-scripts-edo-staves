import { program } from "commander"
import { Flavor } from "@sagittal/system"
import { asyncGenerateDiagram } from "../diagram"
import { Edo, Nominal } from "../types"
import { EDO_NOTATION_DEFINITIONS } from "../definitions"

program
    .option("-r, --root <string>", "root (F, C, G, D, A, E, or B; default C)", "c")

program.parse()
const { root: rootString }: { root: string } = program.opts()
const root: Nominal = rootString.toLowerCase() as Nominal

const EDOS: Edo[] = Object.keys(EDO_NOTATION_DEFINITIONS)
    .map((edoString: string): Edo => parseInt(edoString) as Edo);
    // .sort((a, b) => a - b)
    
// console.log(EDOS)

    // Object.values(Flavor).forEach(async (flavor: Flavor) => {
    // Object.keys(EDO_NOTATION_DEFINITIONS).forEach(async (edoString: string): Promise<void> =>
    //     await asyncGenerateDiagram({ edo: parseInt(edoString) as Edo, flavor, root })
    // )
    (async () => {
        for (const edo of EDOS) {
            // console.log(edo)
            await asyncGenerateDiagram({ edo, flavor: Flavor.EVO, root })
        }
    })()
// })
