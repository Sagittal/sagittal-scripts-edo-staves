const extractKeyInfoFromInputSentence = (inputSentence: string): string => {
    return inputSentence
        .replace(/20;/g, "")
        .replace(/9;/g, "")
        .replace(/8;/g, "")
        .replace(/5;/g, "")
        .replace(/3;/g, "")
        .replace(/ston/g, "")
        .replace(/Gcl/g, "")
        .replace(/en;/g, "")
        .replace(/blfn/g, "")
        .replace(/bl/g, "")
        .replace(/nl;/g, "")
        .replace(/\n/g, "")
        .replace(/ /g, "")
        .replace(/;/g, "")
}

export {
    extractKeyInfoFromInputSentence
}
