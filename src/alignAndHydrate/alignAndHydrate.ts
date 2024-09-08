import { Flavor, Sagittal, EdoStepNotation, Edo, EdoStep, SubsetFactor } from "@sagittal/system"
import { HydratedEdoStepNotation, Alignment, PartiallyHydratedEdoStepNotation } from "./types"
import { alignAndPartiallyHydrateEdoStepNotations } from "./alignAndPartiallyHydrate"
import { fullyHydrateEdoStepNotations } from "./fullyHydrate"

const alignAndHydrateEdoStepNotations = (
    edoStepNotations: EdoStepNotation[],
    { sagittals, flavor, edo, fifthStep, subsetFactor }: { sagittals: Sagittal[], flavor: Flavor, edo: Edo, fifthStep: EdoStep, subsetFactor?: SubsetFactor }
): HydratedEdoStepNotation[][] => {
    const alignedAndPartiallyHydratedEdoStepNotations: PartiallyHydratedEdoStepNotation[][] =
        alignAndPartiallyHydrateEdoStepNotations(edoStepNotations, { sagittals, flavor, subsetFactor, edo, fifthStep })

    return fullyHydrateEdoStepNotations(alignedAndPartiallyHydratedEdoStepNotations)
}

export {
    alignAndHydrateEdoStepNotations,
}
