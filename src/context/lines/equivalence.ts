import { Io, Maybe, Sentence } from "@sagittal/general"
import { extractKeyInfoFromInputSentence } from "../../diagram"

const computeEquivalentNotationsLine = ({
    notation,
}: {
    notation: Io & Sentence
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
        return `Because it includes no Sagittal symbols, this notation could also be considered to be a conventional notation.`

    const anythingBesidesConventionalAndSzNotation: Sentence =
        anythingBesidesConventionalNotation
            .replace(/d/g, "")
            .replace(/t/g, "") as Sentence

    if (anythingBesidesConventionalAndSzNotation.length === 0)
        return `Because it contains no Sagittal symbols, this notation could also be considered to be a Stein-Zimmerman notation.`

    return undefined
}

export { computeEquivalentNotationsLine }
