import { Flavor } from "@sagittal/system"

const computeUseOnlyPlainNominals = ({ flavor, isLimmaFraction }: { flavor: Flavor, isLimmaFraction: boolean }): boolean =>
    flavor == Flavor.REVO || isLimmaFraction
    // isLimmaFraction

export {
    computeUseOnlyPlainNominals,
}
