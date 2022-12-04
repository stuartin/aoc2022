import { readFileSync } from "fs";

const myAction: { [K in PTwo]: Action} = {
    x: "rock",
    y: "paper",
    z: "scissors"
}

const theirAction: { [K in POne]: Action} = {
    c: "scissors",
    a: "rock",
    b: "paper"
}

const wasWin: { [K in Action]: POne} = {
    "rock": "c",
    "paper": "a",
    "scissors": "b"
}

const wasDraw: { [K in Action]: POne} = {
    rock: "a",
    paper: "b",
    scissors: "c"
}

const actionScore: {[K in PTwo]: number} = {
    x: 1,
    y: 2,
    z: 3
}

const roundScore = {
    lost: 0,
    draw: 3,
    win: 6
}

const didWin = (a: POne, b: PTwo) => {
    return a === wasWin[myAction[b]]
}

const didDraw = (a: POne, b: PTwo) => {
    return a === wasDraw[myAction[b]]
}

const getRoundScore = (a: POne, b: PTwo) => {
    if (didWin(a, b)) return roundScore["win"]
    if (didDraw(a, b)) return roundScore["draw"]
    return roundScore["lost"]
}

type POne = "a" | "b" | "c"
type PTwo = "y" | "x" | "z"
type Action = "rock" | "paper" | "scissors"
type Result = "win" | "draw" | "lost"
type Outcome = {
    didWin: boolean
    actionScore: number
    roundScore: number
    totalScore: number
}

const testData = [
    "A Y",
    "B X",
    "C Z"
]

const input = readFileSync("./day2/data.txt").toString("utf-8").split("\r\n")

const results: Outcome[] = input.map(match => {
    const pOne = match.split(" ")[0].toLowerCase() as POne 
    const pTwo = match.split(" ")[1].toLowerCase() as PTwo

    return {
        didWin: didWin(pOne, pTwo),
        actionScore: actionScore[pTwo],
        roundScore: getRoundScore(pOne, pTwo),
        totalScore: actionScore[pTwo] + getRoundScore(pOne, pTwo)
    }
})

const totalScore = results.reduce((acc, curr) => {
    return acc + curr.totalScore
}, 0)

console.log(totalScore)