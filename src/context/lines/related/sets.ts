import {
    deepEquals,
    dividesEvenly,
    Edo,
    Io,
    isUndefined,
    Max,
    max,
    min,
    Min,
    Sentence,
    Word,
} from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    Flavor,
    parseEdoNotationName,
    SubsetFactor,
} from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../../../sentence"
import { extractKeyInfoFromInputSentence } from "../../../diagram"
import { DEFINED_EDOS } from "../../constants"

const MAX_DEFINED_EDO: Max<Edo> = max(...DEFINED_EDOS)
const MIN_DEFINED_EDO: Min<Edo> = min(...DEFINED_EDOS)

const ARBITRARY_BUT_CONSISENT_FLAVOR: Flavor = Flavor.REVO

const computeParsedKeyInfo = (edoNotationName: EdoNotationName): Word[] => {
    const notation: Io & Sentence = computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
        edoNotationName,
        ARBITRARY_BUT_CONSISENT_FLAVOR,
    )
    const keyInfo: Sentence = extractKeyInfoFromInputSentence(notation)
    const parsedKeyInfo: Word[] = parseKeyInfo(keyInfo)

    return parsedKeyInfo
}

const computeIsSuperset = ({
    candidateSupersetEdoNotationName,
    candidateSubsetEdoNotationName,
}: {
    candidateSupersetEdoNotationName: EdoNotationName
    candidateSubsetEdoNotationName: EdoNotationName
}): boolean => {
    const subsetFactor: SubsetFactor = (parseEdoNotationName(candidateSupersetEdoNotationName).edo /
        parseEdoNotationName(candidateSubsetEdoNotationName).edo) as SubsetFactor

    const parsedKeyInfo = computeParsedKeyInfo(candidateSubsetEdoNotationName)
    const supersetParsedKeyInfo = computeParsedKeyInfo(candidateSupersetEdoNotationName)

    const candidateMatchParsedKeyInfo = supersetParsedKeyInfo.filter((_: string, step: number) => {
        return dividesEvenly(step, subsetFactor)
    })

    return deepEquals(candidateMatchParsedKeyInfo, parsedKeyInfo)
}

const computeSupersetEdoNotationNames = (edoNotationName: EdoNotationName): EdoNotationName[] => {
    const edo: Edo = parseEdoNotationName(edoNotationName).edo

    const supersetEdoNotationNames: EdoNotationName[] = []

    let subsetFactor: SubsetFactor = 1 as SubsetFactor
    let supersetEdo: Edo = edo

    while (supersetEdo <= MAX_DEFINED_EDO) {
        subsetFactor = (subsetFactor + 1) as SubsetFactor
        supersetEdo = (edo * subsetFactor) as Edo

        const supersetEdoNotationName: EdoNotationName = supersetEdo.toString() as EdoNotationName
        if (!isUndefined(EDO_NOTATION_DEFINITIONS[supersetEdoNotationName])) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoNotationName: supersetEdoNotationName,
                    candidateSubsetEdoNotationName: edoNotationName,
                })
            ) {
                supersetEdoNotationNames.push(supersetEdoNotationName)
            }
        }

        const supersetSecondBestFifthEdoNotationName: EdoNotationName =
            `${supersetEdoNotationName}b` as EdoNotationName
        if (!isUndefined(EDO_NOTATION_DEFINITIONS[supersetSecondBestFifthEdoNotationName])) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoNotationName: supersetSecondBestFifthEdoNotationName,
                    candidateSubsetEdoNotationName: edoNotationName,
                })
            ) {
                supersetEdoNotationNames.push(supersetSecondBestFifthEdoNotationName)
            }
        }
    }

    return supersetEdoNotationNames
}

const computeSubsetEdoNotationNames = (edoNotationName: EdoNotationName): EdoNotationName[] => {
    const edo: Edo = parseEdoNotationName(edoNotationName).edo

    const subsetEdoNotationNames: EdoNotationName[] = []

    let subsetFactor: SubsetFactor = 1 as SubsetFactor
    let subsetEdo: Edo = edo

    while (subsetEdo >= MIN_DEFINED_EDO) {
        subsetFactor = (subsetFactor + 1) as SubsetFactor
        subsetEdo = (edo / subsetFactor) as Edo

        if (!dividesEvenly(subsetEdo, 1)) continue

        const subsetEdoNotationName: EdoNotationName = subsetEdo.toString() as EdoNotationName
        if (!isUndefined(EDO_NOTATION_DEFINITIONS[subsetEdoNotationName])) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoNotationName: edoNotationName,
                    candidateSubsetEdoNotationName: subsetEdoNotationName,
                })
            ) {
                subsetEdoNotationNames.push(subsetEdoNotationName)
            }
        }

        const subsetSecondBestFifthEdoNotationName: EdoNotationName =
            `${subsetEdoNotationName}b` as EdoNotationName
        if (!isUndefined(EDO_NOTATION_DEFINITIONS[subsetSecondBestFifthEdoNotationName])) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoNotationName: edoNotationName,
                    candidateSubsetEdoNotationName: subsetSecondBestFifthEdoNotationName,
                })
            ) {
                subsetEdoNotationNames.push(subsetSecondBestFifthEdoNotationName)
            }
        }
    }

    return subsetEdoNotationNames
}

const parseKeyInfo = (keyInfo: Sentence): Word[] => {
    const parsedKeyInfo: Word[] = []
    const notePattern = /(.*?)nt/g
    let currentNominal = ""

    let notePatternMatch
    while ((notePatternMatch = notePattern.exec(keyInfo)) !== null) {
        let note = notePatternMatch[0]
        const newNominalMatch = note.match(/^([a-g][0-9])/)
        if (newNominalMatch) currentNominal = newNominalMatch[1]
        parsedKeyInfo.push(
            (currentNominal + (newNominalMatch ? note.slice(currentNominal.length) : note)) as Word,
        )
    }

    return parsedKeyInfo
}

export { computeSupersetEdoNotationNames, computeSubsetEdoNotationNames }
