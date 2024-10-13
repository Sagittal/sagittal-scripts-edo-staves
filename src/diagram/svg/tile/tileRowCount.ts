import { Count, Max } from "@sagittal/general"
import {
    EDO_NOTATION_DEFINITIONS,
    EdoNotationName,
    EdoNotationDefinition,
    isSubsetNotation,
    Sagittal,
} from "@sagittal/system"
import { DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET } from "./constants"
import { computeMaxSagittalsForTileRowCount } from "./sagittals/maxSagittals"

const computeTileRowCountScaleFactor = (tileRowCount: Count): number =>
    tileRowCount /
    DEFAULT_TILE_ROW_COUNT_WITH_ONE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET

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

    return tileRowCount
}

export { computeTileRowCount, computeTileRowCountScaleFactor }
