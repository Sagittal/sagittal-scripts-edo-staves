import { Index, Io, Px } from "@sagittal/general"
import { Font } from "../types"

interface PathifiableTexts {
    texts: Io[]
    fonts: Font[]
    fontIndices: Index<Font>[]
    additionalYOffsets: Px[]
}

export { PathifiableTexts }
