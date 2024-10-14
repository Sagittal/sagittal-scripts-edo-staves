import { Px } from "@sagittal/general"
import {
    EXTRA_ROOM_FOR_FIFTH_SIZE,
    LEFT_AND_RIGHT_MARGIN,
    TILE_TOP_MARGIN,
} from "../constants"
import { setTransform } from "../transform"
import { NodeElement } from "../types"

const placeTile = ({
    tileWrapperGroupElement,
    diagramWidth,
    tileSize,
}: {
    tileWrapperGroupElement: NodeElement<SVGGElement>
    diagramWidth: Px
    tileSize: Px
}): void =>
    setTransform(tileWrapperGroupElement, {
        xTranslation: (diagramWidth -
            LEFT_AND_RIGHT_MARGIN -
            tileSize -
            EXTRA_ROOM_FOR_FIFTH_SIZE) as Px,
        yTranslation: TILE_TOP_MARGIN,
    })

export { placeTile }
