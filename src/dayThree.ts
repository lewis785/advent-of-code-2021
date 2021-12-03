export const partOne = (input: string[]) => {
  const binaryArrays = input.map((value) => value.split(''))
  const binarySum = binaryArrays.reduce<number[]>(
    (output, binary) => {
      binary.forEach((bit, index) => (output[index] += parseInt(bit)))
      return output
    },
    [...Array(binaryArrays[0].length)].map((i) => 0),
  )

  const epsilonRate = parseInt(
    binarySum.map((bit) => (bit > binaryArrays.length / 2 ? 1 : 0)).join(''),
    2,
  )
  const gamaRate = parseInt(
    binarySum.map((bit) => (bit > binaryArrays.length / 2 ? 0 : 1)).join(''),
    2,
  )

  return epsilonRate * gamaRate
}

export const partTwo = (input: string[]) => {
  const binaryArrays = input.map((value) => value.split('').map((i) => parseInt(i)))

  let oxygenArray = binaryArrays
  let pos = 0
  while (oxygenArray.length !== 1) {
    const commonDigit = mostCommon(oxygenArray, pos)
    oxygenArray = oxygenArray.filter((value) => value[pos] === commonDigit)
    pos++
  }

  let carbonDioxideArray = binaryArrays
  pos = 0
  while (carbonDioxideArray.length !== 1) {
    const commonDigit = mostCommon(carbonDioxideArray, pos) === 1 ? 0 : 1
    carbonDioxideArray = carbonDioxideArray.filter((value) => value[pos] === commonDigit)
    pos++
  }

  return parseInt(oxygenArray[0].join(''), 2) * parseInt(carbonDioxideArray[0].join(''), 2)
}

const mostCommon = (binaryArray: number[][], position: number) => {
  const binaryCount = binaryArray.reduce<number>((output, binary) => {
    output += binary[position]
    return output
  }, 0)

  return binaryCount >= binaryArray.length / 2 ? 1 : 0
}
