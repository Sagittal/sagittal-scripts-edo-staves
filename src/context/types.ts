import { Io, Sentence } from "@sagittal/general"
import { DiagramType } from "../types"

interface Subsection {
    diagramType: DiagramType
    notation: Io & Sentence
    isSecondBestNotation?: boolean
}

export { Subsection }
