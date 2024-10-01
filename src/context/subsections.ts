import { Edo, EDO_NOTATION_DEFINITIONS, EdoName } from "@sagittal/system"
import { Subsection } from "./types"
import { gatherSubsectionsForEdoName } from "./gather"
import { isUndefined } from "@sagittal/general"
import { sortSubsections } from "./sort"

const computeSubsections = (edo: Edo): Subsection[] => {
    const subsections: Subsection[] = []

    const edoName: EdoName = edo.toString() as EdoName
    gatherSubsectionsForEdoName(edoName, subsections)
    
    const secondBestFifthEdoName: EdoName = `${edo}b` as EdoName
    if (!isUndefined(EDO_NOTATION_DEFINITIONS[secondBestFifthEdoName])) {
        gatherSubsectionsForEdoName(secondBestFifthEdoName, subsections, {isSecondBestNotation: true})
    }
    
    return sortSubsections(subsections)
}

export { computeSubsections }