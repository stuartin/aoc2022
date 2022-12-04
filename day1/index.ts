import { readFileSync } from "fs";

export function dayOne(): number[] {
    const input = readFileSync("./day1/data.txt").toString("utf-8").split("\r\n").map(string => parseInt(string))
    const elfs: number[] = []

    input.reduce((currentElfTotal, calory) => {
        if (!calory) {
            elfs.push(currentElfTotal)
            return 0
        }
        return currentElfTotal + calory
    })

    console.log(`max: ${Math.max(...elfs)}`)
    return elfs
}