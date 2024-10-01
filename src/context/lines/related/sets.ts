import {
    deepEquals,
    dividesEvenly,
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
    Edo,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    Flavor,
    parseEdoName,
    SubsetFactor,
} from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../../../sentence"
import { extractKeyInfoFromInputSentence } from "../../../diagram"
import { DEFINED_EDOS } from "../../constants"

const MAX_DEFINED_EDO: Max<Edo> = max(...DEFINED_EDOS)
const MIN_DEFINED_EDO: Min<Edo> = min(...DEFINED_EDOS)

const ARBITRARY_BUT_CONSISENT_FLAVOR: Flavor = Flavor.REVO

const computeParsedKeyInfo = (edoName: EdoName): Word[] => {
    const notation: Io & Sentence =
        computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
            edoName,
            ARBITRARY_BUT_CONSISENT_FLAVOR,
        )
    const keyInfo: Sentence = extractKeyInfoFromInputSentence(notation)
    const parsedKeyInfo: Word[] = parseKeyInfo(keyInfo)

    return parsedKeyInfo
}

const computeIsSuperset = ({
    candidateSupersetEdoName,
    candidateSubsetEdoName,
}: {
    candidateSupersetEdoName: EdoName
    candidateSubsetEdoName: EdoName
}): boolean => {
    const subsetFactor: SubsetFactor = (parseEdoName(candidateSupersetEdoName)
        .edo / parseEdoName(candidateSubsetEdoName).edo) as SubsetFactor

    const parsedKeyInfo = computeParsedKeyInfo(candidateSubsetEdoName)
    const supersetParsedKeyInfo = computeParsedKeyInfo(candidateSupersetEdoName)

    const candidateMatchParsedKeyInfo = supersetParsedKeyInfo.filter(
        (_: string, step: number) => {
            return dividesEvenly(step, subsetFactor)
        },
    )

    return deepEquals(candidateMatchParsedKeyInfo, parsedKeyInfo)
}

const computeSupersetEdoNames = (edoName: EdoName): EdoName[] => {
    const edo: Edo = parseEdoName(edoName).edo

    const supersetEdoNames: EdoName[] = []

    let subsetFactor: SubsetFactor = 1 as SubsetFactor
    let supersetEdo: Edo = edo

    while (supersetEdo <= MAX_DEFINED_EDO) {
        subsetFactor = (subsetFactor + 1) as SubsetFactor
        supersetEdo = (edo * subsetFactor) as Edo

        const supersetEdoName: EdoName = supersetEdo.toString() as EdoName
        if (!isUndefined(EDO_NOTATION_DEFINITIONS[supersetEdoName])) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoName: supersetEdoName,
                    candidateSubsetEdoName: edoName,
                })
            ) {
                supersetEdoNames.push(supersetEdoName)
            }
        }

        const supersetSecondBestFifthEdoName: EdoName =
            `${supersetEdoName}b` as EdoName
        if (
            !isUndefined(
                EDO_NOTATION_DEFINITIONS[supersetSecondBestFifthEdoName],
            )
        ) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoName: supersetSecondBestFifthEdoName,
                    candidateSubsetEdoName: edoName,
                })
            ) {
                supersetEdoNames.push(supersetSecondBestFifthEdoName)
            }
        }
    }

    return supersetEdoNames
}

const computeSubsetEdoNames = (edoName: EdoName): EdoName[] => {
    const edo: Edo = parseEdoName(edoName).edo

    const subsetEdoNames: EdoName[] = []

    let subsetFactor: SubsetFactor = 1 as SubsetFactor
    let subsetEdo: Edo = edo

    while (subsetEdo >= MIN_DEFINED_EDO) {
        subsetFactor = (subsetFactor + 1) as SubsetFactor
        subsetEdo = (edo / subsetFactor) as Edo

        if (!dividesEvenly(subsetEdo, 1)) continue

        const subsetEdoName: EdoName = subsetEdo.toString() as EdoName
        if (!isUndefined(EDO_NOTATION_DEFINITIONS[subsetEdoName])) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoName: edoName,
                    candidateSubsetEdoName: subsetEdoName,
                })
            ) {
                subsetEdoNames.push(subsetEdoName)
            }
        }

        const subsetSecondBestFifthEdoName: EdoName =
            `${subsetEdoName}b` as EdoName
        if (
            !isUndefined(EDO_NOTATION_DEFINITIONS[subsetSecondBestFifthEdoName])
        ) {
            if (
                computeIsSuperset({
                    candidateSupersetEdoName: edoName,
                    candidateSubsetEdoName: subsetSecondBestFifthEdoName,
                })
            ) {
                subsetEdoNames.push(subsetSecondBestFifthEdoName)
            }
        }
    }

    return subsetEdoNames
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
            (currentNominal +
                (newNominalMatch
                    ? note.slice(currentNominal.length)
                    : note)) as Word,
        )
    }

    return parsedKeyInfo
}

export { computeSupersetEdoNames, computeSubsetEdoNames }
