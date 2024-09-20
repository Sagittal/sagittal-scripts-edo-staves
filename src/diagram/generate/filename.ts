import { Filename, Io } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { embedEdoPart, embedFormattedFlavorName } from "./embed"

const computeFilename = ({
    edo,
    useSecondBestFifth,
    flavorTitlePart,
}: {
    edo: Edo
    useSecondBestFifth: boolean
    flavorTitlePart: Io
}): Filename =>
    `${edo}${embedEdoPart(useSecondBestFifth)}${embedFormattedFlavorName(
        flavorTitlePart,
        { useUnderscores: true },
    )}.svg` as Filename

export { computeFilename }
