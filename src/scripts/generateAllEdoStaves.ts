import { Flavor } from "@sagittal/system"
import { asyncGenerateDiagram } from "../diagram"
import { Edo } from "../types"
import { EDO_NOTATION_DEFINITIONS } from "../definitions"

Object.values(Flavor).forEach((flavor: Flavor) =>
    Object.keys(EDO_NOTATION_DEFINITIONS).forEach(async (edoString: string): Promise<void> =>
        await asyncGenerateDiagram({ edo: parseInt(edoString) as Edo, flavor })
    )
)
