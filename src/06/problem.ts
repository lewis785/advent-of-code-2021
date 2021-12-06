interface Coordinate {
  x: number
  y: number
}

export const partOne = (input: string) => {
  return fishSimulator(input, 80)
}

export const partTwo = (input: string) => {
  return fishSimulator(input, 256)
}

const fishSimulator = (input: string, numberOfDays: number): number => {
  const fishSpawn = [...Array(9)].map((i) => 0)
  input.split(',').map((fish, index) => ++fishSpawn[parseInt(fish)])

  for (let i = 0; i < numberOfDays; i++) {
    const today = fishSpawn.shift() as number
    fishSpawn[6] += today
    fishSpawn.push(today)
  }

  return fishSpawn.reduce((output, value) => output + value, 0)
}
