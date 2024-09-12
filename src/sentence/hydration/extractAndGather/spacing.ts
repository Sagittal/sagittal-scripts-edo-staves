import { Code, computeCodewordWidth, Octals } from "staff-code"
import { Word } from "@sagittal/general"

const computeWidth = ({
    sagittalCodewords,
    whorlCodewords,
}: {
    sagittalCodewords: (Code & Word)[]
    whorlCodewords: (Code & Word)[]
}) => {
    const whorlWidth: Octals = whorlCodewords.reduce(
        (totalWidth: Octals, whorlCodeword: Code & Word): Octals =>
            (totalWidth + computeCodewordWidth(whorlCodeword)) as Octals,
        0 as Octals,
    )
    const sagittalWidth: Octals = sagittalCodewords.reduce(
        (totalWidth: Octals, sagittalCodeword: Code & Word): Octals =>
            (totalWidth + computeCodewordWidth(sagittalCodeword)) as Octals,
        0 as Octals,
    )

    return (whorlWidth + sagittalWidth) as Octals
}

export { computeWidth }
