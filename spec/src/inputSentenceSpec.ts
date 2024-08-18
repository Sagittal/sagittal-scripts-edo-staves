import { computeStaffCodeInputSentence } from "../../src/inputSentence"
import { Flavor } from "@sagittal/system"
import { extractKeyInfoFromInputSentence } from "../helpers/extractKeyInfoFromInputSentence"
import { Edo } from "../../src/types"

describe("computeStaffCodeInputSentence computes the text as one would type into the StaffCode input box to produce a Sagittal EDO notation", (): void => {
    describe("Evo notations", () => {
        const flavor = Flavor.EVO

        it("works for 5-EDO", (): void => {
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
                5; a4 5;   ; nt ; 9; bl ; 
                c5 9; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        // TODO: handle subset EDOs
        xit("works for 11-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected = `
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 12-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)
    
            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; d4 5;   ; nt ; 
                9; en; bl 
                5; e4 5;   ; b ; nt ; 5; n ; nt ; 
                9; en; bl 
                5; f4 5;   ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; g4 5;   ; nt ; 
                9; en; bl 
                5; a4 5;   ; b ; nt ; 5; n ; nt ; 
                9; en; bl 
                5; b4 5;   ; b ; nt ; 5; n ; nt ; 9; bl ; 
                c5 9; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)
    
            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; d4 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; e4 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; g4 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; a4 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; c5 5; \\! ; nt ; 9; n ; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)
    
            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 5; /|\\ ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; d4 5;   ; b ; nt ; 5; \\!/ ; nt ; 5; n ; nt ; 5; /|\\ ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; e4 5;   ; b ; nt ; 5; \\!/ ; nt ; 5; n ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; f4 5; \\!/ ; nt ; 5; n ; nt ; 5; /|\\ ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; g4 5;   ; b ; nt ; 5; \\!/ ; nt ; 5; n ; nt ; 5; /|\\ ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; a4 5;   ; b ; nt ; 5; \\!/ ; nt ; 5; n ; nt ; 5; /|\\ ; nt ; 5;   ; # ; nt ; 
                9; en; bl 
                5; b4 5;   ; b ; nt ; 5; \\!/ ; nt ; 5; n ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; c5 5; \\!/ ; nt ; 9; n ; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        // problem was: no this doesn't work, because it has #\!) instead of (|\ - need to add a layer that converts 
        // #\!) -> (|\
        // #(!) -> /|\
        // #\!/ -> (|)
        // #(!/ -> /|)
        // actually it's all of these, though I'm not sure if all of these are used in EDO notations
        // #)!\\ ->	)//|
        // #(!/  ->	/|)
        // #!//  ->	(|~
        // #(!)  ->	/|\
        // #!/)  ->	(/|
        // #)\!/ ->	)/|\
        // #(\!  ->	|\)
        // #\!/  ->	(|)
        // #(!~  ->	|\\
        // #\!)  ->	(|\
        // #)\\! -> )|\\
        // and I think I've fixed that problem
        it("works for 67-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)
    
            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; d4 9; b ; nt ; 5; )|( ; b ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; e4 9; b ; nt ; 5; )|( ; b ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 
                9; en; bl 
                5; f4 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; g4 9; b ; nt ; 5; )|( ; b ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                5; a4 9; b ; nt ; 5; )|( ; b ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 5; )!( ; # ; nt ; 9; # ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 9; b ; nt ; 5; )|( ; b ; nt ; 5; (!/ ;   ; nt ; 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 5; )|( ;   ; nt ; 5; /|) ;   ; nt ; 5; (|\\ ;   ; nt ; 
                9; en; bl 
                5; c5 5; \\!) ;   ; nt ; 5; )!( ;   ; nt ; 9; n ; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)
    
            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 5;   ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 5;   ; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; d4 5; \\!/ ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; e4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 5;   ; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; \\!/ ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 5; !) ; nt ; 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 5; !) ; # ; nt ; 5; \\! ; # ; nt ; 5;   ; # ; nt ; 5; /| ; # ; nt ; 5; |) ; # ; nt ; 
                9; en; bl 
                5; g4 5; \\!/ ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; a4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 5;   ; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; \\!/ ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; !) ; b ; nt ; 5; \\! ; b ; nt ; 5;   ; b ; nt ; 5; /| ; b ; nt ; 5; |) ; b ; nt ; 5; \\!/ ; nt ; 5; !) ; nt ; 5; \\! ; nt ; 5; n ; nt ; 5; /| ; nt ; 5; |) ; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; c5 5; !) ; nt ; 5; \\! ; nt ; 9; n ; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })
    
    describe("Revo notations", () => {
        const flavor = Flavor.REVO

        it("works for 5-EDO", (): void => {
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
                5; a4 5;   ; nt ; 9; bl ; 
                c5 9; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        xit("works for 11-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(11 as Edo, flavor)

            const expected = `
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        // problem was: it doesn't work because it makes everything /||\ instead of a mix of \!!/ and /||\
        // so I need to redo the Revo logic so that it DOES again after all generate the nominals + sharps/flats out to ±17
        // and figure out how to adapt what I've got to that. this is blocking the Revo 72-EDO notation, too
        // okay well... I've got this one working now, but I broke everyone else
        // and now i think that's fixed
        it("works for 12-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(12 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 9; /||\\ ; nt ; 
                9; en; bl 
                5; d4 9;   ; nt ; 
                9; en; bl 
                5; e4 9; \\!!/ ; nt ; 9; n ; nt ; 
                9; en; bl 
                5; f4 9;   ; nt ; 9; /||\\ ; nt ; 
                9; en; bl 
                5; g4 9;   ; nt ; 
                9; en; bl 
                5; a4 9; \\!!/ ; nt ; 9; n ; nt ; 
                9; en; bl 
                5; b4 9; \\!!/ ; nt ; 9; n ; nt ; 
                9; en; bl 
                5; c5 9;   ; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 15-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(15 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; d4 5; \\! ; nt ; 9; n; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; e4 5; \\! ; nt ; 9; n; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; g4 5; \\! ; nt ; 9; n; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; a4 5; \\! ; nt ; 9; n; nt ; 5; /| ; nt ; 
                9; en; bl 
                5; c5 5; \\! ; nt ; 9; n; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 31-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(31 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9; nt ; 5; /|\\ ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; d4 5; \\!!/ ; nt ; 5; \\!/ ; nt ; 9; n; nt ; 5; /|\\ ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; e4 5; \\!!/ ; nt ; 5; \\!/ ; nt ; 9; n; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; f4 5; \\!/ ; nt ; 9; n; nt ; 5; /|\\ ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; g4 5; \\!!/ ; nt ; 5; \\!/ ; nt ; 9; n; nt ; 5; /|\\ ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; a4 5; \\!!/ ; nt ; 5; \\!/ ; nt ; 9; n; nt ; 5; /|\\ ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; b4 5; \\!!/ ; nt ; 5; \\!/ ; nt ; 9; n; nt ; 5; /|\\ ; nt ; 
                9; en; bl 
                5; c5 5; \\!/ ; nt ; 9; n; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        // this one is pending solution to the #\!) instead of (|\ issue, I think
        // I tried to fix it, but I couldn't figure it out without breaking other simpler stuff
        // I suspect whatever i do to fix that one will affect this and this is more subtle maybe?
        it("works for 67-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(67 as Edo, flavor)
    
            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 5; //|| ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; d4 5; \\!!/ ; nt ; 5; \\\\!! ; nt ; 5; (!/ ; nt ; 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 5; //|| ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; e4 5; \\!!/ ; nt ; 5; \\\\!! ; nt ; 5; (!/ ; nt ; 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 
                9; en; bl 
                5; f4 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 5; //|| ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; g4 5; \\!!/ ; nt ; 5; \\\\!! ; nt ; 5; (!/ ; nt ; 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 5; //|| ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                5; a4 5; \\!!/ ; nt ; 5; \\\\!! ; nt ; 5; (!/ ; nt ; 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 5; //|| ; nt ; 5; /||\\ ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; \\!!/ ; nt ; 5; \\\\!! ; nt ; 5; (!/ ; nt ; 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 5; )|( ; nt ; 5; /|) ; nt ; 5; (|\\ ; nt ; 
                9; en; bl 
                5; c5 5; \\!) ; nt ; 5; )!( ; nt ; 9; n ; nt ; 
                3; en; bl 
                nl; 
            `
    
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })

        it("works for 72-EDO", (): void => {
            const actual = computeStaffCodeInputSentence(72 as Edo, flavor)

            const expected = `
                ston 
                5; Gcl ; 5; 
                c4 5; 9;   ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 9; /||\\ ; nt ; 5; /||| ;   ; nt ; 5; |||) ;   ; nt ; 
                9; en; bl 
                5; d4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; e4 5; !!!) ;   ; nt ; 5; \\!!! ;   ; nt ; 9; \\!!/ ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; f4 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 5; ||) ;   ; nt ; 5; ||\\ ;   ; nt ; 9; /||\\ ; nt ; 5; /||| ;   ; nt ; 5; |||) ;   ; nt ; 
                9; en; bl 
                5; g4 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; a4 5; !!!) ;   ; nt ; 5; \\!!! ;   ; nt ; 9; \\!!/ ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                nl; 
                5; Gcl ; 5; b4 5; !!!) ;   ; nt ; 5; \\!!! ;   ; nt ; 9; \\!!/ ; nt ; 5; !!/ ;   ; nt ; 5; !!) ;   ; nt ; 5; \\!/ ;   ; nt ; 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 5; /| ;   ; nt ; 5; |) ;   ; nt ; 5; /|\\ ;   ; nt ; 
                9; en; bl 
                5; c5 5; !) ;   ; nt ; 5; \\! ;   ; nt ; 9; n ; nt ; 
                3; en; bl 
                nl; 
            `
            expect(extractKeyInfoFromInputSentence(actual)).toEqual(extractKeyInfoFromInputSentence(expected))
        })
    })
})
