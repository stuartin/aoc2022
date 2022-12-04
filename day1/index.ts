import { readFileSync } from "fs";

function partOne(): number[] {
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


// Part Two
const elfs = partOne()

const sortedHighToLow = elfs.sort(function (a, b) {  return b - a;  })

const topThree = sortedHighToLow.slice(0, 3)

const total = topThree.reduce((acc, cur) => { return acc + cur }, 0)

console.log(`total: ${total}`)
