const illegalScore = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const missingScore = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}

const startToEnd = {
  '(': ')',
  '{': '}',
  '[': ']',
  '<': '>',
}

type OpeningBracket = '{' | '[' | '<' | '('
type ClosingBracket = '}' | ']' | '>' | ')'
type Bracket = OpeningBracket | ClosingBracket

const openingChars: OpeningBracket[] = ['(', '[', '{', '<']

export const partOne = (input: string) => {
  const lines = input.split('\n').map((i) => i.split('') as Bracket[])

  const illegalSymbols = lines.map((line) => {
    const stack: OpeningBracket[] = []
    let illegalSymbol = ''
    for (let i = 0; i < line.length; i++) {
      const char = line[i]
      if (openingChars.includes(char as OpeningBracket)) {
        stack.push(char as OpeningBracket)
        continue
      }

      const expectedChar = startToEnd[stack.pop() as OpeningBracket]

      if (expectedChar !== char) {
        illegalSymbol = char
        break
      }
    }
    return illegalSymbol
  })

  return illegalSymbols
    .map((symbol) => (symbol === '' ? 0 : illegalScore[symbol as ClosingBracket]))
    .reduce((sum, value) => sum + value, 0)
}

export const partTwo = (input: string) => {
  const lines = input.split('\n').map((i) => i.split('') as OpeningBracket[])

  const missingScores = lines
    .map((line) => calculateMissingScore(line))
    .filter((line) => line !== 0)
    .sort((a, b) => a - b)

  return missingScores[Math.round((missingScores.length - 1) / 2)]
}

const calculateMissingScore = (line: Bracket[]) => {
  const stack: Bracket[] = []

  let missSymbols: ClosingBracket[] = []
  let illegal = false

  for (let i = 0; i < line.length; i++) {
    const char = line[i]
    if (openingChars.includes(char)) {
      stack.push(char)
      continue
    }

    const expectedChar = startToEnd[stack.pop() as OpeningBracket]

    if (expectedChar !== char) {
      illegal = true
      break
    }
  }

  if (illegal) {
    return 0
  }

  return stack
    .reverse()
    .map((symbol) => startToEnd[symbol as OpeningBracket])
    .reduce((sum, value) => sum * 5 + missingScore[value as ClosingBracket], 0)
}
