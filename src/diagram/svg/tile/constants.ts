import { Count } from "@sagittal/general"
import { TileRow } from "./types"
import { Edo } from "@sagittal/system"

const TILE_ROW_FOR_EDO: Count<TileRow<Edo>> = 1 as Count<TileRow<Edo>>

const DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET: Count<TileRow> =
    2 as Count<TileRow>

export {
    TILE_ROW_FOR_EDO,
    DEFAULT_TILE_ROW_COUNT_WITH_ONE_TILE_ROW_FOR_EDO_AND_ONE_FOR_SAGITTALS_OR_SUBSET,
}
