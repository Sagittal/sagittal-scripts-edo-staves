import { Edo, scriptSettings } from "@sagittal/general"
import { program } from "commander"
import { generateContext } from "../context"
import { Subsection, computeSubsectionsForEachFifth } from "../context"

scriptSettings.disableColors = true

program.option("-e, --edo <number>", "EDO number")

program.parse()
const { edo }: { edo: Edo } = program.opts()

const subsectionsForEachFifth: Subsection[][] = computeSubsectionsForEachFifth(edo)
generateContext(edo, subsectionsForEachFifth)
