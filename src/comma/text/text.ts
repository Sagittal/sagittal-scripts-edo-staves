import { Comma, Io, Name } from "@sagittal/general"
import { CommaSection } from "../types"
import { computeMainText } from "./main"
import { computeMaybeNewCommaText } from "./new"
import { computeOppositeText } from "./opposite"
import { computePrimaryRoleText } from "./primary"
import { computeMaybeRareText } from "./rare"
import { computeUrlText } from "./url"

const convertCommaSectionToText = ([commaName, commaSection]: [Name<Comma>, CommaSection]): Io => {
    const commaSectionText: Io =
        computeUrlText(commaSection) +
        computeMaybeNewCommaText(commaName, commaSection) + // TODO these signatures should be consistent or nice somehow
        computeMainText(commaName, commaSection) +
        computePrimaryRoleText(commaSection) +
        computeOppositeText(commaName, commaSection) +
        computeMaybeRareText(commaName)

    return commaSectionText
}

export { convertCommaSectionToText }
