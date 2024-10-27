import { Edo } from "@sagittal/general"
import { Sagittal } from "@sagittal/system"

type TileRow<T extends Sagittal | Edo = Sagittal | Edo> = { _TileRowBrand: boolean } & { _OfBrand: T }

export { TileRow }
