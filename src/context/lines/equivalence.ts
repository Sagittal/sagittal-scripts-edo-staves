import { Io, Maybe, Sentence } from "@sagittal/general"
import { extractKeyInfoFromInputSentence } from "../../diagram"
import { DiagramType } from "../../types"

const DIAGRAM_TO_NOTATION_TYPE: Record<DiagramType, Maybe<Io>> = {
    [DiagramType.GENERAL]: "Sagittal",
    [DiagramType.EVO]: "Evo Sagittal",
    [DiagramType.REVO]: "Revo Sagittal",
    [DiagramType.ALTERNATE_EVO]: "Evo Sagittal",
    [DiagramType.EVO_SZ]: "Evo-SZ Sagittal",
}

const computeEquivalentNotationsLine = ({
    notation,
    diagramType,
}: {
    notation: Io & Sentence
    diagramType: DiagramType
}): Maybe<Io> => {
    const keyInfo: Sentence = extractKeyInfoFromInputSentence(notation)

    const anythingBesidesConventionalNotation: Sentence = keyInfo
        .replace(/[a-g]4/g, "")
        .replace(/c5/g, "")
        .replace(/b/g, "") // gets "bb" as well
        .replace(/#/g, "")
        .replace(/X/g, "")
        .replace(/nt/g, "")
        .replace(/\n/g, "") as Sentence

    if (anythingBesidesConventionalNotation.length === 0)
        return `Because it includes no Sagittal symbols, this ${DIAGRAM_TO_NOTATION_TYPE[diagramType]} notation is also a conventional notation.`

    const anythingBesidesConventionalAndSzNotation: Sentence =
        anythingBesidesConventionalNotation
            .replace(/d/g, "")
            .replace(/t/g, "") as Sentence

    if (anythingBesidesConventionalAndSzNotation.length === 0)
        return `Because it contains no Sagittal symbols, this ${DIAGRAM_TO_NOTATION_TYPE[diagramType]} notation is also a Stein-Zimmerman notation.`

    return undefined
}

export { computeEquivalentNotationsLine }
