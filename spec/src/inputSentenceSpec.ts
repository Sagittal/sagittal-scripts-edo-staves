import { computeStaffCodeInputSentence } from "../../src/inputSentence"
import { Flavor } from "@sagittal/system"
import { extractKeyInfoFromInputSentence } from "../../src/compare"
import { Edo } from "../../../../system/src/notations/edo/types"
import { Io, Sentence } from "@sagittal/general"

describe("computeStaffCodeInputSentence computes the text as one would type into the StaffCode input box to produce a Sagittal EDO notation", (): void => {
    describe("Evo notations", (): void => {
        const flavor = Flavor.EVO

        it("works for 5-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(5 as Edo as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 5;   ; nt ; 9; en; bl 
                5; d4 5;   ; nt ; 9; en; bl 
                5; e4 5;   ; nt ; 9; en; bl 
                5; g4 5;   ; nt ; 9; en; bl 
                5; a4 5;   ; nt ;
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 11-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; \\! ; # ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 5; /| ; b ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 5; /| ;   ; nt ; 9; # ; nt ; 9; en; bl
                f4
                5; g4 5; /| ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; g4 9;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; a4 9;   ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 9;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; e4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; c5 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 22-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(22 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 9; en; bl
                nl; f4
                5; g4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; a4 9;   ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; g4 9; b ; nt ; 5; \\!/ ;   ; nt ;
                nl; g4
                9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 9; en; bl
                5; a4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 9; en; bl 
                5; c5 9; b ; nt ; 5; \\!/ ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 47-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(47 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; d4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; d4 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; e4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; f4 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; f4 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; g4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; g4 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; trcl; 5; a4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; a4 9; ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; b4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 9; en; bl 
                5; c5 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 52-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(52 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; X ; nt ; d4 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl d4 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; e4 bb ; nt ; 5; /|) ; bb ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl  9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; f4 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl f4 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; X ; nt ; g4 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; en; bl nl; 
                5; trcl; g4 ; 20; nt ;5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; X ; nt ; a4 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl a4 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; b4 bb ; nt ; 5; /|) ;  bb ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl  9; nt ; 5; /|) ; nt ; 9; # ; nt ; c5 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 
                8; en; blfn 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 67-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; d4 ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; trcl; 5; e4 f4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; g4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; g4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; a4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; a4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; trcl; 5; b4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;  ; nt ; 9; en; bl 
                5; c5 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 5; /|\\ ; # ; nt ; d4 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl d4 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; e4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; /|\\ ; b ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; f4 5; !) ; nt ; 5; \\! ; nt ; 9; en; bl nl; 
                5; trcl; f4 ; 20; nt ;5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 5; /|\\ ; # ; nt ; g4 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl g4 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 5; /|\\ ; # ; nt ; a4 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl a4 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; b4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; /|\\ ; b ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 9; en; bl nl; 
                5; trcl; 20; nt ;5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; c5 5; !) ; nt ; 5; \\! ; nt ; 
                8; en; blfn 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })

    describe("Evo-SZ notations", (): void => {
        const flavor = Flavor.EVO_SZ

        it("works for 5-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(5 as Edo as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 5;   ; nt ; 9; en; bl 
                5; d4 5;   ; nt ; 9; en; bl 
                5; e4 5;   ; nt ; 9; en; bl 
                5; g4 5;   ; nt ; 9; en; bl 
                5; a4 5;   ; nt ;
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 11-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; \\! ; # ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 5; /| ; b ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 5; /| ;   ; nt ; 9; # ; nt ; 9; en; bl
                f4
                5; g4 5; /| ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; g4 9;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; a4 9;   ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 9;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; e4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; c5 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 22-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(22 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 9; en; bl
                nl; f4
                5; g4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; a4 9;   ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; g4 9; b ; nt ; 5; d ;   ; nt ;
                nl; g4
                9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 9; en; bl
                5; a4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 9; en; bl 
                5; b4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 9; en; bl 
                5; c5 9; b ; nt ; 5; d ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 47-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(47 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; d4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; d4 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; e4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; f4 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; f4 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; g4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; g4 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; trcl; 5; a4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; nl; a4 9; ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; b4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 9; en; bl 
                5; c5 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 52-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(52 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; X ; nt ; d4 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl d4 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; e4 bb ; nt ; 5; /|) ; bb ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl  9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; f4 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl f4 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; X ; nt ; g4 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; en; bl nl; 
                5; trcl; g4 ; 20; nt ;5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; X ; nt ; a4 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl a4 9; nt ; 5; /|) ; nt ; 9; # ; nt ; 5; /|) ; # ; nt ; 9; b4 bb ; nt ; 5; /|) ;  bb ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 9; 
                bl  9; nt ; 5; /|) ; nt ; 9; # ; nt ; c5 5; \\!) ; b ; nt ; 9; b ; nt ; 5; /|) ; b ; nt ; 
                8; en; blfn 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 67-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; d4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; d4 ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; e4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; trcl; 5; e4 f4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; g4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; g4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; a4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; a4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 9; en; bl 
                5; trcl; 5; b4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;  ; nt ; 9; en; bl 
                5; c5 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 5; t# ; nt ; d4 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl d4 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; e4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; d ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; f4 5; !) ; nt ; 5; \\! ; nt ; 9; en; bl nl; 
                5; trcl; f4 ; 20; nt ;5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 5; t# ; nt ; g4 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl g4 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 5; t# ; nt ; a4 5; !) ; nt ; 5; \\! ; nt ; 9; 
                bl a4 9; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; b4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; d ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 9; en; bl nl; 
                5; trcl; 20; nt ;5; /| ; nt ; 5; |) ; nt ; 5; t ; nt ; c5 5; !) ; nt ; 5; \\! ; nt ; 
                8; en; blfn 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })

    describe("Revo notations", (): void => {
        const flavor = Flavor.REVO

        it("works for 5-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(5 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 5;   ; nt ; 9; en; bl 
                5; d4 5;   ; nt ; 9; en; bl 
                5; e4 5;   ; nt ; 9; en; bl 
                5; g4 5;   ; nt ; 9; en; bl 
                5; a4 5;   ; nt ;
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 11-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; ||\\ ;   ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 5; !!/ ;   ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 5; /| ;   ; nt ; 9; en; bl
                5; g4 5; \\! ;   ; nt ; g4 5; /| ;   ; nt ; 9; en; bl 
                5; a4 5; \\! ;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; b4 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 9; /||\\ ; nt ; 9; en; bl 
                5; d4 9;   ; nt ; 9; en; bl 
                5; e4 9; \\!!/ ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 9; /||\\ ; nt ; 9; en; bl 
                5; g4 9;   ; nt ; 9; /||\\ ; nt ; 9; en; bl 
                5; a4 9;   ; nt ; 9; en; bl 
                5; b4 9; \\!!/ ; nt ; 9;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; e4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; c5 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 22-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(22 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; ||\\ ;   ; nt ; 9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; e4 5; !!/ ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 9; en; bl 
                5; f4 9;   ; nt ; 5; /| ;   ; nt ; 5; ||\\ ;   ; nt ; 9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9; g4  ; nt ; 5; /| ;   ; nt ; 5; ||\\ ;   ; nt ; 9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 9; en; bl 
                5; b4 5; !!/ ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; d4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; e4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; en; bl 
                5; f4 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; g4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9; g4  ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; a4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; b4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9; ; nt ; 5; /|\\ ;   ; nt ; 9; en; bl 
                5; c5 5; \\!/ ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 47-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(47 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; d4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9; d4 ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; e4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; f4 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9; f4 ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; g4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9; g4  ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                nl; 
                5; trcl; 5; a4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9; a4 ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 9; en; bl 
                5; b4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 9; en; bl 
                5; c5 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 52-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(52 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9; nt ; 5; /|) ; nt ; 5; /||\\ ; nt ; 5; /|||) ; nt ; 5; /X\\ ; nt ; d4 5; \\!!!) ; nt ; 5; \\!!/ ; nt ; 5; \\!) ; nt ; 9; 
                bl d4 9; nt ; 5; /|) ; nt ; 5; /||\\ ; nt ; 5; /|||) ; nt ; e4 5; \\Y/ ; nt ; 5; \\!!!) ; nt ; 5; \\!!/ ; nt ; 5; \\!) ; nt ; 9; 
                bl 9; nt ; 5; /|) ; nt ; 5; /||\\ ; nt ; 5; /|||) ; nt ; f4 5; \\!!/ ; nt ; 5; \\!) ; nt ; 9; 
                bl f4 9; nt ; 5; /|) ; nt ; 5; /||\\ ; nt ; 5; /|||) ; nt ; 5; /X\\ ; nt ; g4 5; \\!!!) ; nt ; 5; \\!!/ ; nt ; 5; \\!) ; nt ; 9; en; bl nl; 
                5; trcl; g4 ; 20; nt ;5; /|) ; nt ; 5; /||\\ ; nt ; 5; /|||) ; nt ; 5; /X\\ ; nt ; a4 5; \\!!!) ; nt ; 5; \\!!/ ; nt ; 5; \\!) ; nt ; 9; 
                bl a4 9; nt ; 5; /|) ; nt ; 5; /||\\ ; nt ; 5; /|||) ; nt ; b4 5; \\Y/ ; nt ; 5; \\!!!) ; nt ; 5; \\!!/ ; nt ; 5; \\!) ; nt ; 9; 
                bl 9; nt ; 5; /|) ; nt ; 5; /||\\ ; nt ; c5 5; \\!!!) ; nt ; 5; \\!!/ ; nt ; 5; \\!) ; nt ; 
                8; en; blfn 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 67-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; d4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; d4  ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; e4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 9; en; bl 
                5; f4 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; f4 ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                nl; 
                5; trcl; 5; g4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;  g4 ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; a4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;  a4 ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                nl; 
                5; trcl; 5; b4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 9; en; bl 
                5; c5 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected: Io & Sentence = `
                ston 
                5; trcl; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; d4 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;  d4 ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 9; en; bl 
                5; e4 5; \\!!/ ;   ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 9; en; bl 
                nl; 
                5; trcl; 5; f4 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; f4 ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; g4 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; g4  ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 9; en; bl 
                5; a4 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; a4  ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 9; en; bl 
                nl; 
                5; trcl; 5; b4 5; \\!!/ ;   ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 9; en; bl 
                5; c5 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
            ` as Io & Sentence

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })
})
