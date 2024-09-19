import { Io, Sentence } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import {
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    FORMATTED_FLAVOR_NAMES,
    REVO_FLAVOR_INDEX,
} from "./constants"
import { generateDiagram } from "./all"

const generateGeneralDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edo, {
        // TODO: flavorTitlePart instead of formattedFlavorName
        formattedFlavorName: "",
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO],
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateEvoSZDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ],
        flavorIndex: EVO_SZ_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateRevoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.REVO],
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateAlternativeEvoDiagram = async (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): Promise<void> =>
    await generateDiagram(inputSentences, edo, {
        formattedFlavorName: `Alternative ${
            FORMATTED_FLAVOR_NAMES[Flavor.EVO]
        }`,
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
}
