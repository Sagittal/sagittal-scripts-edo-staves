import { Octals } from "staff-code"
import { COLUMN_BUFFER_WIDTH } from "./constants"
import { AssemblyState } from "./types"
import { Nominal } from "@sagittal/system"

const computeLefthandSpacingClause = (
    lefthandSpacing: Octals,
    {
        isAlignedWithC4,
        assemblyState,
        nominal,
    }: {
        isAlignedWithC4: boolean
        assemblyState: AssemblyState
        nominal: Nominal
    },
) => {
    // if (isAlignedWithC4)
    const isC4: boolean =
        assemblyState.reachedC5 === false && nominal === Nominal.C // TODO: clean this up
    // console.log("isC4: ", isC4)
    // console.log("lalala: ", isAlignedWithC4, " asdkasg: ",  !isC4, `${(isAlignedWithC4 && !isC4) ? "2; " : ""}${
    //     lefthandSpacing + COLUMN_BUFFER_WIDTH
    // }; `)
    return `${isAlignedWithC4 && !isC4 ? "2; " : ""}${
        lefthandSpacing + COLUMN_BUFFER_WIDTH
    }; `
}

export { computeLefthandSpacingClause }
