import { Filename, Io } from "@sagittal/general"
import { Edo, EdoName, parseEdoName } from "@sagittal/system"
import { embedEdoPart, embedFormattedFlavorName } from "./embed"

const computeFilename = ({
    edoName,
    flavorTitlePart,
}: {
    edoName: EdoName
    flavorTitlePart: Io
}): Filename => {
    const {
        edo,
        useSecondBestFifth,
    }: { edo: Edo; useSecondBestFifth: boolean } = parseEdoName(edoName)

    return `${edo}${embedEdoPart(useSecondBestFifth)}${embedFormattedFlavorName(
        flavorTitlePart,
        { useUnderscores: true },
    )}.svg` as Filename
}

export { computeFilename }
