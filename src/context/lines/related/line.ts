import { EdoName, parseEdoName } from "@sagittal/system"
import { computeSharedSagittalSequenceEdoNames } from "./sharedSequences"
import { Io, Maybe } from "@sagittal/general"
import { computeSubsetEdoNames, computeSupersetEdoNames } from "./sets"

const formatEdoName = (
    edoName: EdoName,
    { suppressEdo }: { suppressEdo: boolean } = { suppressEdo: false },
): Io => {
    const { edo, useSecondBestFifth } = parseEdoName(edoName)

    return useSecondBestFifth
        ? `[[${edo}-EDO#Sagittal notation|${edoName}]]`
        : suppressEdo
        ? `[[${edo}-EDO#Sagittal notation|${edo}]]`
        : `[[${edo}-EDO#Sagittal notation|${edo}-EDO]]`
}

const formatEdoNameList = (edoNames: EdoName[]): Io => {
    if (edoNames.length === 1) return formatEdoName(edoNames[0])
    if (edoNames.length === 2)
        return `EDOs ${formatEdoName(edoNames[0], {
            suppressEdo: true,
        })} and ${formatEdoName(edoNames[1], { suppressEdo: true })}` as Io

    return `EDOs ${edoNames
        .slice(0, -1)
        .map(
            (edoName: EdoName): Io =>
                formatEdoName(edoName, { suppressEdo: true }),
        )
        .join(", ")}, and ${formatEdoName(edoNames[edoNames.length - 1], {
        suppressEdo: true,
    })}` as Io
}

const maybePlural = (edoNames: EdoName[]): Io =>
    edoNames.length > 1 ? "s" : ""

const computeRelatedEdosLine = (edoName: EdoName): Maybe<Io> => {
    const sharedSequenceEdoNames =
        computeSharedSagittalSequenceEdoNames(edoName)
    const supersetEdoNames = computeSupersetEdoNames(edoName)
    const subsetEdoNames = computeSubsetEdoNames(edoName)

    let setsLine = undefined
    if (
        sharedSequenceEdoNames.length > 0 &&
        supersetEdoNames.length > 0 &&
        subsetEdoNames.length > 0
    ) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNameList(
            sharedSequenceEdoNames,
        )}, is a subset of the notation${maybePlural(
            supersetEdoNames,
        )} for ${formatEdoNameList(
            supersetEdoNames,
        )}, and is a superset of the notation${maybePlural(
            subsetEdoNames,
        )} for ${formatEdoNameList(subsetEdoNames)}.`
    } else if (supersetEdoNames.length > 0 && subsetEdoNames.length > 0) {
        setsLine = `This notation is a subset of the notation${maybePlural(
            supersetEdoNames,
        )} for ${formatEdoNameList(
            supersetEdoNames,
        )} and a superset of the notation${maybePlural(
            subsetEdoNames,
        )} for ${formatEdoNameList(subsetEdoNames)}.`
    } else if (sharedSequenceEdoNames.length > 0 && subsetEdoNames.length > 0) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNameList(
            sharedSequenceEdoNames,
        )}, and is a superset of the notation${maybePlural(
            subsetEdoNames,
        )} for ${formatEdoNameList(subsetEdoNames)}.`
    } else if (
        sharedSequenceEdoNames.length > 0 &&
        supersetEdoNames.length > 0
    ) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNameList(
            sharedSequenceEdoNames,
        )}, and is a subset of the notation${maybePlural(
            supersetEdoNames,
        )} for ${formatEdoNameList(supersetEdoNames)}.`
    } else if (sharedSequenceEdoNames.length > 0) {
        setsLine = `This notation uses the same sagittal sequence as ${formatEdoNameList(
            sharedSequenceEdoNames,
        )}.`
    } else if (supersetEdoNames.length > 0) {
        setsLine = `This notation is a subset of the notation${maybePlural(
            supersetEdoNames,
        )} for ${formatEdoNameList(supersetEdoNames)}.`
    } else if (subsetEdoNames.length > 0) {
        setsLine = `This notation is a superset of the notation${maybePlural(
            subsetEdoNames,
        )} for ${formatEdoNameList(subsetEdoNames)}.`
    }

    return setsLine
}

export { computeRelatedEdosLine }
