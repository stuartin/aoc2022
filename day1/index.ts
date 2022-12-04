import { readFileSync } from "fs";

const input = readFileSync("./day1/data.txt").toString("utf-8").split("\r\n").map(string => parseInt(string))

const testData = [
    20576,
    21113,
    1865,
    NaN,
    2343,
    3759,
    4671,
    3514,
    6866,
    4546,
    3609,
    6326,
    5906,
    5442,
    5195,
    5583,
    2710,
    NaN,
    16332,
    2699,
    3741,
    7185,
    5896,
    NaN
]

const elfs: number[] = []

const elfCalories = input.reduce((currentElfTotal, calory) => {
    if (!calory) {
        elfs.push(currentElfTotal)
        return 0
    }
    return currentElfTotal + calory
})

console.log(`max: ${Math.max(...elfs)}`)