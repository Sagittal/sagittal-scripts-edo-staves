import { Decimal, Ed, Index, Window } from "@sagittal/general"
import { Sagittal, Sagitype } from "@sagittal/system"

type EdoStep = Decimal<{ integer: true }> & { _EdoStepBrand: boolean }

type Edo = Ed<{ of: Window<{ of: 2 }> }> & EdoStep

interface SubsetNotationDefinition {
    subset: Edo
}

interface NonSubsetNotationDefinition {
    isLimmaFraction?: boolean,
    sagitypes: Sagitype[],
}

type EdoNotationDefinition = SubsetNotationDefinition | NonSubsetNotationDefinition

interface Spelling {
    linkIndex: Index<Link>              // 35 possibilities, -17 to 17, for FCGDAEB flanked by sharps and flats and doubles thereof
    sagittalIndex: Index<Sagittal>      // 0 is none, 1 is the first sagittal in the sequence
}

// type SpellingChoices = Spelling[]

// for convenience, these values are relatd to the ones used by StaffCode
enum Whorl {
    DOUBLE_FLAT = "B",
    FLAT = "b",
    NATURAL = "n",
    SHARP = "#",
    DOUBLE_SHARP = "x",
}

enum Nominal {
    F = "f",
    C = "c",
    G = "g",
    D = "d",
    A = "a",
    E = "e",
    B = "b",
}

interface Link {
    nominal: Nominal,
    whorl: Whorl
}

export {
    Edo,
    EdoStep,
    Spelling,
    // SpellingChoices,
    Whorl,
    Nominal,
    Link,
    EdoNotationDefinition,
    SubsetNotationDefinition,
    NonSubsetNotationDefinition,
}
