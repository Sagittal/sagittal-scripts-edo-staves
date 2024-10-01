import { Edo } from "@sagittal/system"
import { program } from "commander"
import { generateContext } from "../context/context"
import { Subsection, computeSubsections } from "../context"

program.option("-e, --edo <number>", "EDO number")

program.parse()
const { edo }: { edo: Edo } = program.opts()

const subsections: Subsection[] = computeSubsections(edo)
generateContext(edo, subsections)
