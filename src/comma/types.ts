import { Comma, Name } from "@sagittal/general"
import { Sagitype } from "@sagittal/system"

type CommaSection = {
    primaryCommaName?: Name<Comma>
    isDown: boolean
    comma: Comma
    superComma: Comma
    sagitype: Sagitype
}

export { CommaSection }
