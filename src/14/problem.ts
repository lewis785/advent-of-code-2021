export const partOne = (input: string) => {
  const { initOccurrences, initPairs, mapping } = parseInput(input)

  const { occurrences } = [...Array(10)].reduce<{
    pairs: typeof initPairs
    occurrences: typeof initOccurrences
  }>(
    (output, _) => {
      return { ...step(output.pairs, mapping, output.occurrences) }
    },
    { pairs: initPairs, occurrences: initOccurrences },
  )

  return Math.max(...Object.values(occurrences)) - Math.min(...Object.values(occurrences))
}

export const partTwo = (input: string) => {
  const { initOccurrences, initPairs, mapping } = parseInput(input)

  const { occurrences } = [...Array(40)].reduce<{
    pairs: typeof initPairs
    occurrences: typeof initOccurrences
  }>(
    (output, _) => {
      return { ...step(output.pairs, mapping, output.occurrences) }
    },
    { pairs: initPairs, occurrences: initOccurrences },
  )

  return Math.max(...Object.values(occurrences)) - Math.min(...Object.values(occurrences))
}

const parseInput = (input: string) => {
  const [templateString, mappingString] = input.split('\n\n')
  const initPairs = generatePairs(templateString)
  const mapping = generateMapping(mappingString)
  const initOccurrences = generateOccurences(templateString)

  return { initOccurrences, initPairs, mapping }
}

const generatePairs = (templateString: string) => {
  return templateString
    .split('')
    .reduce<Record<string, number>>((output, value, index, elements) => {
      if (index + 1 >= elements.length) {
        return output
      }

      const key = `${value}${elements[index + 1]}`
      return { ...output, [key]: output[key] ? output[key] + 1 : 1 }
    }, {})
}

interface Mapping {
  outputs: string[]
  adds: string
}

const generateMapping = (mappingString: string): Record<string, Mapping> => {
  return mappingString.split('\n').reduce((mapping, line) => {
    const [input, output] = line.split(' -> ')
    const outputs = input
      .split('')
      .map((value, index) => (index === 0 ? `${value}${output}` : `${output}${value}`))

    return {
      ...mapping,
      [input]: { outputs, adds: output },
    }
  }, {})
}

const generateOccurences = (template: string) => {
  return template.split('').reduce<Record<string, number>>((occurences, char) => {
    occurences[char] = occurences[char] ? occurences[char] + 1 : 1
    return occurences
  }, {})
}

const step = (
  initalPairs: Record<string, number>,
  mapping: Record<string, Mapping>,
  occurrences: Record<string, number>,
) => {
  const pairs = Object.keys(initalPairs).reduce<Record<string, number>>((output, key) => {
    const [pairOne, pairTwo] = mapping[key].outputs
    const initialPairCount = initalPairs[key]
    occurrences = incrementOccurrence(occurrences, mapping[key].adds, initialPairCount)

    output[pairOne] = output[pairOne] ? output[pairOne] + initialPairCount : initialPairCount
    output[pairTwo] = output[pairTwo] ? output[pairTwo] + initialPairCount : initialPairCount

    return output
  }, {})

  return { pairs, occurrences }
}

const addPair = (pairs: Record<string, number>, output: Record<string, number>, pair: string) => {
  const existingPairCount = pairs[pair] ? pairs[pair] : 1

  console.log({ output, pair, existingPairCount })
  output[pair] = output[pair] ? output[pair] + existingPairCount : existingPairCount
  return output
}

const incrementOccurrence = (occurences: Record<string, number>, char: string, count: number) => {
  if (count === 0) {
    console.log({ occurences, char, count })
  }

  occurences[char] = occurences[char] ? occurences[char] + count : count
  return occurences
}
