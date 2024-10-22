import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    parseEdoNotationName,
} from "@sagittal/system"
import { computeMeaningsPathifiableTexts } from "../../../../../src/diagram/svg/meanings/pathifiableTexts"
import { DiagramType } from "../../../../../src/types"
import { Index, Io, Unicode, Word } from "@sagittal/general"
import { MAX_PERIODIC_TABLE_EDO } from "../../../../../src/constants"
import { PathifiableTexts } from "../../../../../src/diagram/svg/meanings/types"
import { debugCode } from "staff-code"
import { Font } from "../../../../../src/diagram/svg/types"

const EXPECTED_MEANINGS_TEXTS: Record<EdoNotationName, Io[]> = {
    "5": [],
    "6": ["a subset of 12-EDO"],
    "7": [],
    "8": ["a subset of 24-EDO"],
    "9": ["a bad-fifth limma-fraction notation"],
    "10": ["a bad-fifth apotome-fraction notation"],
    "11": ["a subset of 22-EDO"],
    "12": [],
    "13": ["a subset of 26-EDO"],
    "14": ["a bad-fifth limma-fraction notation"],
    "15": ["a bad-fifth apotome-fraction notation"],
    "16": ["a bad-fifth limma-fraction notation"],
    "17": [" ", " = ~11M (~33/32)"],
    "18": ["a subset of 36-EDO"],
    "19": [],
    "20": ["a bad-fifth apotome-fraction notation"],
    "21": ["a bad-fifth limma-fraction notation"],
    "22": [" ", " = ~5C (~80/81)"],
    "23": ["a bad-fifth limma-fraction notation"],
    "24": [" ", " = ~11M (~33/32)"],
    "25": ["a bad-fifth apotome-fraction notation"],
    "26": [],
    "27": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~35L (~8505/8192) ≈ ~13L up (~27/26)",
    ],
    "28": ["a bad-fifth limma-fraction notation"],
    "29": [" ", " = ~5C (~80/81)"],
    "30": ["a bad-fifth apotome-fraction notation"],
    "31": [" ", " = ~11M (~33/32)"],
    "32": ["a bad-fifth apotome-fraction notation"],
    "33": ["a bad-fifth limma-fraction notation"],
    "34": [" ", " = ~5C (~80/81),", "  ", " = ~11M (~33/32)"],
    "35": ["a bad-fifth limma-fraction notation"],
    "36": [" ", " = ~7C (~63/64)"],
    "37": ["a bad-fifth apotome-fraction notation"],
    "38": [" ", " = ~11M (~33/32)"],
    "39": [" ", " = ~5C (~80/81),", "  ", " = ~11M (~33/32)"],
    "40": ["a bad-fifth limma-fraction notation"],
    "41": [" ", " = ~5C (~80/81),", "  ", " = ~11M (~33/32)"],
    "42": ["a bad-fifth apotome-fraction notation"],
    "43": [" ", " = ~7C (~63/64)"],
    "44": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "45": [" ", " = ~35M (~35/36) ≈ ~13M down (~1024/1053)"],
    "46": [" ", " = ~5C (~80/81),", "  ", " = ~11M (~33/32)"],
    "47": ["a bad-fifth limma-fraction notation"],
    "48": ["  ", " = ~23C (~736/729),", "  ", " = ~11M (~33/32)"],
    "49": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "50": [" ", " ≈ ~13M (~1053/1024)"],
    "51": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "52": [" ", " = ~35M (~35/36)"],
    "53": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~25S (~6400/6561) ≈ ~13/5S (~39/40)",
    ],
    "54": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "55": [" ", " = ~11/7k (~891/896),", "  ", " = ~11M (~33/32)"],
    "56": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "57": [" ", " ≈ ~13M (~1053/1024)"],
    "58": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~55C (~55/54),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "59": [
        "  ",
        " = (~3A)/9 ((~2187/2048)/9),",
        "  ",
        " = ~143C (~143/144),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " ≈ ~13M (~1053/1024)",
    ],
    "60": ["  ", " = ~11/7C (~45056/45927),", "  ", " = ~23/5S (~46/45)"],
    "61": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "62": [" ", " ≈ ~13M (~1053/1024),", "  ", " = ~11M (~33/32)"],
    "63": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "64": [" ", " ≈ ~13M (~1053/1024)"],
    "65": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~7C (~63/64),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "66": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~143C (~143/144),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " ≈ ~13M (~1053/1024)",
    ],
    "67": [
        " ",
        " = ~11/7k (~891/896),",
        "  ",
        " = ~35M (~35/36) ≈ ~13M down (~1024/1053)",
    ],
    "68": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "69": [" ", " ≈ ~13M (~1053/1024),", "  ", " = ~11M (~33/32)"],
    "70": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~55C (~55/54),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "71": [
        " ",
        " = ~55C (~55/54),",
        "  ",
        " = ~143C (~143/144),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "72": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~7C (~63/64),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "73": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11/5S (~44/45),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "74": [
        " ",
        " ≈ ~13/7S (~1664/1701),",
        "  ",
        " = ~35M (~35/36) ≈ ~13M down (~1024/1053)",
    ],
    "75": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "  ",
        " ≈ ~13L (~26/27)",
    ],
    "76": [" ", " ≈ ~13M (~1053/1024),", "  ", " ≈ ~25⋅11/7M (~550/567)"],
    "77": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~7C (~63/64),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "23b": ["a bad-fifth apotome-fraction notation"],
    "30b": ["a bad-fifth limma-fraction notation"],
    "35b": ["a bad-fifth apotome-fraction notation"],
    "42b": ["a bad-fifth limma-fraction notation"],
    "47b": ["a bad-fifth apotome-fraction notation"],
    "59b": [" ", " = ~35M (~35/36)"],
    "64b": ["a bad-fifth apotome-fraction notation"],
    "71b": [" ", " ≈ ~13M (~1053/1024)"],
} as Record<EdoNotationName, Io[]>

const EXPECTED_EVO_SZ_MEANINGS_TEXTS: Record<EdoNotationName, Io[]> = {
    "5": [],
    "6": ["a subset of 12-EDO"],
    "7": [],
    "8": ["a subset of 24-EDO"],
    "9": ["a bad-fifth limma-fraction notation"],
    "10": ["a bad-fifth apotome-fraction notation"],
    "11": ["a subset of 22-EDO"],
    "12": [],
    "13": ["a subset of 26-EDO"],
    "14": ["a bad-fifth limma-fraction notation"],
    "15": ["a bad-fifth apotome-fraction notation"],
    "16": ["a bad-fifth limma-fraction notation"],
    "17": ["  ", " = ~11M (~33/32)"],
    "18": ["a subset of 36-EDO"],
    "19": [],
    "20": ["a bad-fifth apotome-fraction notation"],
    "21": ["a bad-fifth limma-fraction notation"],
    "22": [" ", " = ~5C (~80/81)"],
    "23": ["a bad-fifth limma-fraction notation"],
    "24": ["  ", " = ~11M (~33/32)"],
    "25": ["a bad-fifth apotome-fraction notation"],
    "26": [],
    "27": [
        " ",
        " = ~5C (~80/81),",
        "    ",
        " = ~35L (~8505/8192) ≈ ~13L up (~27/26)",
    ],
    "28": ["a bad-fifth limma-fraction notation"],
    "29": [" ", " = ~5C (~80/81)"],
    "30": ["a bad-fifth apotome-fraction notation"],
    "31": ["  ", " = ~11M (~33/32)"],
    "32": ["a bad-fifth apotome-fraction notation"],
    "33": ["a bad-fifth limma-fraction notation"],
    "34": [" ", " = ~5C (~80/81),", "    ", " = ~11M (~33/32)"],
    "35": ["a bad-fifth limma-fraction notation"],
    "36": [" ", " = ~7C (~63/64)"],
    "37": ["a bad-fifth apotome-fraction notation"],
    "38": ["  ", " = ~11M (~33/32)"],
    "39": [" ", " = ~5C (~80/81),", "  ", " = ~11M (~33/32)"],
    "40": ["a bad-fifth limma-fraction notation"],
    "41": [" ", " = ~5C (~80/81),", "    ", " = ~11M (~33/32)"],
    "42": ["a bad-fifth apotome-fraction notation"],
    "43": [" ", " = ~7C (~63/64)"],
    "44": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "45": [" ", " = ~35M (~35/36) ≈ ~13M down (~1024/1053)"],
    "46": [" ", " = ~5C (~80/81),", "  ", " = ~11M (~33/32)"],
    "47": ["a bad-fifth limma-fraction notation"],
    "48": ["  ", " = ~23C (~736/729),", "    ", " = ~11M (~33/32)"],
    "49": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "50": [" ", " ≈ ~13M (~1053/1024)"],
    "51": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "52": [" ", " = ~35M (~35/36)"],
    "53": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~25S (~6400/6561) ≈ ~13/5S (~39/40)",
    ],
    "54": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "55": [" ", " = ~11/7k (~891/896),", "    ", " = ~11M (~33/32)"],
    "56": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "57": [" ", " ≈ ~13M (~1053/1024)"],
    "58": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~55C (~55/54),",
        "    ",
        " = ~11M (~33/32)",
    ],
    "59": [
        "  ",
        " = (~3A)/9 ((~2187/2048)/9),",
        "  ",
        " = ~143C (~143/144),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " ≈ ~13M (~1053/1024)",
    ],
    "60": ["  ", " = ~11/7C (~45056/45927),", "  ", " = ~23/5S (~46/45)"],
    "61": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "62": [" ", " ≈ ~13M (~1053/1024),", "    ", " = ~11M (~33/32)"],
    "63": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "64": [" ", " ≈ ~13M (~1053/1024)"],
    "65": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~7C (~63/64),",
        "    ",
        " = ~11M (~33/32)",
    ],
    "66": [
        "  ",
        " = ~19s (~513/512),",
        "  ",
        " = ~143C (~143/144),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " ≈ ~13M (~1053/1024)",
    ],
    "67": [
        " ",
        " = ~11/7k (~891/896),",
        "  ",
        " = ~35M (~35/36) ≈ ~13M down (~1024/1053)",
    ],
    "68": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "69": [" ", " ≈ ~13M (~1053/1024),", "    ", " = ~11M (~33/32)"],
    "70": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~55C (~55/54),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "71": [
        " ",
        " = ~55C (~55/54),",
        "  ",
        " = ~143C (~143/144),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "72": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~7C (~63/64),",
        "    ",
        " = ~11M (~33/32)",
    ],
    "73": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11/5S (~44/45),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "74": [
        " ",
        " ≈ ~13/7S (~1664/1701),",
        "  ",
        " = ~35M (~35/36) ≈ ~13M down (~1024/1053)",
    ],
    "75": [
        " ",
        " = ~7C (~63/64),",
        "  ",
        " = ~5C (~80/81),",
        "  ",
        " = ~11M (~33/32),",
        "   ",
        " ≈ ~13L (~26/27)",
    ],
    "76": [" ", " ≈ ~13M (~1053/1024),", "   ", " ≈ ~25⋅11/7M (~550/567)"],
    "77": [
        " ",
        " = ~5C (~80/81),",
        "  ",
        " = ~7C (~63/64),",
        "  ",
        " = ~11M (~33/32)",
    ],
    "23b": ["a bad-fifth apotome-fraction notation"],
    "30b": ["a bad-fifth limma-fraction notation"],
    "35b": ["a bad-fifth apotome-fraction notation"],
    "42b": ["a bad-fifth limma-fraction notation"],
    "47b": ["a bad-fifth apotome-fraction notation"],
    "59b": [" ", " = ~35M (~35/36)"],
    "64b": ["a bad-fifth apotome-fraction notation"],
    "71b": [" ", " ≈ ~13M (~1053/1024)"],
} as Record<EdoNotationName, Io[]>

const BRAVURA_TEXT_INDEX: Index<Font> = 0 as Index<Font>

const makeReadable = (
    texts: Io[],
    { fontIndices }: { fontIndices: Index<Font>[] },
): Io =>
    texts
        .map((actualText: Io, index: number) =>
            fontIndices[index] === BRAVURA_TEXT_INDEX
                ? actualText
                      .split("")
                      .map((actualChar: Io) =>
                          debugCode(actualChar as Unicode & Word),
                      )
                : [actualText],
        )
        .flat()
        .join("")
        .replace(/,/g, ", ")

describe("computeMeaningsPathifiableTexts", (): void => {
    it("provides the correct text for each EDO for general, (alternative) Evo, and Revo diagrams", () => {
        const EDO_NOTATION_DEFINITIONS_KEYS: EdoNotationName[] = Object.keys(
            EDO_NOTATION_DEFINITIONS,
        ) as EdoNotationName[]

        EDO_NOTATION_DEFINITIONS_KEYS.forEach(
            (edoNotationName: EdoNotationName) => {
                if (
                    parseEdoNotationName(edoNotationName).edo >
                    MAX_PERIODIC_TABLE_EDO
                )
                    return

                const actualPathifiableTexts: PathifiableTexts =
                    computeMeaningsPathifiableTexts({
                        edoNotationName,
                        diagramType: DiagramType.REVO,
                    })
                const actualTexts: Io[] = actualPathifiableTexts.texts

                const expectedTexts: Io[] =
                    EXPECTED_MEANINGS_TEXTS[edoNotationName]

                const readableActualTexts: Io = makeReadable(actualTexts, {
                    fontIndices: actualPathifiableTexts.fontIndices,
                })

                const readableExpectedTexts: Io = makeReadable(expectedTexts, {
                    fontIndices: actualPathifiableTexts.fontIndices,
                })

                expect(actualTexts)
                    .withContext(
                        `For ${edoNotationName}, expected ${readableActualTexts} to be ${readableExpectedTexts}`,
                    )
                    .toEqual(expectedTexts)
            },
        )
    })

    it("provides the correct text for each EDO for Evo-SZ diagrams", () => {
        const EDO_NOTATION_DEFINITIONS_KEYS: EdoNotationName[] = Object.keys(
            EDO_NOTATION_DEFINITIONS,
        ) as EdoNotationName[]

        EDO_NOTATION_DEFINITIONS_KEYS.forEach(
            (edoNotationName: EdoNotationName) => {
                if (
                    parseEdoNotationName(edoNotationName).edo >
                    MAX_PERIODIC_TABLE_EDO
                )
                    return

                const actualPathifiableTexts: PathifiableTexts =
                    computeMeaningsPathifiableTexts({
                        edoNotationName,
                        diagramType: DiagramType.EVO_SZ,
                    })
                const actualTexts: Io[] = actualPathifiableTexts.texts

                const expectedTexts: Io[] =
                    EXPECTED_EVO_SZ_MEANINGS_TEXTS[edoNotationName]

                const readableActualTexts: Io = makeReadable(actualTexts, {
                    fontIndices: actualPathifiableTexts.fontIndices,
                })

                const readableExpectedTexts: Io = makeReadable(expectedTexts, {
                    fontIndices: actualPathifiableTexts.fontIndices,
                })

                expect(actualTexts)
                    .withContext(
                        `For ${edoNotationName}, expected ${readableActualTexts} to be ${readableExpectedTexts}`,
                    )
                    .toEqual(expectedTexts)
            },
        )
    })
})
