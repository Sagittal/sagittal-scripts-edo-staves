import { computeCodewordWidth, Octals, Code } from "staff-code"
import { Maybe, Index, ZERO_ONE_INDEX_DIFF, deepEquals, isUndefined, computeRange, Count, Decimal, max, Max, Word } from "@sagittal/general"
import {
    Flavor,
    Sagittal,
    computeAccidentalSagitype,
    EdoStepNotation,
    Link,
    Whorl,
    NOMINALS,
    SAGITTAL_SEMIFLAT,
    SAGITTAL_SEMISHARP,
    Sagitype,
    Edo,
    EdoStep,
    computeWholeToneStep,
    computeLimmaStep
} from "@sagittal/system"
import { Note, Stave } from "../types"
import { NoteCountParametersByStave, NoteCountByStavePattern, EdoSizeCategory, PatternedIntermediateForms, IntermediateForm } from "./types"
import {
    MAX_NOTE_COUNT_PER_STAVE,
    NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY,
    MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY,
    EDO_SIZE_CATEGORIES,
} from "./constants"

const REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D: Index<Link> = -17 as Index<Link>

const SZ_SESQUISHARP: Code & Word = "t#" as Code & Word
const SZ_SEMISHARP: Code & Word = "t" as Code & Word
const SZ_SEMIFLAT: Code & Word = "d" as Code & Word
const SZ_SESQUIFLAT: Code & Word = "d" as Code & Word

const LINKS: Record<Index<Link>, Link> = Object.values(Whorl)
    .map(whorl => NOMINALS
        .map(nominal => ({ whorl, nominal }))
    )
    .flat()
    .reduce(
        (links: Record<Index<Link>, Link>, link: Link, index: number): Record<Index<Link>, Link> => {
            links[index + REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D as Index<Link>] = link
            return links
        },
        {} as Record<Index<Link>, Link>
    )

const computePositiveOrNegativeOrNullSagittal = (sagittals: Sagittal[], sagittalIndex: Index<Sagittal>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return { ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF], down: true }
    }

    return undefined
}

const handleDiacritics = (sagitype: Sagitype): (Code & Word)[] =>
    sagitype.split(/(``|,,|`|,|'|\.)/) as (Code & Word)[]

const computeSagittalCodewords = (maybeSagittal: Maybe<Sagittal>): (Code & Word)[] =>
    isUndefined(maybeSagittal) ?
        [] :
        handleDiacritics(computeAccidentalSagitype(maybeSagittal))

const computeWhorlCodewords = (whorl: Whorl, { flavor }: { flavor: Flavor }): (Code & Word)[] =>
    flavor === Flavor.REVO ?
        [] :
        whorl === Whorl.NATURAL ?
            [] :
            [whorl as Code & Word]

const handleGeneralSagitypeAndWhorlCodewords = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } =>
({
    sagittalCodewords: computeSagittalCodewords(maybeSagittal),
    whorlCodewords: computeWhorlCodewords(whorl, { flavor })
})

const computeEvoSZSagitypeAndWhorlCodewords = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } => {
    const isHalfSharp = deepEquals(maybeSagittal, SAGITTAL_SEMISHARP);
    const isHalfFlat = deepEquals(maybeSagittal, SAGITTAL_SEMIFLAT);

    if (whorl === Whorl.DOUBLE_SHARP && isHalfFlat) {
        return { sagittalCodewords: [], whorlCodewords: [SZ_SESQUISHARP] };
    } else if (whorl === Whorl.SHARP && (isHalfSharp || isHalfFlat)) {
        return { sagittalCodewords: [], whorlCodewords: isHalfSharp ? [SZ_SESQUISHARP] : [SZ_SEMISHARP] };
    } else if (whorl === Whorl.NATURAL && (isHalfSharp || isHalfFlat)) {
        return { sagittalCodewords: [], whorlCodewords: isHalfSharp ? [SZ_SEMISHARP] : [SZ_SEMIFLAT] };
    } else if (whorl === Whorl.FLAT && (isHalfSharp || isHalfFlat)) {
        return { sagittalCodewords: [], whorlCodewords: isHalfSharp ? [SZ_SEMIFLAT] : [SZ_SESQUIFLAT] };
    } else if (whorl === Whorl.DOUBLE_FLAT && isHalfFlat) {
        return { sagittalCodewords: [], whorlCodewords: [SZ_SESQUIFLAT] };
    } else {
        return handleGeneralSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor })
    }
}

const computeSagitypeAndWhorlCodewords = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagittalCodewords: (Code & Word)[], whorlCodewords: (Code & Word)[] } =>
    flavor === Flavor.EVO_SZ ?
        computeEvoSZSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor }) :
        handleGeneralSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor })

const computePatternedEdoStepNotations = (
    edoStepNotations: EdoStepNotation[],
    { noteCountByStavePattern }: { noteCountByStavePattern: NoteCountByStavePattern }
) => {
    const patternedEdoStepNotations: EdoStepNotation[][] = [[]]
    let noteIndex: Index<Note> = 0 as Index<Note>
    let staveIndex: Index<Stave> = 0 as Index<Stave>
    edoStepNotations.forEach((edoStepNotation: EdoStepNotation): void => {
        patternedEdoStepNotations[staveIndex].push(edoStepNotation)
        noteIndex++
        if (noteIndex === noteCountByStavePattern[staveIndex] as Decimal<{ integer: true }> as Index<Note>) {
            staveIndex++
            patternedEdoStepNotations[staveIndex] = []
            noteIndex = 0 as Index<Note>
        }
    })

    return patternedEdoStepNotations.slice(0, patternedEdoStepNotations.length - 1) // TODO: would be nicer if there was a way to prevent the inclusion of the extra [] at the end from the line a few lines above
}

const computeNoteCountByStavePattern = ({ edo, fifthStep }: { edo: Edo, fifthStep: EdoStep }): NoteCountByStavePattern => {
    const wholeToneStep: EdoStep = computeWholeToneStep(edo, fifthStep)
    const limmaStep: EdoStep = computeLimmaStep(edo, fifthStep)
    const edoSizeCategoryInverseIndex: Index<EdoSizeCategory> = MAX_NOTE_COUNT_BY_STAVE_PARAMETERS_BY_DECREASING_EDO_SIZE_CATEGORY.reduce(
        (
            chosenEdoSizeCategoryInverseIndex: Index<EdoSizeCategory>,
            { wholeToneCount, limmaCount }: NoteCountParametersByStave,
            edoSizeCategoryInverseIndex: number
        ): Index<EdoSizeCategory> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep <= MAX_NOTE_COUNT_PER_STAVE ?
                edoSizeCategoryInverseIndex as Index<EdoSizeCategory> :
                chosenEdoSizeCategoryInverseIndex,
        0 as Index<EdoSizeCategory>
    )
    const edoSizeCategoryIndex: Index<EdoSizeCategory> = EDO_SIZE_CATEGORIES.length - ZERO_ONE_INDEX_DIFF - edoSizeCategoryInverseIndex as Index<EdoSizeCategory>
    const edoSizeCategory: EdoSizeCategory = EDO_SIZE_CATEGORIES[edoSizeCategoryIndex]
    const noteCountParametersByStavePattern: NoteCountParametersByStave[] = NOTE_COUNT_PARAMETERS_BY_STAVE_BY_EDO_SIZE_CATEGORY[edoSizeCategory]
    const noteCountByStavePattern: NoteCountByStavePattern = noteCountParametersByStavePattern
        .map(({ wholeToneCount, limmaCount }: NoteCountParametersByStave): Count<Note> =>
            wholeToneCount * wholeToneStep + limmaCount * limmaStep as Count<Note>
        )

    return noteCountByStavePattern
}

const computePatternedIntermediateForms = (patternedEdoStepNotations: EdoStepNotation[][], { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }): IntermediateForm[][] =>
    patternedEdoStepNotations.map((patternedEdoStepNotationsStave: EdoStepNotation[]): IntermediateForm[] => // TODO: EdoStaveNotations? 
        patternedEdoStepNotationsStave.map(({ linkIndex, sagittalIndex }: EdoStepNotation): IntermediateForm => {
            const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
            const { nominal, whorl }: Link = LINKS[linkIndex]
            const { sagittalCodewords, whorlCodewords } = computeSagitypeAndWhorlCodewords({ maybeSagittal, whorl, flavor })

            const whorlWidth: Octals = whorlCodewords.reduce(
                (totalWidth: Octals, whorlCodeword: Code & Word): Octals => totalWidth + computeCodewordWidth(whorlCodeword) as Octals,
                0 as Octals
            )
            const sagitypeWidth: Octals = sagittalCodewords.reduce(
                (totalWidth: Octals, sagitypeCodeword: Code & Word): Octals => totalWidth + computeCodewordWidth(sagitypeCodeword) as Octals,
                0 as Octals
            )

            return {
                nominal,
                whorlCodewords,
                sagittalCodewords,
                leftSpacingForAlignment: whorlWidth + sagitypeWidth as Octals // TODO: a bit of an abuse to temporarily set it to the thing's own width, but let's see how it works out...
            }
        })
    )

const computeColumnWidths = (patternedIntermediateFormsWithUntrueWidths: IntermediateForm[][]): Max<Octals>[] => {
    const maxLineLength: Max<Count<Note>> = max(...patternedIntermediateFormsWithUntrueWidths.map((line: IntermediateForm[]) => line.length as Count<Note>))

    return computeRange(maxLineLength).map((columnIndex: number): Max<Octals> =>
        patternedIntermediateFormsWithUntrueWidths.reduce(
            (maximumWidthOfNotationInThisColumn: Max<Octals>, patternedIntermediateFormsWithUntrueWidthsStave: IntermediateForm[]): Max<Octals> => {
                const maybePatternedIntermediateForm = patternedIntermediateFormsWithUntrueWidthsStave[columnIndex]
                const width = isUndefined(maybePatternedIntermediateForm) ? 0 : maybePatternedIntermediateForm.leftSpacingForAlignment

                return Math.max(maximumWidthOfNotationInThisColumn, width) as Max<Octals>
            },
            0 as Max<Octals>
        )
    )
}

const applyColumnWidths = (patternedIntermediateFormsWithUntrueWidths: IntermediateForm[][], columnWidths: Max<Octals>[]): IntermediateForm[][] =>
    patternedIntermediateFormsWithUntrueWidths.map((patternedIntermediateFormsWithUntrueWidthsStave: IntermediateForm[]): IntermediateForm[] =>
        patternedIntermediateFormsWithUntrueWidthsStave.map((intermediateFormWithUntrueWidth: IntermediateForm, columnIndex: number): IntermediateForm => ({
            ...intermediateFormWithUntrueWidth,
            leftSpacingForAlignment: columnWidths[columnIndex] - intermediateFormWithUntrueWidth.leftSpacingForAlignment as Octals
        })
        )
    )


const resolveEdoStepNotationsToPatternedIntermediateForms = (
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor, edo, fifthStep }: { sagittals: Sagittal[], flavor: Flavor, edo: Edo, fifthStep: EdoStep }
): PatternedIntermediateForms => {

    // TODO: ALIGNMENT 
    // Actually do the spacing correctly using the alignment info ...
    // you need to separately compute the individual cell widths,
    // and pass that on to the final step
    // and also use it to compute the max width
    //
    // when that's done, update all of the tests so you get the latest definition of nice formatting
    //
    // maybe better term than patterned, like, aligned? and does that just ultimately get consolidated into the idea of the intermediate form, that it is patterned?
    // and similarly just call it "pattern"ing the edo step notations?

    const noteCountByStavePattern: NoteCountByStavePattern = computeNoteCountByStavePattern({ edo, fifthStep })
    const patternedEdoStepNotations: EdoStepNotation[][] = computePatternedEdoStepNotations(edoStepNotations, { noteCountByStavePattern })
    const patternedIntermediateFormsWithUntrueWidths: IntermediateForm[][] = computePatternedIntermediateForms(patternedEdoStepNotations, { sagittals, flavor })
    const columnWidths: Max<Octals>[] = computeColumnWidths(patternedIntermediateFormsWithUntrueWidths)

    // console.log("noteCountByStavePattern: ", noteCountByStavePattern)
    // console.log("patternedEdoStepNotations: ", patternedEdoStepNotations)
    // console.log("patternedIntermediateFormsWithUntrueWidths: ", patternedIntermediateFormsWithUntrueWidths)
    // console.log("columnWidths: ", columnWidths)

    return applyColumnWidths(patternedIntermediateFormsWithUntrueWidths, columnWidths)
}

export {
    resolveEdoStepNotationsToPatternedIntermediateForms,
}

// TODO: break up this file
// TODO: solve barline at front of stave lines issue
// TODO: solve barlines aligning from stave to stave (see 72 EVO)
// TODO: more left-buffering after barline
