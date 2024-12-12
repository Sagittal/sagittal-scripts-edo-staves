import { Io } from "@sagittal/general"
import { convertCommaSectionToText, sortByNumeratorDescending, COMMA_SECTIONS } from "../comma"

const commaSectionTexts: Io[] = sortByNumeratorDescending(COMMA_SECTIONS).map(convertCommaSectionToText)

commaSectionTexts.forEach((commaSectionText: Io): void => {
    console.log(commaSectionText)
})
