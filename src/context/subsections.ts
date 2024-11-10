import { Edo, isUndefined, stringify } from "@sagittal/general"
import { EDO_NOTATION_DEFINITIONS, EdoNotationName } from "@sagittal/system"
import { gatherSubsectionsForEdoNotationName } from "./gather"
import { Subsection } from "./types"

const computeSubsectionsForEachFifth = (edo: Edo): Subsection[][] => {
    const edoNotationName: EdoNotationName = stringify(edo) as EdoNotationName
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
