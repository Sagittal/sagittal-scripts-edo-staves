import { deepEquals, Index, ZERO_ONE_INDEX_DIFF } from "@sagittal/general"
import {
    computeSymbolClassIdAndSectionFromSagittal,
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoNotationDefinition,
    isSubsetNotation,
    JI_NOTATION,
    parseSagitype,
    Sagittal,
    Sagitype,
    SECTION_P1T,
    SymbolClassId,
} from "@sagittal/system"

const edoNotationDefinitionsEntries: [EdoName, EdoNotationDefinition][] =
    Object.entries(EDO_NOTATION_DEFINITIONS) as [
        EdoName,
        EdoNotationDefinition,
    ][]

edoNotationDefinitionsEntries.forEach(
    ([edoName, edoNotationDefinition]: [
        EdoName,
        EdoNotationDefinition,
    ]): void => {
        if (isSubsetNotation(edoNotationDefinition)) return
        if (edoName === "581") return // this crap code can't handle accents
        const { sagitypes }: { sagitypes: Sagitype[] } = edoNotationDefinition

        const sagittalIndices: Index<Sagittal>[] = sagitypes.map(
            (sagitype: Sagitype): Index<Sagittal> => {
                const sagittal: Sagittal = parseSagitype(sagitype)
                const [symbolClassId, section] =
                    computeSymbolClassIdAndSectionFromSagittal(sagittal)
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
            },
        )

        const sortedSagittalIndices: Index<Sagittal>[] = sagittalIndices
            .slice()
            .sort((a, b) => a - b)

        if (!deepEquals(sagittalIndices, sortedSagittalIndices)) {
            console.log(
                `EDO ${edoName} has unsorted sagittal indices: ${sagittalIndices}`,
            )
        }
    },
)
