export const partOne = (input: string[]) => {
  const instructions = input.map((value) => value.split(' '))

  return instructions
    .reduce<number[]>(
      (output, instruction) => {
        const [direction, value] = instruction
        if (direction === 'forward') {
          return [output[0] + parseInt(value), output[1]]
        }
        const newDepth =
          direction === 'down' ? output[1] + parseInt(value) : output[1] - parseInt(value)

        return [output[0], newDepth]
      },
      [0, 0],
    )
    .reduce((output, value) => output * value, 1)
}

export const partTwo = (input: string[]) => {
  const instructions = input.map((value) => value.split(' '))

  const result = instructions.reduce<number[]>(
    (output, instruction) => {
      const [direction, value] = instruction
      if (direction === 'forward') {
        return [output[0] + parseInt(value), output[1] + parseInt(value) * output[2], output[2]]
      }
      const newAim =
        direction === 'down' ? output[2] + parseInt(value) : output[2] - parseInt(value)

      return [output[0], output[1], newAim]
    },
    [0, 0, 0],
  )

  return result[0] * result[1]
}
