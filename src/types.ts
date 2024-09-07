import { Code } from "staff-code"
import { Count, Word } from "@sagittal/general"
import { Nominal } from "@sagittal/system"

type Note = { _NoteBrand: boolean }

interface IntermediateForm {
    nominal: Nominal,
    sagittalCodewords: (Code & Word)[],
    whorlCodewords: (Code & Word)[]
}

export {
    Note,
    IntermediateForm,
}
