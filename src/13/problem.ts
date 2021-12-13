export const partOne = (input: string) => {
  const { positions, instructions } = parseInput(input)
  const paper = generatePaper(positions)

  return countDots(foldPaper(paper, instructions[0]))
}

export const partTwo = (input: string) => {
  const { positions, instructions } = parseInput(input)
  const paper = generatePaper(positions)

  const code = instructions
    .reduce((paper, instruction) => foldPaper(paper, instruction), paper)
    .map((row) => row.join(''))
    .join('\n')

  return `\n${code}`
}

interface Position {
  x: number
  y: number
}

interface Instruction {
  axis: 'x' | 'y'
  position: number
}

const parseInput = (input: string): { positions: Position[]; instructions: Instruction[] } => {
  const [positionString, instructionString] = input.split('\n\n')

  const positions = positionString.split('\n').map((position) => {
    const [x, y] = position.split(',')
    return { x: parseInt(x), y: parseInt(y) }
  })

  const instructions = instructionString.split('\n').map((instruction) => {
    const instructionArray = instruction.split(' ')
    const [axis, position] = instructionArray[instructionArray.length - 1].split('=')
    return { axis, position: parseInt(position) } as Instruction
  })

  return { positions, instructions }
}

const generatePaper = (positions: Position[]) => {
  const maxX = positions.reduce((max, position) => (position.x > max ? position.x : max), 0) + 1
  const maxY = positions.reduce((max, position) => (position.y > max ? position.y : max), 0) + 1

  const paper = [...Array(maxY)].map((row) => [...Array(maxX)].map((_) => ' '))
  positions.forEach((position) => {
    paper[position.y][position.x] = '#'
  })

  return paper
}

const foldPaper = (paper: string[][], instruction: Instruction) => {
  if (instruction.axis === 'x') {
    return foldHorizonatal(paper, instruction.position)
  }

  return foldVeritical(paper, instruction.position)
}

const foldHorizonatal = (paper: string[][], position: number) => {
  const folded = paper.map((row) => [row.slice(0, position), row.slice(position + 1)])

  return folded.map(([left, right]) => {
    right = right.reverse()
    return left.map((value, index) => (value === '#' ? '#' : right[index]))
  })
}

const foldVeritical = (paper: string[][], position: number) => {
  const top = paper.slice(0, position)
  const bottom = paper.slice(position + 1)
  return top
    .reverse()
    .map((row, rowIndex) => {
      if (rowIndex < bottom.length) {
        return row.map((value, columnIndex) =>
          value === '#' ? '#' : bottom[rowIndex][columnIndex],
        )
      }
      return row
    })
    .reverse()
}

const countDots = (paper: string[][]) => {
  return paper.reduce((sum, row) => {
    return row.reduce((rowSum, char) => (char === '#' ? ++rowSum : rowSum), 0) + sum
  }, 0)
}
