import { Io, Sentence } from "@sagittal/general"

const extractKeyInfoFromInputSentence = (inputSentence: Io & Sentence): Sentence =>
    inputSentence
        .replace(/\d+;/g, "")
        .replace(/ston/g, "")
        .replace(/trcl;/g, "")
        .replace(/en;/g, "")
        .replace(/blfn/g, "")
        .replace(/bl/g, "")
        .replace(/nl;/g, "")
        .replace(/\n/g, "")
        .replace(/ /g, "")
        .replace(/(\w\d)/g, "\n$1")
        .replace(/;/g, "") as Sentence

export {
    extractKeyInfoFromInputSentence,
}
