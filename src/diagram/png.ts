import * as fs from "fs"
import sharp from "sharp"

const convertSvgToPng = (): void => {
    const svg = fs.readFileSync("dist/one-off.svg")

    sharp(svg).png().toFile("dist/one-off.png")
}

export { convertSvgToPng }
