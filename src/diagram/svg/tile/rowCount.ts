import { Count, Max } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
    Sagittal,
} from "@sagittal/system"
import { TILE_ROW_FOR_EDO } from "./constants"

const DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET: Count =
    2 as Count
const MAX_SAGITTALS_PER_ROW_FOR_DEFAULT_ROW_COUNT: Max<Count<Sagittal>> =
    6 as Max<Count<Sagittal>>

const computeTileRowCountScaleFactor = (tileRowCount: Count): number =>
    tileRowCount /
    DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET

const computeMaxSagittalsForTileRowCount = (
    tileRowCount: Count,
): Max<Count<Sagittal>> => {
    if (tileRowCount === TILE_ROW_FOR_EDO) return 0 as Max<Count<Sagittal>>
    if (
        tileRowCount ===
        DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET
    )
        return MAX_SAGITTALS_PER_ROW_FOR_DEFAULT_ROW_COUNT

    const tileRowCountForSagittals: Count = (tileRowCount -
        TILE_ROW_FOR_EDO) as Count
    const sizeProportionForThisTileRowCountIncrement: number =
        (tileRowCount + 1) / tileRowCount

    const maxSagittalsPerTileRow: Max<Count<Sagittal>> =
        ((computeMaxSagittalsForTileRowCount((tileRowCount - 1) as Count) /
            (tileRowCountForSagittals - 1)) *
            sizeProportionForThisTileRowCountIncrement) as Max<Count<Sagittal>>

    return (maxSagittalsPerTileRow * tileRowCountForSagittals) as Max<
        Count<Sagittal>
    >
}

const computeTileRowCount = ({
    edoNotationName,
}: {
    edoNotationName: EdoNotationName
}): Count => {
    let tileRowCount: Count =
        DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]
    if (isSubsetNotation(edoNotationDefinition)) return tileRowCount

    const sagittalCount: Count<Sagittal> = edoNotationDefinition.sagitypes
        .length as Count<Sagittal>

    let maxSagittalsForTileRowCount: Max<Count<Sagittal>> =
        computeMaxSagittalsForTileRowCount(tileRowCount)
    while (sagittalCount > maxSagittalsForTileRowCount) {
        tileRowCount++
        maxSagittalsForTileRowCount =
            computeMaxSagittalsForTileRowCount(tileRowCount)
    }

    // 2 tile rows (1 sagittal row ) fits up to  6 =  6 * 1 sagittals
    // 3 tile rows (2 sagittal rows) fit  up to 16 =  8 * 2 sagittals
    // 4 tile rows (3 sagittal rows) fit  up to 30 = 10 * 3 sagittals
    // 5 tile rows (4 sagittal rows) fit  up to 48 = 12 * 4 sagittals
    // etc.

    return tileRowCount
}

export {
    computeTileRowCount,
    DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET,
    computeTileRowCountScaleFactor,
    computeMaxSagittalsForTileRowCount,
}
