import { Edo, EDO_NOTATION_DEFINITIONS, EdoName } from "@sagittal/system"
import { program } from "commander"
import { generateContext } from "../context/context"
import { isUndefined } from "@sagittal/general"
import {
    Subsection,
    sortSubsections,
    gatherSubsectionsForEdoName,
} from "../context"

program.option("-e, --edo <number>", "EDO number")

program.parse()
const { edo }: { edo: Edo } = program.opts()

const subsections: Subsection[] = []

const edoName: EdoName = edo.toString() as EdoName
gatherSubsectionsForEdoName(edoName, subsections)

const secondBestFifthEdoName: EdoName = `${edo}b` as EdoName
if (!isUndefined(EDO_NOTATION_DEFINITIONS[secondBestFifthEdoName])) {
    gatherSubsectionsForEdoName(secondBestFifthEdoName, subsections)
}

sortSubsections(subsections)

generateContext(edo, subsections)
