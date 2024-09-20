import { Io } from "@sagittal/general"

const embedFormattedFlavorName = (
    flavorTitlePart: Io,
    { useUnderscores }: { useUnderscores: boolean } = { useUnderscores: false },
): Io => {
    const embeddedFormattedFlavorName = `${
        flavorTitlePart.length === 0 ? "" : " "
    }${flavorTitlePart}`

    return useUnderscores
        ? embeddedFormattedFlavorName.replace(/ /g, "_")
        : embeddedFormattedFlavorName
}

const embedEdoPart = (useSecondBestFifth: boolean): Io =>
    useSecondBestFifth ? "b" : "-EDO"

export { embedEdoPart, embedFormattedFlavorName }
