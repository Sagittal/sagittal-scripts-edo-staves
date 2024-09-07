import { Filename, Index, Io, Sentence } from "@sagittal/general"
import { Edo, Flavor } from "@sagittal/system"
import { asyncGenerateDiagram } from "./diagram"
import { EVO_FLAVOR_INDEX, EVO_SZ_FLAVOR_INDEX, FORMATTED_FLAVOR_NAMES, REVO_FLAVOR_INDEX } from "./constants"

const generateDiagram = (
    inputSentences: (Io & Sentence)[],
    edo: Edo,
    { flavorIndex, formattedFlavorName }: { flavorIndex: Index<Flavor>, formattedFlavorName: Io }
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentences[flavorIndex],
        `${formattedFlavorName} Sagittal notation for ${edo}-EDO`,
        `${edo}-EDO_${formattedFlavorName}.svg` as Filename
    ).then()

const generateOneOffDiagram = (
    inputSentence: (Io & Sentence),
    edo: Edo,
    { flavor }: { flavor: Flavor },
): Promise<void> =>
    asyncGenerateDiagram(
        inputSentence,
        `${FORMATTED_FLAVOR_NAMES[flavor]} Sagittal notation for ${edo}-EDO`,
        `one-off.svg` as Filename
    ).then()

const generateGeneralDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: "", flavorIndex: EVO_FLAVOR_INDEX })

const generateEvoDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO], flavorIndex: EVO_FLAVOR_INDEX })

const generateEvoSZDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.EVO_SZ], flavorIndex: EVO_SZ_FLAVOR_INDEX })

const generateRevoDiagram = (inputSentences: (Io & Sentence)[], edo: Edo): Promise<void> =>
    generateDiagram(inputSentences, edo, { formattedFlavorName: FORMATTED_FLAVOR_NAMES[Flavor.REVO], flavorIndex: REVO_FLAVOR_INDEX })

export {
    generateGeneralDiagram,
    generateEvoDiagram,
    generateEvoSZDiagram,
    generateRevoDiagram,
    generateOneOffDiagram,
}