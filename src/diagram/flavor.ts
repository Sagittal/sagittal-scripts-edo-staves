import { Io, Sentence } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { FORMATTED_FLAVOR_NAMES } from "./constants"
import { generateDiagram } from "./allOrOneOff"
import { EVO_FLAVOR_INDEX, EVO_SZ_FLAVOR_INDEX, REVO_FLAVOR_INDEX } from "."

const generateGeneralDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: "",
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateEvoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO],
        flavorIndex: EVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateEvoSZDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ],
        flavorIndex: EVO_SZ_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateRevoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
        formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.REVO],
        flavorIndex: REVO_FLAVOR_INDEX,
        dryRun,
        useSecondBestFifth,
    })

const generateAlternativeEvoDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    {
        dryRun,
        useSecondBestFifth,
    }: { dryRun: boolean; useSecondBestFifth: boolean },
): void =>
    generateDiagram(inputSentences, edo, {
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
