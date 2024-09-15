import { Io } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { embedEdoPart, embedFormattedFlavorName } from "./embed"

const computeTitle = ({
    edo,
    useSecondBestFifth,
    formattedFlavorName,
}: {
    edo: Edo
    useSecondBestFifth: boolean
    formattedFlavorName: Io
}): Io =>
    `${edo}${embedEdoPart(useSecondBestFifth)}${embedFormattedFlavorName(
        formattedFlavorName,
    )} Sagittal notation`

export { computeTitle }
