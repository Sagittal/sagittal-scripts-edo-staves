import { Comma, Io, Name } from "@sagittal/general"
import { convertCommaSectionToText, sortByNumeratorDescending, COMMA_SECTIONS, CommaSection } from "../comma"

const commaSectionEntries: [Name<Comma>, CommaSection][] = Object.entries(COMMA_SECTIONS) as [
    Name<Comma>,
    CommaSection,
][]

const commaSectionTexts: Io[] = sortByNumeratorDescending(commaSectionEntries).map(convertCommaSectionToText)

commaSectionTexts.forEach((commaSectionText: Io): void => {
    console.log(commaSectionText)
})
