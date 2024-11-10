import { deepEquals, Index, saveLog, scriptSettings, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import {
    computeSymbolClassIdAndSectionFromSagittal,
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
    JI_NOTATION,
    parseSagitype,
    Sagittal,
    Sagitype,
    SECTION_P1T,
    SymbolClassId,
    StepDefinition,
} from "@sagittal/system"

scriptSettings.disableColors = true

const edoNotationDefinitionsEntries: [EdoNotationName, EdoNotationDefinition][] = Object.entries(
    EDO_NOTATION_DEFINITIONS,
) as [EdoNotationName, EdoNotationDefinition][]

edoNotationDefinitionsEntries.forEach(
    ([edoNotationName, edoNotationDefinition]: [EdoNotationName, EdoNotationDefinition]): void => {
        if (isSubsetNotation(edoNotationDefinition)) return
        if (edoNotationName === "581") return // this crap code can't handle accents
        const { stepDefinitions } = edoNotationDefinition
        const sagitypes = stepDefinitions.map(({ sagitype }: StepDefinition): Sagitype => sagitype)

        const sagittalIndices: Index<Sagittal>[] = sagitypes.map((sagitype: Sagitype): Index<Sagittal> => {
            const sagittal: Sagittal = parseSagitype(sagitype)
            const [symbolClassId, section] = computeSymbolClassIdAndSectionFromSagittal(sagittal)
            const symbolClassIdIndex = JI_NOTATION.symbolClassIds.indexOf(
                symbolClassId,
            ) as Index<SymbolClassId>
            if (deepEquals(section, SECTION_P1T)) {
                return (JI_NOTATION.symbolClassIds.length * 2 -
                    symbolClassIdIndex -
                    ZERO_ONE_INDEX_DIFF) as Index<Sagittal>
            } else {
                return symbolClassIdIndex as Index as Index<Sagittal>
            }
        })

        const sortedSagittalIndices: Index<Sagittal>[] = sagittalIndices
            .slice()
            .sort((a: Index<Sagittal>, b: Index<Sagittal>): number => a - b)

        if (!deepEquals(sagittalIndices, sortedSagittalIndices)) {
            saveLog(`EDO ${edoNotationName} has unsorted sagittal indices: ${sagittalIndices.toString()}`)
        }
    },
)
