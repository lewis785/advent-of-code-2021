export const partOne = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map((i) => parseInt(i)))

  return grid
    .map((row, rowIndex) => {
      return row.map((cell, columnIndex) =>
        isLowspot(grid, cell, columnIndex, rowIndex) ? cell + 1 : 0,
      )
    })
    .flat()
    .reduce((sum, value) => sum + value, 0)
}

interface Coordinates {
  x: number
  y: number
}

export const partTwo = (input: string) => {
  const grid = input.split('\n').map((row) => row.split('').map((i) => parseInt(i)))
  const flatLocations: Coordinates[] = []

  grid.forEach((row, rowIndex) => {
    return row.forEach((cell, columnIndex) => {
      if (isLowspot(grid, cell, columnIndex, rowIndex)) {
        flatLocations.push({ x: columnIndex, y: rowIndex })
      }
    })
  })

  // return mapBasin(grid, [], flatLocations[2]).length
  return flatLocations
    .map((location) => mapBasin(grid, [], location).length)
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((sum, value) => sum * value, 1)
}

const isLowspot = (grid: number[][], cell: number, x: number, y: number) => {
  if (x > 0 && grid[y][x - 1] < cell) {
    return false
  }
  if (x < grid[y].length && grid[y][x + 1] <= cell) {
    return false
  }
  if (y > 0 && grid[y - 1][x] < cell) {
    return false
  }
  if (y < grid.length - 1 && grid[y + 1][x] <= cell) {
    return false
  }
  return true
}

const hasAlreadyVisited = (visited: Coordinates[], location: Coordinates) => {
  return visited.filter((i) => i.y === location.y && i.x === location.x).length > 0
}

const mapBasin = (grid: number[][], visited: Coordinates[], location: Coordinates) => {
  if (grid[location.y][location.x] === 9 || hasAlreadyVisited(visited, location)) {
    return visited
  }

  visited = [...visited, location]

  if (location.x - 1 >= 0) {
    visited = mapBasin(grid, visited, { x: location.x - 1, y: location.y })
  }

  if (location.x + 1 <= grid[location.y].length - 1) {
    visited = mapBasin(grid, visited, { x: location.x + 1, y: location.y })
  }

  if (location.y - 1 >= 0) {
    visited = mapBasin(grid, visited, { x: location.x, y: location.y - 1 })
  }

  if (location.y + 1 <= grid.length - 1) {
    visited = mapBasin(grid, visited, { x: location.x, y: location.y + 1 })
  }

  return visited
}
