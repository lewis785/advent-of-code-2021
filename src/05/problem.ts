interface Coordinate {
  x: number
  y: number
}

export const partOne = (input: string) => {
  const lineCoordinates = parseInput(input).filter(
    (coordinates) => coordinates[0].x === coordinates[1].x || coordinates[0].y === coordinates[1].y,
  )

  const coordnateCounts = lineCoordinates
    .map((coordinates) => generateStraightLine(coordinates[0], coordinates[1]))
    .flat()
    .reduce<Record<string, number>>((output, value) => {
      return output[value] ? ++output[value] : (output[value] = 1), output
    }, {})

  return Object.keys(coordnateCounts).filter((key) => coordnateCounts[key] >= 2).length
}

export const partTwo = (input: string) => {
  const lineCoordinates = parseInput(input)

  const coordnateCounts = lineCoordinates
    .map((coordinates) => generateStraightLine(coordinates[0], coordinates[1]))
    .flat()
    .reduce<Record<string, number>>((output, value) => {
      return output[value] ? ++output[value] : (output[value] = 1), output
    }, {})

  return Object.keys(coordnateCounts).filter((key) => coordnateCounts[key] >= 2).length
}

const generateStraightLine = (first: Coordinate, second: Coordinate) => {
  if (first.x === second.x) {
    const start = Math.min(first.y, second.y)
    const end = Math.max(first.y, second.y)
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => `${first.x},${start + idx}`)
  }

  if (first.y === second.y) {
    const start = Math.min(first.x, second.x)
    const end = Math.max(first.x, second.x)
    return Array(end - start + 1)
      .fill(0)
      .map((_, idx) => `${start + idx},${first.y}`)
  }

  const start = first.x < second.x ? first : second
  const end = first.x > second.x ? first : second

  const xCords = Array(end.x - start.x + 1)
    .fill(0)
    .map((_, idx) => start.x + idx)

  if (start.y > end.y) {
    return Array(start.y - end.y + 1)
      .fill(0)
      .map((_, idx) => `${xCords[idx]},${start.y - idx}`)
  }

  return Array(end.y - start.y + 1)
    .fill(0)
    .map((_, idx) => `${xCords[idx]},${start.y + idx}`)
}

const parseInput = (input: string): Coordinate[][] => {
  const coordinateStrings = input.split('\n').map((row) => row.split(' -> '))
  return coordinateStrings.map((line) =>
    line.map((coordinate) => {
      const [x, y] = coordinate.split(',')
      return { x: parseInt(x), y: parseInt(y) }
    }),
  )
}
