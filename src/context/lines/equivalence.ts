import { Io, Maybe, Sentence } from "@sagittal/general"
import { extractKeyInfoFromInputSentence } from "../../diagram"
import { Flavor } from "@sagittal/system"
import { DiagramType } from "../../types"

const THINGS: Record<DiagramType, Maybe<Io>> = {
    [DiagramType.GENERAL]: "",
    [DiagramType.EVO]: "Evo ",
    [DiagramType.REVO]: "Revo ",
    [DiagramType.ALTERNATE_EVO]: "Evo ",
    [DiagramType.EVO_SZ]: "Evo-SZ ",
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
        return `Because it includes no Sagittal symbols, this ${THINGS[diagramType]}notation is also a conventional notation.`

    const anythingBesidesConventionalAndSzNotation: Sentence =
        anythingBesidesConventionalNotation
            .replace(/d/g, "")
            .replace(/t/g, "") as Sentence

    if (anythingBesidesConventionalAndSzNotation.length === 0)
        return `Because it contains no Sagittal symbols, this ${THINGS[diagramType]}notation is also a Stein-Zimmerman notation.`

    return undefined
}

export { computeEquivalentNotationsLine }
