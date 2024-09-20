import { Io, Sentence } from "@sagittal/general"
import { Edo, EdoName, Flavor } from "@sagittal/system"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    FORMATTED_FLAVOR_NAMES,
    REVO_FLAVOR_INDEX,
    GENERAL_FLAVOR_INDEX,
} from "./constants"
import { generateDiagram } from "./all"

const generateGeneralDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edoName, {
        flavorTitlePart: "",
        flavorIndex: GENERAL_FLAVOR_INDEX,
        dryRun,
    })

const generateEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edoName, {
        flavorTitlePart: FORMATTED_FLAVOR_NAMES[Flavor.EVO],
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
    })

const generateEvoSZDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edoName, {
        flavorTitlePart: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ],
        flavorIndex: EVO_SZ_FLAVOR_INDEX,
        dryRun,
    })

const generateRevoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edoName, {
        flavorTitlePart: FORMATTED_FLAVOR_NAMES[Flavor.REVO],
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
    })

const generateAlternativeEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edoName: EdoName,
    { dryRun }: { dryRun: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edoName, {
        flavorTitlePart: `Alternative ${FORMATTED_FLAVOR_NAMES[Flavor.EVO]}`,
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
    })

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
}
