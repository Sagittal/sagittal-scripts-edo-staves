import { Io } from "@sagittal/general"

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

export { embedEdoPart, embedFormattedFlavorName }
