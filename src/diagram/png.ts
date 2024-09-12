import * as fs from "fs"
import sharp from "sharp"

const BASE_SHARP_DENSITY: number = 72
const DENSITY_DOUBLER_FOR_PNG_SHARPNESS: number = 2

const convertSvgToPng = (): void => {
    const svg = fs.readFileSync("dist/one-off.svg")

    sharp(svg, {
        density: BASE_SHARP_DENSITY * DENSITY_DOUBLER_FOR_PNG_SHARPNESS,
    })
        .png()
        .toFile("dist/one-off.png")
}

export { convertSvgToPng }
