import { Edo, EDO_NOTATION_DEFINITIONS, EdoName } from "@sagittal/system"
import { Subsection } from "./types"
import { gatherSubsectionsForEdoName } from "./gather"
import { isUndefined } from "@sagittal/general"

const computeSubsectionsForEachFifth = (edo: Edo): Subsection[][] => {
    const edoName: EdoName = edo.toString() as EdoName
    const subsections: Subsection[] = gatherSubsectionsForEdoName(edoName)

    const secondBestFifthEdoName: EdoName = `${edo}b` as EdoName
    if (!isUndefined(EDO_NOTATION_DEFINITIONS[secondBestFifthEdoName])) {
        const secondBestFifthSubsections: Subsection[] =
            gatherSubsectionsForEdoName(secondBestFifthEdoName)
        return [subsections, secondBestFifthSubsections]
    } else {
        return [subsections]
    }
}

export { computeSubsectionsForEachFifth }
