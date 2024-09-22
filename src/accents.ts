import { Word } from "@sagittal/general"
import { Sagitype } from "@sagittal/system"
import { Code } from "staff-code"

const splitAccents = (sagitype: Sagitype): (Code & Word)[] =>
    sagitype.split(/(``|,,|`|,|'|\.)/).filter(Boolean) as (Code & Word)[] // .filter(Boolean) filters out empty strings

export { splitAccents }
