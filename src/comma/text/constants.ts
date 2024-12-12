import { CommaNameOptions, DirectedNumbers, DirectedWord } from "@sagittal/system"

const LONG_COMMA_NAME_OPTIONS: CommaNameOptions = { abbreviated: false, directedNumbers: DirectedNumbers.ON }
const PRIMARY_COMMA_NAME_OPTIONS: CommaNameOptions = { directedWord: DirectedWord.NEVER }

export { LONG_COMMA_NAME_OPTIONS, PRIMARY_COMMA_NAME_OPTIONS }
