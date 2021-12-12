export const partOne = (input: string) => {
  let grid = input.split('\n').map((line) => line.split('').map((value) => parseInt(value)))
  let totalFlashes = 0

  for (let i = 0; i < 100; i++) {
    const result = triggerFlashes(incrementGrid(grid), totalFlashes)
    grid = result.grid
    totalFlashes = result.totalFlashes
  }

  return totalFlashes
}

export const partTwo = (input: string) => {
  let grid = input.split('\n').map((line) => line.split('').map((value) => parseInt(value)))
  let step = 0

  while (true) {
    step++
    const result = triggerFlashes(incrementGrid(grid), 0)
    grid = result.grid
    if (result.totalFlashes === grid.length * grid[0].length) {
      return step
    }
  }
}

const incrementGrid = (grid: number[][]) => {
  return grid.map((row) => row.map((value) => value + 1))
}

const triggerFlashes = (
  grid: number[][],
  totalFlashes: number,
): { grid: number[][]; totalFlashes: number } => {
  const startingFlashes = totalFlashes
  const newGrid = grid

  const width = grid[0].length - 1
  const height = grid.length - 1

  grid.forEach((row, rowIndex) =>
    row.forEach((value, columnIndex) => {
      if (value <= 9) {
        newGrid[rowIndex][columnIndex] = value
      } else {
        totalFlashes++
        newGrid[rowIndex][columnIndex] = 0

        if (rowIndex - 1 >= 0) {
          if (columnIndex - 1 >= 0 && newGrid[rowIndex - 1][columnIndex - 1] !== 0) {
            newGrid[rowIndex - 1][columnIndex - 1]++
          }
          if (columnIndex + 1 <= width && newGrid[rowIndex - 1][columnIndex + 1] !== 0) {
            newGrid[rowIndex - 1][columnIndex + 1]++
          }
          if (newGrid[rowIndex - 1][columnIndex] !== 0) {
            newGrid[rowIndex - 1][columnIndex]++
          }
        }

        if (rowIndex + 1 <= height) {
          if (columnIndex - 1 >= 0 && newGrid[rowIndex + 1][columnIndex - 1] !== 0) {
            newGrid[rowIndex + 1][columnIndex - 1]++
          }
          if (columnIndex + 1 <= width && newGrid[rowIndex + 1][columnIndex + 1] !== 0) {
            newGrid[rowIndex + 1][columnIndex + 1]++
          }
          if (newGrid[rowIndex + 1][columnIndex] !== 0) {
            newGrid[rowIndex + 1][columnIndex]++
          }
        }

        if (columnIndex - 1 >= 0 && newGrid[rowIndex][columnIndex - 1] !== 0) {
          newGrid[rowIndex][columnIndex - 1]++
        }

        if (columnIndex + 1 <= width && newGrid[rowIndex][columnIndex + 1] !== 0) {
          newGrid[rowIndex][columnIndex + 1]++
        }
      }
    }),
  )

  if (startingFlashes !== totalFlashes) {
    return triggerFlashes(newGrid, totalFlashes)
  }

  return { grid, totalFlashes }
}
