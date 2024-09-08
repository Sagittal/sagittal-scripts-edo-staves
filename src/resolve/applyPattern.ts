import { Index, Decimal, Max } from "@sagittal/general"
import { EdoStepNotation } from "@sagittal/system"
import { Note, Stave } from "../types"
import { NoteCountByStavePattern } from "./types"

const applyNoteCountByStavePatternToEdoStepNotations = (
    edoStepNotations: EdoStepNotation[],
    { noteCountByStavePattern }: { noteCountByStavePattern: NoteCountByStavePattern }
) => {
    const patternedEdoStepNotations: EdoStepNotation[][] = [[]]
    const maxStaveIndex: Max<Index<Stave>> = noteCountByStavePattern.length - 1 as Max<Index<Stave>>
        
    let noteIndex: Index<Note> = 0 as Index<Note>
    let staveIndex: Index<Stave> = 0 as Index<Stave>
        
    edoStepNotations.forEach((edoStepNotation: EdoStepNotation): void => {
        patternedEdoStepNotations[staveIndex].push(edoStepNotation)
        noteIndex++
        if (staveIndex < maxStaveIndex && noteIndex === noteCountByStavePattern[staveIndex] as Decimal<{ integer: true }> as Index<Note>) {
            staveIndex++
            patternedEdoStepNotations[staveIndex] = []
            noteIndex = 0 as Index<Note>
        }
    })

    return patternedEdoStepNotations
}

export {
    applyNoteCountByStavePatternToEdoStepNotations,
}
