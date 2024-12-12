import { computeCentsFromPitch, Io, Precision, round } from "@sagittal/general"
import { computeCommaName } from "@sagittal/system"
import { computeFormattedCommaFromComma } from "../format"
import { CommaSection } from "../types"
import { LONG_COMMA_NAME_OPTIONS, NEW_COMMA_PAGES } from "./constants"
import { fixFactoring, fixLongName } from "./format"

const computeMaybeNewCommaText = ({ commaName, superComma }: CommaSection): Io => {
    if (NEW_COMMA_PAGES.includes(commaName)) {
        const superCommaLongName = fixLongName(
            fixFactoring(computeCommaName(superComma, LONG_COMMA_NAME_OPTIONS)),
        )
        const superCommaCents = round(computeCentsFromPitch(superComma), 2 as Precision)
            .toString()
            .replace(/\.(\d)$/, ".$10") // pad with an extra zero to ensure 2 decimal places
        const formattedSuperCommaName: Io = computeFormattedCommaFromComma(superComma)

        return (
            `{{Infobox Interval | Ratio = ${formattedSuperCommaName} | Name = ${superCommaLongName} | Comma = yes}} ` +
            `The '''${superCommaLongName}''' is a comma with a ratio of '''${formattedSuperCommaName}''' ` +
            `and a value of approximately ${superCommaCents} [[cent]]s. `
        )
    } else {
        return ""
    }
}

export { computeMaybeNewCommaText }
