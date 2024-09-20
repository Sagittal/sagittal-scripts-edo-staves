import { Edo, EDO_NOTATION_DEFINITIONS, EdoNotationDefinition, SECOND_BEST_FIFTH_EDO_NOTATION_DEFINITION_INDEX } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor } from "../sentence"
import { Io, isUndefined, program, Sentence } from "@sagittal/general"
import {
    extractKeyInfoFromInputSentence,
    EVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateGeneralDiagram,
    generateRevoDiagram,
    generateAlternativeEvoDiagram,
    REVO_FLAVOR_INDEX,
    computeRevoCouldBeEvo,
} from "../diagram"

program.option("-d, --dry-run")

program.parse()
const { dryRun: dryRunString }: { dryRun: string } = program.opts()
const dryRun: boolean = !isUndefined(dryRunString)

let useSecondBestFifth: boolean

Object.keys(EDO_NOTATION_DEFINITIONS)
    .map((edoString: string): Edo => parseInt(edoString) as Edo)
    .forEach((edo: Edo): void => {
        // TODO: make sure it does works up to 581-EDO, using Dave's further size categories
        // maybe past a certain point it just goes into non-aligned 18 size rows 
        if (edo > 72) return

        EDO_NOTATION_DEFINITIONS[edo].forEach((_edoNotationDefinition: EdoNotationDefinition, edoNotationDefinitionIndex: number): void => { 
            useSecondBestFifth = edoNotationDefinitionIndex === SECOND_BEST_FIFTH_EDO_NOTATION_DEFINITION_INDEX

            const defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor: (Io &
                Sentence)[] =
                computeDefaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor(
                    edo,
                    useSecondBestFifth,
                )

            const revoCouldBeEvo: boolean = computeRevoCouldBeEvo(edo, useSecondBestFifth)

            const keyInfos: Sentence[] =
                defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor.map(
                    extractKeyInfoFromInputSentence,
                )

            if (keyInfos[EVO_FLAVOR_INDEX] === keyInfos[EVO_SZ_FLAVOR_INDEX]) {
                if (
                    keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]
                ) {
                    // CASE 2: all three identical, generate one big shared diagram
                    generateGeneralDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                } else {
                    if (revoCouldBeEvo) {
                        // CASE 3.A:
                        generateGeneralDiagram(
                            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                            edo,
                            { dryRun, useSecondBestFifth },
                        )
                        generateAlternativeEvoDiagram(
                            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                            edo,
                            { dryRun, useSecondBestFifth },
                        )
                    } else {
                        // CASE 3: evo and evo_sz identical, revo different
                        generateEvoDiagram(
                            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                            edo,
                            { dryRun, useSecondBestFifth },
                        )
                        generateRevoDiagram(
                            defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                            edo,
                            { dryRun, useSecondBestFifth },
                        )
                    }
                }
            } else if (
                keyInfos[EVO_FLAVOR_INDEX] === keyInfos[REVO_FLAVOR_INDEX]
            ) {
                // CASE 4: evo and revo identical, evo-sz different
                generateGeneralDiagram(
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                    edo,
                    { dryRun, useSecondBestFifth },
                )
                generateEvoSZDiagram(
                    defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                    edo,
                    { dryRun, useSecondBestFifth },
                )
            } else {
                if (revoCouldBeEvo) {
                    // CASE 1.A:
                    generateGeneralDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                    generateAlternativeEvoDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                    generateEvoSZDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                } else {
                    // CASE 1: none identical; three separate diagrams
                    generateEvoDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                    generateEvoSZDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                    generateRevoDiagram(
                        defaultSingleSpellingPerStepNotationsAsStaffCodeInputSentencesForEachFlavor,
                        edo,
                        { dryRun, useSecondBestFifth },
                    )
                }
            }
        })
    })
