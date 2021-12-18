export const partOne = (input: string) => {
  const binary = convertHexToBinary(input)
  const version = parseInt(binary.slice(0, 2), 2)
  const tag = parseInt(binary.slice(2, 5), 2)

  return { binary, version, tag }
}

export const partTwo = (input: string) => {
  return 0
}

export const convertHexToBinary = (hex: string) => {
  return parseInt(hex, 16).toString(2)
}

const parseInput = (input: string) => {
  return input.split('\n').map((row) => row.split('').map((i) => parseInt(i)))
}
