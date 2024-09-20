import { Io } from "@sagittal/general"
import { Edo, EdoName } from "@sagittal/system"
import { embedEdoPart, embedFormattedFlavorName } from "./embed"
import { parseEdoName } from "@sagittal/system/dist/cjs/notations"

const computeTitle = ({
    edoName,
    flavorTitlePart,
}: {
    edoName: EdoName
    flavorTitlePart: Io
}): Io => {
    const {
        edo,
        useSecondBestFifth,
    }: { edo: Edo; useSecondBestFifth: boolean } = parseEdoName(edoName)

    return `${edo}${embedEdoPart(useSecondBestFifth)}${embedFormattedFlavorName(
        flavorTitlePart,
    )} Sagittal notation`
}

export { computeTitle }
