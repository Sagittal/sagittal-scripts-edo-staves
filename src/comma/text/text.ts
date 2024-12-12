import { Io } from "@sagittal/general"
import { CommaSection } from "../types"
import { computeMainText } from "./main"
import { computeMaybeNewCommaText } from "./new"
import { computeOppositeText } from "./opposite"
import { computePrimaryRoleText } from "./primary"
import { computeMaybeRareText } from "./rare"
import { computeUrlText } from "./url"

const convertCommaSectionToText = (commaSection: CommaSection): Io => {
    const commaSectionText: Io =
        computeUrlText(commaSection) +
        computeMaybeNewCommaText(commaSection) +
        computeMainText(commaSection) +
        computePrimaryRoleText(commaSection) +
        computeOppositeText(commaSection) +
        computeMaybeRareText(commaSection)

    return commaSectionText
}

export { convertCommaSectionToText }
