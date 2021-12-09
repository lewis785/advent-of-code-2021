export const partOne = (input: string) => {
  const uniqueLengths = [2, 3, 4, 7]
  return input
    .split('\n')
    .map((i) => i.split(' | ')[1])
    .map((i) => i.split(' '))
    .flat()
    .reduce((count, value) => (uniqueLengths.includes(value.length) ? count + 1 : count), 0)
}

const positionPosibilities = ['a', 'b', 'c', 'd', 'e', 'f']

export const partTwo = (input: string) => {
  const lines = input.split('\n').map((line) => {
    const [unique, output] = line
      .split(' | ')
      .map((i) => i.split(' ').map((j) => j.split('').sort().join('')))
    return { unique: unique.sort(), output: output }
  })

  const outputs = lines
    .map((line) => {
      const decoder = decode(line.unique)
      return line.output.map((output) => decoder[output])
    })
    .map((output) => parseInt(output.join('')))

  return outputs.reduce((sum, value) => sum + value, 0)
}

const decode = (input: string[]) => {
  const decoder: Record<string, string[]> = {}
  let inputBreakdown = input.map((i) => i.split(''))
  decoder[1] = inputBreakdown.find((value) => value.length === 2) as string[]
  decoder[4] = inputBreakdown.find((value) => value.length === 4) as string[]
  decoder[7] = inputBreakdown.find((value) => value.length === 3) as string[]
  decoder[8] = inputBreakdown.find((value) => value.length === 7) as string[]

  inputBreakdown = inputBreakdown.filter((value) => !Object.values(decoder).includes(value))

  decoder[9] = inputBreakdown.find((value) =>
    decoder[4].every((digit) => value.includes(digit)),
  ) as string[]

  inputBreakdown = inputBreakdown.filter((value) => !Object.values(decoder).includes(value))

  const zeroThree = inputBreakdown.filter((value) =>
    decoder[1].every((digit) => value.includes(digit)),
  )
  decoder[0] = zeroThree.find((value) => value.length === 6) as string[]
  decoder[3] = zeroThree.find((value) => value.length === 5) as string[]

  inputBreakdown = inputBreakdown.filter((value) => !Object.values(decoder).includes(value))

  decoder[6] = inputBreakdown.find((value) => value.length === 6) as string[]
  inputBreakdown = inputBreakdown.filter((value) => !Object.values(decoder).includes(value))

  const fourCurve = decoder[4].filter((value) => !decoder[1].includes(value))

  decoder[5] = inputBreakdown.find((value) =>
    fourCurve.every((digit) => value.includes(digit)),
  ) as string[]
  decoder[2] = inputBreakdown.find(
    (value) => !fourCurve.every((digit) => value.includes(digit)),
  ) as string[]

  return Object.values(decoder).reduce<Record<string, number>>((output, value, index) => {
    output[value.join('')] = index
    return output
  }, {})
}
