import { computeStaffCodeInputSentence } from "../../src/inputSentence"
import { Flavor } from "@sagittal/system"
import { extractKeyInfoFromInputSentence } from "../helpers/extractKeyInfoFromInputSentence"
import { Edo } from "../../src/types"

describe("computeStaffCodeInputSentence computes the text as one would type into the StaffCode input box to produce a Sagittal EDO notation", (): void => {
    describe("Evo notations", () => {
        const flavor = Flavor.EVO

        it("works for 5-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(5 as Edo as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 
                9; en; bl 
                5; d4 5;   ; nt ; 
                9; en; bl 
                5; e4 5;   ; nt ; 
                9; en; bl 
                5; g4 5;   ; nt ; 
                9; en; bl 
                5; a4 5;   ; nt ;
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 11-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; \\! ; # ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 5; /| ; b ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 5; /| ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 5; /| ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9;   ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 9;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; e4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\! ;   ; nt ; 
                3; en; bl 
                nl;
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 22-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(22 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9;   ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; c5 9; b ; nt ; 5; \\!/ ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 47-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(47 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; f4 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; g4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; a4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; b4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 
                9; en; bl 
                5; c5 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 67-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; c5 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 
                3; en; bl 
                nl;
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO Evo", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; d4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; g4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; a4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })

    describe("Evo-SZ notations", () => {
        const flavor = Flavor.EVO_SZ

        it("works for 5-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(5 as Edo as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 
                9; en; bl 
                5; d4 5;   ; nt ; 
                9; en; bl 
                5; e4 5;   ; nt ; 
                9; en; bl 
                5; g4 5;   ; nt ; 
                9; en; bl 
                5; a4 5;   ; nt ;
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 11-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; \\! ; # ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 5; /| ; b ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 5; /| ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 5; /| ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9;   ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 9;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; e4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\! ;   ; nt ; 
                3; en; bl 
                nl;
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 22-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(22 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9;   ; nt ; 5; /| ;   ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9;   ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 5; /| ; b ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 5; t ;   ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; b4 9; b ; nt ; 5; d ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; c5 9; b ; nt ; 5; d ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 47-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(47 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; f4 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; g4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; a4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; b4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 
                9; en; bl 
                5; c5 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 67-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; g4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; \\!) ; # ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; c5 9; b ; nt ; 5; )|( ; b ; nt ; 5; /|) ; b ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 
                3; en; bl 
                nl;
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO Evo-SZ", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; t ;   ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; d4 5; d ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; t ;   ; nt ; 
                9; en; bl 
                5; e4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; d ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; t ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; t ;   ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; g4 5; d ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; t ;   ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 9; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; a4 5; d ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; t ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 9; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; d ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 
                9; en; bl 
                5; c5 5; d ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })

    describe("Revo notations", () => {
        const flavor = Flavor.REVO

        it("works for 5-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(5 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 
                9; en; bl 
                5; d4 5;   ; nt ; 
                9; en; bl 
                5; e4 5;   ; nt ; 
                9; en; bl 
                5; g4 5;   ; nt ; 
                9; en; bl 
                5; a4 5;   ; nt ;
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 11-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; ||\\ ;   ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 5; !!/ ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 5; /| ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\! ;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\! ;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; b4 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 9; /||\\ ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 9; \\!!/ ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 9; /||\\ ; nt ; 
                9; en; bl 
                5; g4 9;   ; nt ; 9; /||\\ ; nt ; 
                9; en; bl 
                5; a4 9;   ; nt ; 
                9; en; bl 
                5; b4 9; \\!!/ ; nt ; 9;   ; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; e4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\! ;   ; nt ; 
                3; en; bl 
                nl;
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 22-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(22 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; ||\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; e4 5; !!/ ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 5; /| ;   ; nt ; 5; ||\\ ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; ||\\ ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 
                9; en; bl 
                5; b4 5; !!/ ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; f4 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; b4 5; \\!!/ ;   ; nt ; 5; \\!/ ;   ; nt ; 9;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\!/ ;   ; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 47-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(47 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; f4 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; g4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; a4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 5; |\\ ;   ; nt ; 
                9; en; bl 
                5; b4 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 9;   ; nt ; 5; |( ;   ; nt ; 5; |) ;   ; nt ; 
                9; en; bl 
                5; c5 5; !/ ;   ; nt ; 5; !) ;   ; nt ; 5; !( ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 67-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 
                9; en; bl 
                5; f4 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; g4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; a4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; //|| ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; \\!!/ ;   ; nt ; 5; \\\\!! ;   ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 
                9; en; bl 
                5; c5 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 
                3; en; bl 
                nl; 
            `

            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO Revo", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; d4 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; \\!!/ ;   ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; g4 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 5; /||\\ ;   ; nt ; 
                9; en; bl 
                5; a4 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; \\!!/ ;   ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })
})
