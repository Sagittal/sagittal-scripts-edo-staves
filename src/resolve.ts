import { Maybe, Index, ZERO_ONE_INDEX_DIFF, deepEquals, isUndefined } from "@sagittal/general"
import { Flavor, Sagittal, computeAccidentalSagitype, EdoStepNotation, Link, Whorl, NOMINALS, SAGITTAL_HALF_FLAT, SAGITTAL_HALF_SHARP } from "@sagittal/system"

const REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D: Index<Link> = -17 as Index<Link>

const LINKS: Record<Index<Link>, Link> = Object.values(Whorl)
    .map(whorl => NOMINALS
        .map(nominal => ({ whorl, nominal }))
    )
    .flat()
    .reduce(
        (links: Record<Index<Link>, Link>, link: Link, index: number): Record<Index<Link>, Link> => {
            links[index + REINDEX_LINK_FROM_F_DOUBLE_FLAT_TO_D as Index<Link>] = link
            return links
        },
        {} as Record<Index<Link>, Link>
    )

const computePositiveOrNegativeOrNullSagittal = (sagittals: Sagittal[], sagittalIndex: Index<Sagittal>): Maybe<Sagittal> => {
    if (sagittalIndex > 0) return sagittals[sagittalIndex - ZERO_ONE_INDEX_DIFF]
    else if (sagittalIndex < 0) {
        return { ...sagittals[-sagittalIndex - ZERO_ONE_INDEX_DIFF], down: true }
    }

    return undefined
}

const computeSagitypeString = (maybeSagittal: Maybe<Sagittal>): string =>
    isUndefined(maybeSagittal) ?
        "" :
        computeAccidentalSagitype(maybeSagittal)

const computeWhorlString = (whorl: Whorl, { flavor }: { flavor: Flavor }) =>
    flavor == Flavor.REVO ?
        "" :
        whorl

const handleGeneralSagitypeAndWhorlStrings = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagitypeString: string, whorlString: string } =>
    ({ sagitypeString: computeSagitypeString(maybeSagittal), whorlString: computeWhorlString(whorl, { flavor }) })


const computeEvoSZSagitypeAndWhorlStrings = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagitypeString: string, whorlString: string } => {
    const isHalfSharp = deepEquals(maybeSagittal, SAGITTAL_HALF_SHARP);
    const isHalfFlat = deepEquals(maybeSagittal, SAGITTAL_HALF_FLAT);

    if (whorl === Whorl.DOUBLE_SHARP && isHalfFlat) {
        return { sagitypeString: "", whorlString: "t#" };
    } else if (whorl === Whorl.SHARP && (isHalfSharp || isHalfFlat)) {
        return { sagitypeString: "", whorlString: isHalfSharp ? "t#" : "t" };
    } else if (whorl === Whorl.NATURAL && (isHalfSharp || isHalfFlat)) {
        return { sagitypeString: "", whorlString: isHalfSharp ? "t" : "d" };
    } else if (whorl === Whorl.FLAT && (isHalfSharp || isHalfFlat)) {
        return { sagitypeString: "", whorlString: isHalfSharp ? "d" : "db" };
    } else if (whorl === Whorl.DOUBLE_FLAT && isHalfFlat) {
        return { sagitypeString: "", whorlString: "db" };
    } else {
        return handleGeneralSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor })
    }
}

const computeSagitypeAndWhorlStrings = (
    { maybeSagittal, whorl, flavor }: { maybeSagittal: Maybe<Sagittal>, whorl: Whorl, flavor: Flavor }
): { sagitypeString: string, whorlString: string } =>
    flavor === Flavor.EVO_SZ ?
        computeEvoSZSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor }) :
        handleGeneralSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor })

const resolveEdoStepNotationsToIntermediateStringFormsOfActualFinalVisualNotation = (
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor }: { sagittals: Sagittal[], flavor: Flavor }
): Record<any, string>[] => {
    return edoStepNotations.map(({ linkIndex, sagittalIndex }: EdoStepNotation): Record<any, string> => {
        const maybeSagittal: Maybe<Sagittal> = computePositiveOrNegativeOrNullSagittal(sagittals, sagittalIndex)
        const { nominal, whorl }: Link = LINKS[linkIndex]

        const { sagitypeString, whorlString } = computeSagitypeAndWhorlStrings({ maybeSagittal, whorl, flavor })

        return {
            nominalString: nominal,
            whorlString,
            sagitypeString,
        }
    })
}

export {
    resolveEdoStepNotationsToIntermediateStringFormsOfActualFinalVisualNotation,
}
