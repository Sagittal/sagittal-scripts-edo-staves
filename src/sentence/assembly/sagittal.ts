import { Clause, Word } from "@sagittal/general"
import { Code } from "staff-code"

const computeSagittalClause = (
    sagittalCodewords: (Code & Word)[],
    { subsetExcluded }: { subsetExcluded: boolean },
): Code & Clause =>
    subsetExcluded || sagittalCodewords.length === 0
        ? ("" as Code & Clause)
        : (sagittalCodewords.reduce(
              (sagittalClause: string, str: string) => sagittalClause + `${str}; `,
              "",
          ) as Code & Clause)

export { computeSagittalClause }
