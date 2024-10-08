import { EdoNotationName, parseEdoNotationName } from "@sagittal/system"
import { computeSharedSagittalSequenceEdoNotationNames } from "./sharedSequences"
import { Io, Maybe } from "@sagittal/general"
import {
    computeSubsetEdoNotationNames,
    computeSupersetEdoNotationNames,
} from "./sets"

const formatEdoNotationName = (
    edoNotationName: EdoNotationName,
    { suppressEdo }: { suppressEdo: boolean } = { suppressEdo: false },
): Io => {
    const { edo, useSecondBestFifth } = parseEdoNotationName(edoNotationName)

    return useSecondBestFifth
        ? `[[${edo}-EDO#Sagittal notation|${edoNotationName}]]`
        : suppressEdo
        ? `[[${edo}-EDO#Sagittal notation|${edo}]]`
        : `[[${edo}-EDO#Sagittal notation|${edo}-EDO]]`
}

const formatEdoNotationNames = (edoNotationNames: EdoNotationName[]): Io => {
    if (edoNotationNames.length === 1)
        return formatEdoNotationName(edoNotationNames[0])
    if (edoNotationNames.length === 2)
        return `EDOs ${formatEdoNotationName(edoNotationNames[0], {
            suppressEdo: true,
        })} and ${formatEdoNotationName(edoNotationNames[1], {
            suppressEdo: true,
        })}` as Io

    return `EDOs ${edoNotationNames
        .slice(0, -1)
        .map(
            (edoNotationName: EdoNotationName): Io =>
                formatEdoNotationName(edoNotationName, { suppressEdo: true }),
        )
        .join(", ")}, and ${formatEdoNotationName(
        edoNotationNames[edoNotationNames.length - 1],
        {
            suppressEdo: true,
        },
    )}` as Io
}

const maybePlural = (edoNotationNames: EdoNotationName[]): Io =>
    edoNotationNames.length > 1 ? "s" : ""

const computeRelatedEdosLine = (
    edoNotationName: EdoNotationName,
): Maybe<Io> => {
    const sharedSequenceEdoNotationNames =
        computeSharedSagittalSequenceEdoNotationNames(edoNotationName)
    const supersetEdoNotationNames =
        computeSupersetEdoNotationNames(edoNotationName)
    const subsetEdoNotationNames =
        computeSubsetEdoNotationNames(edoNotationName)

    let setsLine = undefined
    if (
        sharedSequenceEdoNotationNames.length > 0 &&
        supersetEdoNotationNames.length > 0 &&
        subsetEdoNotationNames.length > 0
    ) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNotationNames(
            sharedSequenceEdoNotationNames,
        )}, is a subset of the notation${maybePlural(
            supersetEdoNotationNames,
        )} for ${formatEdoNotationNames(
            supersetEdoNotationNames,
        )}, and is a superset of the notation${maybePlural(
            subsetEdoNotationNames,
        )} for ${formatEdoNotationNames(subsetEdoNotationNames)}.`
    } else if (
        supersetEdoNotationNames.length > 0 &&
        subsetEdoNotationNames.length > 0
    ) {
        setsLine = `This notation is a subset of the notation${maybePlural(
            supersetEdoNotationNames,
        )} for ${formatEdoNotationNames(
            supersetEdoNotationNames,
        )} and a superset of the notation${maybePlural(
            subsetEdoNotationNames,
        )} for ${formatEdoNotationNames(subsetEdoNotationNames)}.`
    } else if (
        sharedSequenceEdoNotationNames.length > 0 &&
        subsetEdoNotationNames.length > 0
    ) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNotationNames(
            sharedSequenceEdoNotationNames,
        )}, and is a superset of the notation${maybePlural(
            subsetEdoNotationNames,
        )} for ${formatEdoNotationNames(subsetEdoNotationNames)}.`
    } else if (
        sharedSequenceEdoNotationNames.length > 0 &&
        supersetEdoNotationNames.length > 0
    ) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNotationNames(
            sharedSequenceEdoNotationNames,
        )}, and is a subset of the notation${maybePlural(
            supersetEdoNotationNames,
        )} for ${formatEdoNotationNames(supersetEdoNotationNames)}.`
    } else if (sharedSequenceEdoNotationNames.length > 0) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNotationNames(
            sharedSequenceEdoNotationNames,
        )}.`
    } else if (supersetEdoNotationNames.length > 0) {
        setsLine = `This notation is a subset of the notation${maybePlural(
            supersetEdoNotationNames,
        )} for ${formatEdoNotationNames(supersetEdoNotationNames)}.`
    } else if (subsetEdoNotationNames.length > 0) {
        setsLine = `This notation is a superset of the notation${maybePlural(
            subsetEdoNotationNames,
        )} for ${formatEdoNotationNames(subsetEdoNotationNames)}.`
    }

    return setsLine
}

export { computeRelatedEdosLine }
