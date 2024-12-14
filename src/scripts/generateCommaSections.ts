import { Io, saveLog, scriptSettings } from "@sagittal/general"
import { convertCommaSectionToText, sortByNumeratorDescending, COMMA_SECTIONS } from "../comma"

scriptSettings.disableColors = true

const commaSectionTexts: Io[] = sortByNumeratorDescending(COMMA_SECTIONS).map(convertCommaSectionToText)

commaSectionTexts.forEach((commaSectionText: Io): void => {
    saveLog(commaSectionText)
})
