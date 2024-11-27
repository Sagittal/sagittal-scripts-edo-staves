import { deepClone, Multiplier } from "@sagittal/general"
import { BRAVURA_TEXT_FONT } from "../../../../constants"
import { Font } from "../../../../types"

const TILE_SAGITTALS_FONT: Font = deepClone(BRAVURA_TEXT_FONT)

const NEUTRAL_MULTIPLIER: Multiplier = 1 as Multiplier

export { TILE_SAGITTALS_FONT, NEUTRAL_MULTIPLIER }
