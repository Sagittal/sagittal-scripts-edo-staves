import { EDO_NOTATION_DEFINITIONS, EdoNotationName } from "@sagittal/system"
import { Subsection } from "./types"
import { gatherSubsectionsForEdoNotationName } from "./gather"
import { Edo, isUndefined } from "@sagittal/general"

const computeSubsectionsForEachFifth = (edo: Edo): Subsection[][] => {
    const edoNotationName: EdoNotationName = edo.toString() as EdoNotationName
    const subsections: Subsection[] = gatherSubsectionsForEdoNotationName(edoNotationName)

    const secondBestFifthEdoNotationName: EdoNotationName = `${edo}b` as EdoNotationName
    if (!isUndefined(EDO_NOTATION_DEFINITIONS[secondBestFifthEdoNotationName])) {
        const secondBestFifthSubsections: Subsection[] = gatherSubsectionsForEdoNotationName(
            secondBestFifthEdoNotationName,
        )
        return [subsections, secondBestFifthSubsections]
    } else {
        return [subsections]
    }
}

export { computeSubsectionsForEachFifth }
