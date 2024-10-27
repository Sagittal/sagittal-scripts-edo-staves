import { program } from "commander"
import { generateContext } from "../context"
import { Subsection, computeSubsectionsForEachFifth } from "../context"
import { Edo } from "@sagittal/general"

program.option("-e, --edo <number>", "EDO number")

program.parse()
const { edo }: { edo: Edo } = program.opts()

const subsectionsForEachFifth: Subsection[][] = computeSubsectionsForEachFifth(edo)
generateContext(edo, subsectionsForEachFifth)
