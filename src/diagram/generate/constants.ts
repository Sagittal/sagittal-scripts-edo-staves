import { Index, Io } from "@sagittal/general"
import { Flavor } from "@sagittal/system"

const FORMATTED_FLAVOR_NAMES: Record<Flavor, Io> = {
    [Flavor.EVO]: "Evo",
    [Flavor.EVO_SZ]: "Evo-SZ",
    [Flavor.REVO]: "Revo",
}

const EVO_FLAVOR_INDEX: Index<Flavor> = 0 as Index<Flavor>
const EVO_SZ_FLAVOR_INDEX: Index<Flavor> = 1 as Index<Flavor>
const REVO_FLAVOR_INDEX: Index<Flavor> = 2 as Index<Flavor>

const GENERAL_FLAVOR_INDEX: Index<Flavor> = REVO_FLAVOR_INDEX

export {
    FORMATTED_FLAVOR_NAMES,
    EVO_FLAVOR_INDEX,
    REVO_FLAVOR_INDEX,
    EVO_SZ_FLAVOR_INDEX,
    GENERAL_FLAVOR_INDEX,
}
