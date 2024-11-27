import { Flavor } from "@sagittal/system"
import { DiagramType } from "./types"

const computeFlavorFromDiagramType = (diagramType: DiagramType): Flavor =>
    diagramType === DiagramType.REVO ? Flavor.REVO : DiagramType.EVO_SZ ? Flavor.EVO_SZ : Flavor.EVO

export { computeFlavorFromDiagramType }
