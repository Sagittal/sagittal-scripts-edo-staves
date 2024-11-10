import { Io, Sentence } from "@sagittal/general"
import { Sagitype } from "@sagittal/system"
import { Code } from "staff-code"

const computeDefiniendum = (
    sagitype: Sagitype,
    { isFirstExpression }: { isFirstExpression: boolean },
): Code & Sentence => `${isFirstExpression ? "" : "5; "}${sagitype};` as Code & Sentence

const computeDefiniens = (definiensBody: Io, { isFinalExpression }: { isFinalExpression: boolean }): Io =>
    `${definiensBody}${isFinalExpression ? "" : ","}` as Io

export { computeDefiniendum, computeDefiniens }
