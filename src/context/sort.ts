import { Subsection } from "./types"

const SUFFICIENT_AND_SIMPLE_FACTOR_TO_SORT_BY_DIAGRAM_TYPE_FIRST_THEN_B_NOTATION: number = 10

const sortSubsections = (subsections: Subsection[]) => {
    subsections.sort(
        (
            {
                diagramType: diagramTypeA,
                isSecondBestNotation: isSecondBestNotationA,
            }: Subsection,
            {
                diagramType: diagramTypeB,
                isSecondBestNotation: isSecondBestNotationB,
            }: Subsection,
        ): number => {
            return (
                diagramTypeA *
                    SUFFICIENT_AND_SIMPLE_FACTOR_TO_SORT_BY_DIAGRAM_TYPE_FIRST_THEN_B_NOTATION +
                (isSecondBestNotationA ? 1 : 0) -
                diagramTypeB *
                    SUFFICIENT_AND_SIMPLE_FACTOR_TO_SORT_BY_DIAGRAM_TYPE_FIRST_THEN_B_NOTATION -
                (isSecondBestNotationB ? 1 : 0)
            )
        },
    )
}

export { sortSubsections }
