export const partOne = (input: string) => {
  const { bingoCards, bingoNumbers } = parseInput(input)

  let numberIndex = 0

  while (true) {
    numberIndex++
    const selectedNumbers = bingoNumbers.slice(0, numberIndex)
    const result = bingoCards.map((card) =>
      card.map((line) => line.filter((value) => !selectedNumbers.includes(value))),
    )

    const contenderCards = result.filter(
      (card) => card.filter((line) => line.length === 0).length === 1,
    )
    if (contenderCards.length !== 1) {
      continue
    }
    return (
      [...new Set(contenderCards[0].flat())].reduce((output, value) => (output += value), 0) *
      bingoNumbers[numberIndex - 1]
    )
  }
}

export const partTwo = (input: string) => {
  const { bingoCards, bingoNumbers } = parseInput(input)

  let numberIndex = 0

  while (true) {
    numberIndex++
    const selectedNumbers = bingoNumbers.slice(0, numberIndex)
    const result = bingoCards.map((card) =>
      card.map((line) => line.filter((value) => !selectedNumbers.includes(value))),
    )

    const contenderCards = result.filter(
      (card) => card.filter((line) => line.length === 0).length === 0,
    )

    if (contenderCards.length !== 1) {
      continue
    }
    const looserCard = contenderCards[0].map((line) =>
      line.filter((value) => value !== bingoNumbers[numberIndex]),
    )
    return (
      [...new Set(looserCard.flat())].reduce((output, value) => (output += value), 0) *
      bingoNumbers[numberIndex]
    )
  }
}

const parseInput = (input: string) => {
  const inputArray = input.split('\n\n')
  const bingoNumbers = inputArray
    .shift()
    ?.split(',')
    .map((i) => parseInt(i))

  if (bingoNumbers === undefined) {
    throw Error
  }

  const bingoCards = generateBingoCards(inputArray)

  return { bingoCards, bingoNumbers }
}

const generateBingoCards = (bingoStrings: string[]): number[][][] => {
  const bingoCardRows = bingoStrings.map((card) =>
    card.split('\n').map((row) =>
      row
        .replace(/\s+/g, ' ')
        .trim()
        .split(' ')
        .map((value) => parseInt(value)),
    ),
  )

  const bingoCardColumns = bingoCardRows.map((card) =>
    card.map((val, index) => card.map((row) => row[index]).reverse()),
  )

  return bingoCardRows.map((card, index) => [...card, ...bingoCardColumns[index]])
}
