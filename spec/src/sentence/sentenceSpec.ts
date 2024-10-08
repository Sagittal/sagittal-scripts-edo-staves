import { Edo, EdoNotationName, Flavor } from "@sagittal/system"
import { computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence } from "../../../src/sentence"
import { extractKeyInfoFromInputSentence } from "../../../src/diagram"
import { Io, Sentence } from "@sagittal/general"

const GENERAL_5_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 
    3; en; bl 10; 
    d4 4; nt; 4; 
    3; en; bl 10; 
    e4 4; nt; 4; 
    3; en; bl 10; 
    g4 4; nt; 4; 
    3; en; bl 10; 
    a4 4; nt; 4; 
    en; blfn
` as Io & Sentence

const EVO_11_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 11; 13; 4; 4; \\!; #; nt; 4; 14; 13; 4; 
    3; en; bl 10; 
    d4 4; nt; 4; 13; 13; 4; 
    e4 4; /|; b; nt; 4; 11; 13; 4; 
    3; en; bl 10; 4; nt; 4; 
    3; en; bl 10; 4; 13; 4; 
    f4 4; /|; nt; 4; 4; 13; 4; 4; #; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    f4  4; 13; 4; 
    g4 4; /|; nt; 4; 21; 13; 4; 4; #; nt; 4; 
    3; en; bl 10; 4; 13; 4; 
    b4 4; b; nt; 4; 20; 13; 4; 4; \\!; nt; 4; 
    3; en; bl 10; 4; 13; 4; 
    en; blfn
` as Io & Sentence

const EVO_12_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 4; #; nt; 4; 
    3; en; bl 10; 
    d4 4; nt; 4; 
    e4 4; b; nt; 4; 
    3; en; bl 10; 4; nt; 4; 
    3; en; bl 10; 
    f4 4; nt; 4; 4; #; nt; 4; 
    3; en; bl 10; 
    g4 4; nt; 4; 4; #; nt; 4; 
    3; en; bl 10; 
    a4 4; nt; 4; 
    b4 4; b; nt; 4; 
    3; en; bl 10; 4; nt; 4; 
    en; blfn
` as Io & Sentence

const GENERAL_15_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 4; /|; nt; 4; 
    d4 4; \\!; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 
    e4 4; \\!; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 
    g4 4; \\!; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 
    a4 4; \\!; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 
    c5 4; \\!; nt; 4; 
    en; blfn
` as Io & Sentence

const EVO_22_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 4; /|; nt; 4; 4; \\!; #; nt; 4; 4; #; nt; 4; 
    3; en; bl 10; 
    d4 4; nt; 4; 
    e4 4; b; nt; 4; 4; /|; b; nt; 4; 4; \\!; nt; 4; 
    3; en; bl 10; 4; nt; 4; 
    3; en; bl 10; 
    f4 4; nt; 4; 4; /|; nt; 4; 4; \\!; #; nt; 4; 4; #; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    f4  
    g4 4; nt; 4; 4; /|; nt; 4; 4; \\!; #; nt; 4; 4; #; nt; 4; 
    3; en; bl 10; 
    a4 4; nt; 4; 
    b4 4; b; nt; 4; 4; /|; b; nt; 4; 4; \\!; nt; 4; 
    3; en; bl 10; 4; nt; 4; 
    en; blfn
` as Io & Sentence

const GENERAL_47_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 4; |\\; nt; 4; 
    d4 4; !/; nt; 4; 4; !); nt; 4; 4; !(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    d4  4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 4; |\\; nt; 4; 
    e4 4; !/; nt; 4; 4; !); nt; 4; 4; !(; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 4; |\\; nt; 4; 
    f4 4; !); nt; 4; 4; !(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    f4  4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 4; |\\; nt; 4; 
    g4 4; !/; nt; 4; 4; !); nt; 4; 4; !(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    g4  4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 4; |\\; nt; 4; 
    a4 4; !/; nt; 4; 4; !); nt; 4; 4; !(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    a4  4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 4; |\\; nt; 4; 
    b4 4; !/; nt; 4; 4; !); nt; 4; 4; !(; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; |(; nt; 4; 4; |); nt; 4; 
    c5 4; !/; nt; 4; 4; !); nt; 4; 4; !(; nt; 4; 
    en; blfn
` as Io & Sentence

const EVO_52_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; 2; nt; 4; 4; /|); 2; nt; 4; 4; #; 2; nt; 4; 4; /|); #; 2; nt; 4; 6; X; 2; nt; 4; 
    d4 4; \\!); b; nt; 4; 4; b; nt; 4; 4; \\!); nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    d4  2; 4; nt; 4; 2; 4; /|); nt; 4; 2; 4; #; nt; 4; 2; 4; /|); #; nt; 4; 
    e4 2; 4; bb; nt; 4; 4; \\!); b; nt; 4; 4; b; nt; 4; 4; \\!); nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; /|); nt; 4; 4; #; nt; 4; 4; /|); #; nt; 4; 
    f4 4; b; nt; 4; 4; \\!); nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    f4  2; 4; nt; 4; 2; 4; /|); nt; 4; 2; 4; #; nt; 4; 2; 4; /|); #; nt; 4; 2; 6; X; nt; 4; 
    g4 4; \\!); b; nt; 4; 4; b; nt; 4; 4; \\!); nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    g4  2; 4; nt; 4; 2; 4; /|); nt; 4; 2; 4; #; nt; 4; 2; 4; /|); #; nt; 4; 2; 6; X; nt; 4; 
    a4 4; \\!); b; nt; 4; 4; b; nt; 4; 4; \\!); nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    a4  2; 4; nt; 4; 2; 4; /|); nt; 4; 2; 4; #; nt; 4; 2; 4; /|); #; nt; 4; 
    b4 2; 4; bb; nt; 4; 4; \\!); b; nt; 4; 4; b; nt; 4; 4; \\!); nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; /|); nt; 4; 4; #; nt; 4; 
    c5 5; \\!); b; nt; 4; 4; b; nt; 4; 4; \\!); nt; 4; 
    en; blfn
` as Io & Sentence

const EVO_67_EDO_EXPECTED: Io & Sentence = `
    ston 
    4; trcl; 12;
    c4 4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; \\!); #; nt; 4; 4; )!(; #; nt; 4; 4; #; nt; 4; 
    d4 4; b; nt; 4; 4; )|(; b; nt; 4; 4; /|); b; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    d4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; \\!); #; nt; 4; 4; )!(; #; nt; 4; 4; #; nt; 4; 
    e4 4; b; nt; 4; 4; )|(; b; nt; 4; 4; /|); b; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
    3; en; bl 10; 4; nt; 4; 4; )|(; nt; 4; 11; /|); nt; 4; 4; \\!); #; nt; 4; 4; )!(; #; nt; 4; 4; #; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    e4  
    f4 4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; \\!); #; nt; 4; 4; )!(; #; nt; 4; 4; #; nt; 4; 
    g4 4; b; nt; 4; 4; )|(; b; nt; 4; 4; /|); b; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    g4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; \\!); #; nt; 4; 4; )!(; #; nt; 4; 4; #; nt; 4; 
    a4 4; b; nt; 4; 4; )|(; b; nt; 4; 4; /|); b; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
    3; en; bl nl; 
    4; trcl; 12;
    a4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; \\!); #; nt; 4; 4; )!(; #; nt; 4; 4; #; nt; 4; 
    b4 4; b; nt; 4; 4; )|(; b; nt; 4; 4; /|); b; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
    3; en; bl 10; 4; nt; 4; 
    c5 4; b; nt; 4; 4; )|(; b; nt; 4; 5; /|); b; nt; 4; 12; \\!); nt; 4; 5; )!(; nt; 4; 
    en; blfn
` as Io & Sentence

describe("computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence computes the text as one would type into the StaffCode input box to produce a Sagittal EDO notation", (): void => {
    describe("Evo notations", (): void => {
        const flavor = Flavor.EVO

        it("works for 5-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "5" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_5_EDO_EXPECTED),
            )
        })

        it("works for 11-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "11" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_11_EDO_EXPECTED),
            )
        })

        it("works for 12-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "12" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_12_EDO_EXPECTED),
            )
        })

        it("works for 15-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "15" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_15_EDO_EXPECTED),
            )
        })

        it("works for 22-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "22" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_22_EDO_EXPECTED),
            )
        })

        it("works for 31-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "31" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; /|\\; nt; 4; 4; #; nt; 4; 
                d4 4; b; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 4; #; nt; 4; 
                e4 4; b; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 7; #; nt; 4; 
                3; en; bl 10; 
                f4 4; nt; 4; 4; /|\\; nt; 4; 4; #; nt; 4; 
                g4 4; b; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; /|\\; nt; 4; 4; #; nt; 4; 
                a4 4; b; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 4; #; nt; 4; 
                b4 4; b; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 
                c5 8; b; nt; 4; 4; \\!/; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 47-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "47" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_47_EDO_EXPECTED),
            )
        })

        it("works for 52-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "52" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_52_EDO_EXPECTED),
            )
        })

        it("works for 67-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "67" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_67_EDO_EXPECTED),
            )
        })

        it("works for 72-EDO Evo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "72" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; 2; nt; 4; 4; /|; 2; nt; 4; 4; |); 2; nt; 4; 4; /|\\; 2; nt; 4; 4; !); #; 2; nt; 4; 4; \\!; #; 2; nt; 4; 4; #; 2; nt; 4; 4; /|; #; 2; nt; 4; 4; |); #; 2; nt; 4; 
                d4 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                d4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; /|\\; nt; 4; 
                e4 2; 5; !); b; nt; 4; 2; 5; \\!; b; nt; 4; 2; 5; b; nt; 4; 2; 5; /|; b; nt; 4; 2; 5; |); b; nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 
                f4 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                f4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; /|\\; nt; 4; 2; 4; !); #; nt; 4; 2; 4; \\!; #; nt; 4; 2; 4; #; nt; 4; 2; 4; /|; #; nt; 4; 2; 4; |); #; nt; 4; 
                g4 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; /|\\; nt; 4; 2; 4; !); #; nt; 4; 2; 4; \\!; #; nt; 4; 2; 4; #; nt; 4; 2; 4; /|; #; nt; 4; 2; 4; |); #; nt; 4; 
                a4 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                a4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; /|\\; nt; 4; 
                b4 2; 5; !); b; nt; 4; 2; 5; \\!; b; nt; 4; 2; 5; b; nt; 4; 2; 5; /|; b; nt; 4; 2; 5; |); b; nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 
                c5 4; !); nt; 4; 4; \\!; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })
    })

    describe("Evo-SZ notations", (): void => {
        const flavor = Flavor.EVO_SZ

        it("works for 5-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "5" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_5_EDO_EXPECTED),
            )
        })

        it("works for 11-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "11" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_11_EDO_EXPECTED),
            )
        })

        it("works for 12-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "12" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_12_EDO_EXPECTED),
            )
        })

        it("works for 15-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "15" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_15_EDO_EXPECTED),
            )
        })

        it("works for 22-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "22" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_22_EDO_EXPECTED),
            )
        })

        it("works for 31-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "31" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; t; nt; 4; 4; #; nt; 4; 
                d4 4; b; nt; 4; 4; d; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; t; nt; 4; 4; #; nt; 4; 
                e4 4; b; nt; 4; 4; d; nt; 4; 
                3; en; bl 10; 4; nt; 4; 5; t; nt; 4; 4; #; nt; 4; 
                3; en; bl 10; 
                f4 4; nt; 4; 4; t; nt; 4; 4; #; nt; 4; 
                g4 4; b; nt; 4; 4; d; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; t; nt; 4; 4; #; nt; 4; 
                a4 4; b; nt; 4; 4; d; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; t; nt; 4; 4; #; nt; 4; 
                b4 4; b; nt; 4; 4; d; nt; 4; 
                3; en; bl 10; 4; nt; 4; 
                c5 4; b; nt; 4; 7; d; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 47-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "47" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_47_EDO_EXPECTED),
            )
        })

        it("works for 52-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "52" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_52_EDO_EXPECTED),
            )
        })

        it("works for 67-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "67" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(EVO_67_EDO_EXPECTED),
            )
        })

        it("works for 72-EDO Evo-SZ", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "72" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; 2; nt; 4; 4; /|; 2; nt; 4; 4; |); 2; nt; 4; 4; t; 2; nt; 4; 4; !); #; 2; nt; 4; 4; \\!; #; 2; nt; 4; 4; #; 2; nt; 4; 4; /|; #; 2; nt; 4; 4; |); #; 2; nt; 4; 
                d4 4; d; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                d4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; t; nt; 4; 
                e4 2; 5; !); b; nt; 4; 2; 5; \\!; b; nt; 4; 2; 5; b; nt; 4; 2; 5; /|; b; nt; 4; 2; 5; |); b; nt; 4; 4; d; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; t; nt; 4; 
                f4 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                f4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; t; nt; 4; 2; 4; !); #; nt; 4; 2; 4; \\!; #; nt; 4; 2; 4; #; nt; 4; 2; 4; /|; #; nt; 4; 2; 4; |); #; nt; 4; 
                g4 4; d; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; t; nt; 4; 2; 4; !); #; nt; 4; 2; 4; \\!; #; nt; 4; 2; 4; #; nt; 4; 2; 4; /|; #; nt; 4; 2; 4; |); #; nt; 4; 
                a4 4; d; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                a4  2; 4; nt; 4; 2; 4; /|; nt; 4; 2; 4; |); nt; 4; 2; 4; t; nt; 4; 
                b4 2; 5; !); b; nt; 4; 2; 5; \\!; b; nt; 4; 2; 5; b; nt; 4; 2; 5; /|; b; nt; 4; 2; 5; |); b; nt; 4; 4; d; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; t; nt; 4; 
                c5 4; !); nt; 4; 4; \\!; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })
    })

    describe("Revo notations", (): void => {
        const flavor = Flavor.REVO

        it("works for 5-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "5" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_5_EDO_EXPECTED),
            )
        })

        it("works for 11-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "11" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 11; 13; 4; 4; ||\\; nt; 4; 11; 13; 4; 
                3; en; bl 10; 
                d4 4; nt; 4; 11; 13; 4; 
                e4 4; !!/; nt; 4; 11; 13; 4; 
                3; en; bl 10; 4; nt; 4; 
                3; en; bl 10; 4; 13; 4; 
                f4 4; /|; nt; 4; 4; 13; 4; 
                g4 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; 13; 4; 4; /|; nt; 4; 15; 13; 4; 
                a4 4; \\!; nt; 4; 
                3; en; bl 10; 4; 13; 4; 4; /|; nt; 4; 15; 13; 4; 
                b4 4; \\!; nt; 4; 
                3; en; bl 10; 4; 13; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 12-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "12" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; /||\\; nt; 4; 
                3; en; bl 10; 
                d4 4; nt; 4; 
                e4 4; \\!!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 
                3; en; bl 10; 
                f4 4; nt; 4; 4; /||\\; nt; 4; 
                3; en; bl 10; 
                g4 4; nt; 4; 4; /||\\; nt; 4; 
                3; en; bl 10; 
                a4 4; nt; 4; 
                b4 4; \\!!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 15-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "15" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_15_EDO_EXPECTED),
            )
        })

        it("works for 22-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "22" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; /|; nt; 4; 4; ||\\; nt; 4; 
                d4 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 
                e4 4; !!/; nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 
                3; en; bl 10; 
                f4 4; nt; 4; 4; /|; nt; 4; 4; ||\\; nt; 4; 
                g4 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; /|; nt; 4; 4; ||\\; nt; 4; 
                a4 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 
                b4 4; !!/; nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 31-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "31" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; /|\\; nt; 4; 4; /||\\; nt; 4; 
                d4 4; \\!!/; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 4; /||\\; nt; 4; 
                e4 4; \\!!/; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 
                f4 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 4; /||\\; nt; 4; 
                g4 4; \\!!/; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; /|\\; nt; 4; 4; /||\\; nt; 4; 
                a4 4; \\!!/; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 4; /||\\; nt; 4; 
                b4 4; \\!!/; nt; 4; 4; \\!/; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|\\; nt; 4; 
                c5 4; \\!/; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 47-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "47" as EdoNotationName,
                    flavor,
                )

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(GENERAL_47_EDO_EXPECTED),
            )
        })

        it("works for 52-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "52" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 4; /|||); nt; 4; 4; /X\\; nt; 4; 
                d4 4; \\!!!); nt; 4; 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                d4  4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 4; /|||); nt; 4; 
                e4 4; \\Y/; nt; 4; 4; \\!!!); nt; 4; 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 4; /|||); nt; 4; 
                f4 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                f4  4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 4; /|||); nt; 4; 4; /X\\; nt; 4; 
                g4 4; \\!!!); nt; 4; 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 4; /|||); nt; 4; 4; /X\\; nt; 4; 
                a4 4; \\!!!); nt; 4; 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                a4  4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 4; /|||); nt; 4; 
                b4 4; \\Y/; nt; 4; 4; \\!!!); nt; 4; 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|); nt; 4; 4; /||\\; nt; 4; 
                c5 4; \\!!!); nt; 4; 4; \\!!/; nt; 4; 4; \\!); nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 67-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "67" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; (|\\; nt; 4; 4; //||; nt; 4; 4; /||\\; nt; 4; 
                d4 4; \\!!/; nt; 4; 4; \\\\!!; nt; 4; 4; (!/; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                d4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; (|\\; nt; 4; 4; //||; nt; 4; 4; /||\\; nt; 4; 
                e4 4; \\!!/; nt; 4; 4; \\\\!!; nt; 4; 4; (!/; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; (|\\; nt; 4; 
                f4 4; \\!); nt; 4; 4; )!(; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                f4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; (|\\; nt; 4; 4; //||; nt; 4; 4; /||\\; nt; 4; 
                g4 4; \\!!/; nt; 4; 4; \\\\!!; nt; 4; 4; (!/; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; (|\\; nt; 4; 4; //||; nt; 4; 4; /||\\; nt; 4; 
                a4 4; \\!!/; nt; 4; 4; \\\\!!; nt; 4; 4; (!/; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                a4  4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 4; (|\\; nt; 4; 4; //||; nt; 4; 4; /||\\; nt; 4; 
                b4 4; \\!!/; nt; 4; 4; \\\\!!; nt; 4; 4; (!/; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; )|(; nt; 4; 4; /|); nt; 4; 
                c5 4; (!/; nt; 4; 4; \\!); nt; 4; 4; )!(; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })

        it("works for 72-EDO Revo", (): void => {
            const actual =
                computeDefaultSingleSpellingPerStepNotationAsStaffCodeInputSentence(
                    "72" as EdoNotationName,
                    flavor,
                )

            const expected: Io & Sentence = `
                ston 
                4; trcl; 12;
                c4 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 4; ||); nt; 4; 4; ||\\; nt; 4; 4; /||\\; nt; 4; 
                d4 4; !!/; nt; 4; 4; !!); nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                d4  4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 4; ||); nt; 4; 4; ||\\; nt; 4; 
                e4 4; \\!!/; nt; 4; 4; !!/; nt; 4; 4; !!); nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 
                f4 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                f4  4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 4; ||); nt; 4; 4; ||\\; nt; 4; 4; /||\\; nt; 4; 
                g4 4; !!/; nt; 4; 4; !!); nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                g4  4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 4; ||); nt; 4; 4; ||\\; nt; 4; 4; /||\\; nt; 4; 
                a4 4; !!/; nt; 4; 4; !!); nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl nl; 
                4; trcl; 12;
                a4  4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 4; /|\\; nt; 4; 4; ||); nt; 4; 4; ||\\; nt; 4; 
                b4 4; \\!!/; nt; 4; 4; !!/; nt; 4; 4; !!); nt; 4; 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                3; en; bl 10; 4; nt; 4; 4; /|; nt; 4; 4; |); nt; 4; 
                c5 4; \\!/; nt; 4; 4; !); nt; 4; 4; \\!; nt; 4; 
                en; blfn
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(
                extractKeyInfoFromInputSentence(expected),
            )
        })
    })
})
