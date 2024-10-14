import { Count, Max } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
    Sagittal,
    computeSagitypes,
} from "@sagittal/system"
import { DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET } from "./constants"
import { computeMaxSagittalsForTileRowCount } from "./sagittals"
import { TileRow } from "./types"
import { Scaler } from "../types"

const computeTileRowCountScaler = (tileRowCount: Count<TileRow>): Scaler =>
    (tileRowCount /
        DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET) as Scaler

const computeTileRowCount = ({
    edoNotationName,
}: {
    edoNotationName: EdoNotationName
}): Count<TileRow> => {
    let tileRowCount: Count<TileRow> =
        DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET
    const edoNotationDefinition: EdoNotationDefinition =
        EDO_NOTATION_DEFINITIONS[edoNotationName]
    if (isSubsetNotation(edoNotationDefinition)) return tileRowCount

    const sagittalCount: Count<Sagittal> = computeSagitypes(
        edoNotationDefinition,
    ).length as Count<Sagittal>

    let maxSagittalsForTileRowCount: Max<Count<Sagittal>> =
        computeMaxSagittalsForTileRowCount(tileRowCount)
    while (sagittalCount > maxSagittalsForTileRowCount) {
        tileRowCount++
        maxSagittalsForTileRowCount =
            computeMaxSagittalsForTileRowCount(tileRowCount)
    }

    return tileRowCount
}

export { computeTileRowCount, computeTileRowCountScaler }
