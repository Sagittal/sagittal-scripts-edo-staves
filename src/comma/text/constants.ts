import { Comma, Name } from "@sagittal/general"
import { CommaNameOptions, DirectedNumbers, DirectedWord } from "@sagittal/system"

const LONG_COMMA_NAME_OPTIONS: CommaNameOptions = { abbreviated: false, directedNumbers: DirectedNumbers.ON }
const PRIMARY_COMMA_NAME_OPTIONS: CommaNameOptions = { directedWord: DirectedWord.NEVER }

const NEW_COMMA_PAGES: Name<Comma>[] = ["35L", "13/7S", "25⋅11/7M"] as Name<Comma>[]
const RARE_COMMAS: Name<Comma>[] = ["25⋅11/7M"] as Name<Comma>[]

export { LONG_COMMA_NAME_OPTIONS, PRIMARY_COMMA_NAME_OPTIONS, NEW_COMMA_PAGES, RARE_COMMAS }
