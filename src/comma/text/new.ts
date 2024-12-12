import { Comma, computeCentsFromPitch, Io, Name, Precision, round } from "@sagittal/general"
import { computeCommaName } from "@sagittal/system"
import { computeFormattedCommaFromComma } from "../format"
import { CommaSection } from "../types"
import { LONG_COMMA_NAME_OPTIONS } from "./constants"

const NEW_COMMA_PAGES: Name<Comma>[] = ["35L", "13/7S", "25⋅11/7M"] as Name<Comma>[]

const computeMaybeNewCommaText = ({ commaName, superComma }: CommaSection): Io => {
    if (NEW_COMMA_PAGES.includes(commaName)) {
        const superCommaLongName = computeCommaName(superComma, LONG_COMMA_NAME_OPTIONS)
            .replace(/-/g, " ")
            .replace(/5²/g, "25")
            .toLowerCase()
        const superCommaCents = round(computeCentsFromPitch(superComma), 2 as Precision)
            .toString()
            .replace(/\.(\d)$/, ".$10")
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
