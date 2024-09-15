import { Filename, Io } from "@sagittal/general"
import { Edo } from "@sagittal/system"

const embedFormattedFlavorName = (
    formattedFlavorName: Io,
    { useUnderscores }: { useUnderscores: boolean } = { useUnderscores: false },
): Io => {
    const embeddedFormattedFlavorName = `${
        formattedFlavorName.length === 0 ? "" : " "
    }${formattedFlavorName}`

    return useUnderscores
        ? embeddedFormattedFlavorName.replace(/ /g, "_")
        : embeddedFormattedFlavorName
}

const embedEdoPart = (useSecondBestFifth: boolean): Io =>
    useSecondBestFifth ? "b" : "-EDO"

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

export { computeFilename, computeTitle }
