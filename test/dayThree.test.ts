import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '../src/dayThree'

describe('dayTwo', () => {
  describe('partOne', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input/example_day_three.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partOne(input)).toEqual(198)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input/input_day_three.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partOne(input)).toEqual(3847100)
    })
  })

  describe('partTwo', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input/example_day_three.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partTwo(input)).toEqual(230)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input/input_day_three.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partTwo(input)).toEqual(4105235)
    })
  })
})
