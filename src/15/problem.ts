import Heap from 'heap'
import { isEqual } from 'lodash'

export const partOne = (input: string) => {
  const grid = generateGrid(parseInput(input))
  const start = grid[0][0]
  const end = grid[grid.length - 1][grid[0].length - 1]
  return search(grid, start, end)
    .slice(1)
    .reduce((sum, i) => sum + i.cost, 0)
}

export const partTwo = (input: string) => {
  const baseGrid = parseInput(input)
  const grid = generateGrid(generateFullGrid(baseGrid))
  const start = grid[0][0]
  const end = grid[grid.length - 1][grid[0].length - 1]

  // return generateFullGrid(baseGrid).slice(10)
  return search(grid, start, end)
    .slice(1)
    .reduce((sum, i) => sum + i.cost, 0)
}

interface Node {
  g: number
  h: number
  f: number
  cost: number
  parent: Node | null
  visited: boolean
  closed: boolean
  position: Position
}

interface Position {
  x: number
  y: number
}

const parseInput = (input: string) => {
  return input.split('\n').map((row) => row.split('').map((i) => parseInt(i)))
}

const generateGrid = (input: number[][]): Node[][] => {
  return input.map((row, rowIndex) =>
    row.map((i, columnIndex) => {
      return {
        g: Number.POSITIVE_INFINITY,
        h: Number.POSITIVE_INFINITY,
        f: Number.POSITIVE_INFINITY,
        cost: i,
        parent: null,
        visited: false,
        closed: false,
        position: { x: columnIndex, y: rowIndex },
      }
    }),
  )
}

const generateFullGrid = (grid: number[][]) => {
  const baseWidth = grid[0].length
  const baseHeight = grid.length

  const fullRow = grid.map((row) => {
    return [...row, ...row, ...row, ...row, ...row].map((value, index) => {
      const repeat = Math.floor(index / baseWidth)
      return value + repeat > 9 ? value + repeat - 9 : value + repeat
    })
  })

  const additionalRows = [...fullRow, ...fullRow, ...fullRow, ...fullRow].map((row, index) => {
    const repeat = Math.floor(index / baseHeight) + 1
    return row.map((i) => (i + repeat > 9 ? i + repeat - 9 : i + repeat))
  })

  return [...fullRow, ...additionalRows]
}

const manhattanDistance = (current: Position, end: Position) => {
  return Math.abs(current.x - end.x) + Math.abs(current.y - end.y)
}

const search = (grid: Node[][], start: Node, end: Node) => {
  const openNodes = new Heap((a: Node, b: Node) => a.f - b.f)
  openNodes.push(start)

  while (openNodes.size() > 0) {
    const current = openNodes.pop()
    if (isEqual(current, end)) {
      return getPathToNode(current, [])
    }

    current.closed = true
    const neighbors = findNeighbors(grid, current)

    neighbors.forEach((neighbor) => {
      if (neighbor.closed) {
        return
      }

      const gScore =
        current.g === Number.POSITIVE_INFINITY ? neighbor.cost : current.g + neighbor.cost
      const beenVisted = neighbor.visited

      if (!beenVisted || gScore < neighbor.g) {
        neighbor.visited = true
        neighbor.parent = current
        neighbor.h = manhattanDistance(neighbor.position, end.position)
        neighbor.g = gScore
        neighbor.f = neighbor.g + neighbor.h

        if (!beenVisted) {
          openNodes.push(neighbor)
        } else {
          openNodes.updateItem(neighbor)
        }
      }
    })
  }
  return []
}

const getPathToNode = (node: Node, path: Node[]): Node[] => {
  if (node.parent === null) {
    return [node, ...path]
  }

  return getPathToNode(node.parent, [node, ...path])
}

const findNeighbors = (grid: Node[][], node: Node) => {
  const neighbors: Node[] = []
  const { position } = node

  if (position.y - 1 >= 0) {
    neighbors.push(grid[position.y - 1][position.x])
  }

  if (position.y + 1 < grid.length) {
    neighbors.push(grid[position.y + 1][position.x])
  }

  if (position.x - 1 >= 0) {
    neighbors.push(grid[position.y][position.x - 1])
  }

  if (position.x + 1 < grid[0].length) {
    neighbors.push(grid[position.y][position.x + 1])
  }

  return neighbors
}
