import { EDO_NOTATION_DEFINITIONS, EdoName } from "@sagittal/system"
import { generateContext } from "../context/context"

const edoNames: EdoName[] = Object.keys(EDO_NOTATION_DEFINITIONS) as EdoName[]

edoNames.forEach((edoName: EdoName): void => {
    // generateContext(edo, subsections)
})
