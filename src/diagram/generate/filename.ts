
import { Filename, Io } from "@sagittal/general"
import { Edo } from "@sagittal/system"
import { embedEdoPart, embedFormattedFlavorName } from "./embed"

const computeFilename = ({
    edo,
    useSecondBestFifth,
    formattedFlavorName,
}: {
    edo: Edo
    useSecondBestFifth: boolean
    formattedFlavorName: Io
}): Filename =>
    `${edo}${embedEdoPart(useSecondBestFifth)}${embedFormattedFlavorName(
        formattedFlavorName,
        { useUnderscores: true },
    )}.svg` as Filename

export { computeFilename }
