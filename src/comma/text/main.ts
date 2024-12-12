import { Comma, Io, isUndefined, Maybe, Name } from "@sagittal/general"
import { computeCommaName } from "@sagittal/system"
import { CommaSection } from "../types"
import { LONG_COMMA_NAME_OPTIONS } from "./constants"
import { fixFactoring, fixLongName } from "./format"

// TODO: obviously figure out a way to compute these
const SIMPLEST_NOTATED_DYAD_RATIOS: Record<Name<Comma>, Io> = {
    "11/7C": "11/7",
    "35L": "35/1 = 5×7 (equiv. 35/32)",
    "25S": "25/1 = 5×5 (equiv. 25/16)",
    "7/5k": "7/5",
    "17C": "17/1 (equiv. 17/16)",
    "35/11k": "35/11 = 5×7/11 (equiv. 35/22)",
    "13/7S": "13/7",
    "13M": "13/1 (equiv. 13/8)",
    "11/7k": "11/7",
    "23C": "23/1 (equiv. 23/16)",
    "11L": "11/1 (equiv. 11/8)",
    "25⋅11/7M": "25×11/7 = 5×5×11/7 (equiv. 275/224)",
    "19s": "19/1 (equiv 19/16)",
    "49/5M": "49/5 = 7×7/5 (equiv. 49/40)",
    "13/11k": "13/11",
    "143C": "143/1 = 11×13 (equiv. 143/128)",
    "5C": "5/1 (equiv. 5/4)",
    "7C": "7/1 (equiv. 7/4)",
    "55C": "55/1 = 5×11 (equiv. 55/32)",
    "23/5S": "23/5 (equiv. 23/20)",
    "11/5S": "11/5 (equiv. 11/10)",
    "13/5S": "13/5 (equiv. 13/10)",
    "35M": "35/1 = 5×7 (equiv. 35/16)",
    "11M": "11/1 (equiv. 11/8)",
    "7L": "7/1 (equiv. 7/4)",
    "13L": "13/1 (equiv. 13/8)",
} as Record<Name<Comma>, Io>

// TODO: obviously figure out a way to compute these too
const SIMPLEST_NOTATED_DYAD_SPELLINGS: Record<Name<Comma>, Io> = {
    "11/7C": "E{{nbhsp}}{{sagittal| b }}-B{{nbhsp}}{{sagittal| (! }}",
    "35L": "E-F{{nbhsp}}{{sagittal| (|\\ }}",
    "25S": "E{{nbhsp}}{{sagittal| b }}-B{{nbhsp}}{{sagittal| \\\\! }}",
    "7/5k": "B-F{{nbhsp}}{{sagittal| !( }}",
    "17C": "E-F{{nbhsp}}{{sagittal| ~|( }}",
    "35/11k": "A-F{{nbhsp}}{{sagittal| )|( }}",
    "13/7S": "C-B{{nbhsp}}{{sagittal| (!( }}",
    "13M": "A-F{{nbhsp}}{{sagittal| /|) }}",
    "11/7k": "A-F{{nbhsp}}{{sagittal| )!( }}",
    "23C": "F-B{{nbhsp}}{{sagittal| |~ }}",
    "11L": "F-B{{nbhsp}}{{sagittal| (!) }}",
    "25⋅11/7M": "C-E{{nbhsp}}{{sagittal| \\!/ }}",
    "19s": "D-F{{nbhsp}}{{sagittal| )| }}",
    "49/5M": "C-E{{nbhsp}}{{sagittal| )\\!/ }}",
    "13/11k": "D-F{{nbhsp}}{{sagittal| !( }}",
    "143C": "C-D{{nbhsp}}{{sagittal| )~! }}",
    "5C": "C-E{{nbhsp}}{{sagittal| \\! }}",
    "7C": "G-F{{nbhsp}}{{sagittal| !) }}",
    "55C": "C-A{{nbhsp}}{{sagittal| |\\ }}",
    "23/5S": "C-D{{nbhsp}}{{sagittal| /|~ }}",
    "11/5S": "C-D{{nbhsp}}{{sagittal| (!( }}",
    "13/5S": "C-F{{nbhsp}}{{sagittal| \\\\! }}",
    "35M": "C-D{{nbhsp}}{{sagittal| \\!) }}",
    "11M": "C-F{{nbhsp}}{{sagittal| /|\\ }}",
    "7L": "C-A{{nbhsp}}{{sagittal| (|\\ }}",
    "13L": "C-A{{nbhsp}}{{sagittal| (!/ }}",
} as Record<Name<Comma>, Io>

const simplestNotatedDyadRatio = (commaName: Name<Comma>) => SIMPLEST_NOTATED_DYAD_RATIOS[commaName]
const simplestNotatedDyadSpelling = (commaName: Name<Comma>) => SIMPLEST_NOTATED_DYAD_SPELLINGS[commaName]

const maybeSecondaryRole = (primaryComma: Maybe<Comma>) =>
    isUndefined(primaryComma) ? "" : "(in a secondary role) "

const computeMainText = ({ comma, commaName, isDown, sagitype, primaryComma }: CommaSection): Io => {
    const commaLongName = fixLongName(fixFactoring(computeCommaName(comma, LONG_COMMA_NAME_OPTIONS)))
    const maybeDownwardText = isDown ? "the downward version of " : ""

    return (
        `In the [[Sagittal]] system, ${maybeDownwardText}this comma (possibly tempered) ` +
        `is represented ${maybeSecondaryRole(primaryComma)}by the sagittal {{sagittal| ${sagitype} }} ` +
        `and is called the '''${commaLongName}''', or '''${commaName}''' for short, ` +
        `because the simplest interval it notates is ${simplestNotatedDyadRatio(commaName)}, ` +
        `as for example in ${simplestNotatedDyadSpelling(commaName)}. `
    )
}

export { computeMainText }
