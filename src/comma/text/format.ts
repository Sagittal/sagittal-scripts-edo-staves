import { Comma, Name } from "@sagittal/general"

const fixFactoring = (commaName: Name<Comma>): Name<Comma> => commaName.replace(/5²/g, "25") as Name<Comma>

const fixLongName = (commaName: Name<Comma>): Name<Comma> =>
    commaName.replace(/-/g, " ").toLowerCase() as Name<Comma>

export { fixFactoring, fixLongName }
