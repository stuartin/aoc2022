import { readFileSync } from "fs";

const myAction: { [K in PTwo]: Action} = {
    x: "rock",
    y: "paper",
    z: "scissors"
}

const theirAction: { [K in POne]: Action} = {
    a: "rock",
    b: "paper",
    c: "scissors"
}

const toDrawAgainst: { [K in Action]: Action} = {
    rock: "rock",
    paper: "paper",
    scissors: "scissors"
}

const toWinAgainst: { [K in Action]: Action} = {
    rock: "paper",
    paper: "scissors",
    scissors: "rock"
}

const toLoseAgainst: { [K in Action]: Action} = {
    rock: "scissors",
    paper: "rock",
    scissors: "paper"
}

const wasWin: { [K in Action]: POne} = {
    rock: "c",
    paper: "a",
    scissors: "b"
}

const wasDraw: { [K in Action]: POne} = {
    rock: "a",
    paper: "b",
    scissors: "c"
}

const partOneActionScore: {[K in PTwo]: number} = {
    x: 1,
    y: 2,
    z: 3
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
type Result = "lost" | "draw" | "win"
type Outcome = {
    didWin?: boolean
    actionScore: number
    roundScore: number
    totalScore: number
}

const partTwoActionScore: {[K in Action]: number} = {
    rock: 1,
    paper: 2,
    scissors: 3
}

const roundScore: {[K in Result]: number} = {
    lost: 0,
    draw: 3,
    win: 6
}

const desiredOutcome: {[K in PTwo]: Result} = {
    x: "lost",
    y: "draw",
    z: "win"
}

const selectAction = (a: POne, desiredOutcome?: Result): Action => {
    const theirChoice = theirAction[a]

    if (desiredOutcome) {
        switch (desiredOutcome) {
            case "draw":
                return toDrawAgainst[theirChoice]
                break;

            case "lost":
                return toLoseAgainst[theirChoice]
                break;

            default:
            case "win":
                return toWinAgainst[theirChoice]
                break;
        }
    }

    return toWinAgainst[theirChoice]
}


const testData = [
    "A Y",
    "B X",
    "C Z"
]

const input = readFileSync("./day2/data.txt").toString("utf-8").split("\r\n")

const partOne = () => {
    const results: Outcome[] = input.map(match => {
        const pOne = match.split(" ")[0].toLowerCase() as POne 
        const pTwo = match.split(" ")[1].toLowerCase() as PTwo
    
        return {
            actionScore: partOneActionScore[pTwo],
            roundScore: getRoundScore(pOne, pTwo),
            totalScore: partOneActionScore[pTwo] + getRoundScore(pOne, pTwo)
        }
    })
    
    const totalScore = results.reduce((acc, curr) => {
        return acc + curr.totalScore
    }, 0)
    
    console.log(`part one: ${totalScore}`)
}

const partTwo = () => {
    const results: Outcome[] = input.map(match => {
        const pOne = match.split(" ")[0].toLowerCase() as POne 
        const pTwo = match.split(" ")[1].toLowerCase() as PTwo

        const myAction = selectAction(pOne, desiredOutcome[pTwo])
    
        const result =  {
            actionScore: partTwoActionScore[myAction],
            roundScore: roundScore[desiredOutcome[pTwo]],
            totalScore: partTwoActionScore[myAction] + roundScore[desiredOutcome[pTwo]]
        }
        return result
    })
    
    const totalScore = results.reduce((acc, curr) => {
        return acc + curr.totalScore
    }, 0)
    
    console.log(`part Two: ${totalScore}`)
}

partOne()
partTwo()
