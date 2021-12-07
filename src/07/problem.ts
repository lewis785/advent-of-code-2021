interface Coordinate {
  x: number
  y: number
}

export const partOne = (input: string) => {
  const alignment = input.split(',').map((i) => parseInt(i))
  const max = Math.max(...alignment)

  const possibleAlignment = [...Array(max)].map((_, index) =>
    alignment.reduce((usedFuel, alignment) => {
      const fuel = alignment <= index ? index - alignment : alignment - index
      return usedFuel + fuel
    }, 0),
  )

  return Math.min(...possibleAlignment)
}

export const partTwo = (input: string) => {
  const alignment = input.split(',').map((i) => parseInt(i))
  const max = Math.max(...alignment)

  const possibleAlignment = [...Array(max)].map((_, index) =>
    alignment.reduce((usedFuel, alignment) => {
      const fuel =
        alignment <= index ? incrementalFuel(index - alignment) : incrementalFuel(alignment - index)
      return usedFuel + fuel
    }, 0),
  )

  return Math.min(...possibleAlignment)
}

const memoizedFuel: Record<number, number> = {}

const incrementalFuel = (distance: number) => {
  if (memoizedFuel[distance]) {
    return memoizedFuel[distance]
  }

  memoizedFuel[distance] = [...Array(distance)]
    .map((_, i) => i + 1)
    .reduce((sum, value) => sum + value, 0)
  return memoizedFuel[distance]
}
