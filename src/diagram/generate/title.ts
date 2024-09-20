import { Io } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { embedEdoPart, embedFormattedFlavorName } from "./embed"

const computeTitle = ({
    edo,
    useSecondBestFifth,
    flavorTitlePart,
}: {
    edo: Edo
    useSecondBestFifth: boolean
    flavorTitlePart: Io
}): Io =>
    `${edo}${embedEdoPart(useSecondBestFifth)}${embedFormattedFlavorName(
        flavorTitlePart,
    )} Sagittal notation`

export { computeTitle }
