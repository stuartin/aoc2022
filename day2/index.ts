import { dayOne } from "../day1/index"

const elfs = dayOne()

const sortedHighToLow = elfs.sort(function (a, b) {  return b - a;  })

const topThree = sortedHighToLow.slice(0, 3)

const total = topThree.reduce((acc, cur) => { return acc + cur }, 0)

console.log(sortedHighToLow)
console.log(topThree)
console.log(total)