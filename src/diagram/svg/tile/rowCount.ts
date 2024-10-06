import { Count, Max } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoName,
    EdoNotationDefinition,
    isSubsetNotation,
    Sagittal,
} from "@sagittal/system"

const BASIC_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET: Count =
    2 as Count
const TILE_ROW_FOR_EDO: Count = 1 as Count

const computeTileRowCount = ({ edoName }: { edoName: EdoName }): Count => {
    let tileRowCount: Count =
        BASIC_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoName]
    if (isSubsetNotation(edoNotationDefinition)) return 2 as Count

    const sagittalCount: Count<Sagittal> = edoNotationDefinition.sagitypes
        .length as Count<Sagittal>

    let maxSagittalsForTileRowCount: Max<Count<Sagittal>> = 6 as Max<
        Count<Sagittal>
    >
    while (sagittalCount > maxSagittalsForTileRowCount) {
        tileRowCount++
        const tileRowCountForSagittals: Count = (tileRowCount -
            TILE_ROW_FOR_EDO) as Count
        const sizeProportionForThisTileRowCountIncrement: number =
            (tileRowCount + 1) / tileRowCount
        const maxSagittalsPerTileRow: Max<Count<Sagittal>> =
            (maxSagittalsForTileRowCount *
                sizeProportionForThisTileRowCountIncrement) as Max<
                Count<Sagittal>
            >
        maxSagittalsForTileRowCount = (maxSagittalsPerTileRow *
            tileRowCountForSagittals) as Max<Count<Sagittal>>
    }

    // 2 tile rows (1 sagittal row )  fits up to  6 =  6 * 1 sagittals
    // 3 tile rows (2 sagittal rows) fit  up to 16 =  8 * 2 sagittals
    // 4 tile rows (3 sagittal rows) fit  up to 30 = 10 * 3 sagittals
    // 5 tile rows (4 sagittal rows) fit  up to 48 = 12 * 4 sagittals

    return tileRowCount
}

export { computeTileRowCount }
