import { Count, Io, Px, Sentence, Word } from "@sagittal/general"
import { Sagittal, Sagitype } from "@sagittal/system"
import { splitAccents } from "../../../../accents"
import { Code } from "staff-code"

const COMPRESS_SPACING_BEYOND_THIS_SAGITTAL_COUNT: Count<Sagittal> =
    3 as Count<Sagittal>

const computeSagitypeSentence = (sagitypes: Sagitype[]): Io & Sentence => {
    const sagittalWordsList: (Code & Word)[][] = sagitypes.map(splitAccents)
    const sagittalPhrases = sagittalWordsList.map(
        (sagittalWords: (Code & Word)[]): string => {
            return sagittalWords.join("; ") + ";"
        },
    )
    const spacing: Px =
        sagittalPhrases.length > COMPRESS_SPACING_BEYOND_THIS_SAGITTAL_COUNT
            ? (1 as Px)
            : (2 as Px)

    return (sagittalPhrases.join(` ${spacing}; `) + ";") as Io & Sentence
}

export { computeSagitypeSentence }
