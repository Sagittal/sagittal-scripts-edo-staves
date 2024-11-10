import { Edo, isUndefined, Max, program, scriptSettings } from "@sagittal/general"
import { generateContext, computeSubsectionsForEachFifth, Subsection, DEFINED_EDOS } from "../context"

scriptSettings.disableColors = true

program.option("-d, --dry-run").option("-m, --max-edo <number>", "max EDO to generate diagram for")

program.parse()
const { dryRun: dryRunString, maxEdo: maxEdoString }: { dryRun: string; maxEdo: string } = program.opts()
const dryRun = !isUndefined(dryRunString)
const maxEdo: Max<Edo> = isUndefined(maxEdoString)
    ? (Infinity as Max<Edo>)
    : (parseInt(maxEdoString) as Max<Edo>)

DEFINED_EDOS.forEach((edo: Edo): void => {
    if (edo > maxEdo) return

    const subsectionsForEachFifth: Subsection[][] = computeSubsectionsForEachFifth(edo)
    generateContext(edo, subsectionsForEachFifth, dryRun)
})
