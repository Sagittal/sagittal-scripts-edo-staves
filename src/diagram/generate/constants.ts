import { Index } from "@sagittal/general"
import { Flavor } from "@sagittal/system"

const EVO_FLAVOR_INDEX: Index<Flavor> = 0 as Index<Flavor>
const EVO_SZ_FLAVOR_INDEX: Index<Flavor> = 1 as Index<Flavor>
const REVO_FLAVOR_INDEX: Index<Flavor> = 2 as Index<Flavor>

const FLAVOR_INDEX_FOR_GENERAL_DIAGRAM_TYPE: Index<Flavor> = REVO_FLAVOR_INDEX

export {
    EVO_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    FLAVOR_INDEX_FOR_GENERAL_DIAGRAM_TYPE,
}
