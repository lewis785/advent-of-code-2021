interface Node {
  name: string
  largeCave: boolean
  connectedCaves: Node[]
}

export const partOne = (input: string) => {
  const paths = input.split('\n').map((line) => line.split('-'))
  const caveNames = new Set(paths.flat())

  const graph = generateEdges(generateNodes(Array.from(caveNames.values())), paths)
  return mapPaths(graph['start'], graph['end'], []).length
}

export const partTwo = (input: string) => {
  const paths = input.split('\n').map((line) => line.split('-'))
  const caveNames = new Set(paths.flat())

  const graph = generateEdges(generateNodes(Array.from(caveNames.values())), paths)
  return mapPathsWithSmallCaves(graph['start'], graph['end'], []).length
}

const mapPaths = (current: Node, target: Node, path: string[]): string[][] => {
  if (path.includes(current.name) && !current.largeCave) {
    return []
  }

  path = [...path, current.name]
  if (current.name === target.name) {
    return [path]
  }

  const paths: string[][] = []

  current.connectedCaves.forEach((node) => {
    mapPaths(node, target, path).forEach((i) => {
      paths.push(i)
    })
  })

  return paths
}

const mapPathsWithSmallCaves = (current: Node, target: Node, path: string[]): string[][] => {
  if (current.name === 'start' && path.includes(current.name)) {
    return []
  }

  if (!current.largeCave && hasVisitedSmallCaveTwice(path) && path.includes(current.name)) {
    return []
  }

  path = [...path, current.name]
  if (current.name === target.name) {
    return [path]
  }

  const paths: string[][] = []

  current.connectedCaves.forEach((node) => {
    mapPathsWithSmallCaves(node, target, path).forEach((i) => {
      paths.push(i)
    })
  })

  return paths
}

const hasVisitedSmallCaveTwice = (path: string[]) => {
  const occurences = path.reduce<Record<string, number>>((count, value) => {
    if (value === value.toLowerCase()) {
      count[value] ? ++count[value] : (count[value] = 1)
    }

    return count
  }, {})

  return Object.values(occurences).filter((occurence) => occurence > 1).length > 0
}

const generateNodes = (names: string[]): Record<string, Node> => {
  return names.reduce<Record<string, Node>>((nodes, name) => {
    const node = {
      name,
      largeCave: name === name.toUpperCase(),
      connectedCaves: [],
    }

    return { ...nodes, [name]: node }
  }, {})
}

const generateEdges = (nodes: Record<string, Node>, paths: string[][]) => {
  paths.forEach(([caveA, caveB]) => {
    nodes[caveA].connectedCaves.push(nodes[caveB])
    nodes[caveB].connectedCaves.push(nodes[caveA])
  })

  return nodes
}
