export const partOne = (inputs: number[]): number => {
  return inputs.filter((value, index) => {
    return index !== 0 && value > inputs[index - 1]
  }).length
}

export const partTwo = (inputs: number[]): number => {
  return partOne(
    inputs.reduce<number[]>((output, value, index) => {
      return index + 2 > inputs.length
        ? output
        : [...output, value + inputs[index + 1] + inputs[index + 2]]
    }, []),
  )
}
