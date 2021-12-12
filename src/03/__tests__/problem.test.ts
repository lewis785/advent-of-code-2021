import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '../problem'

describe('dayTwo', () => {
  describe('partOne', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './example.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partOne(input)).toEqual(198)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partOne(input)).toEqual(3847100)
    })
  })

  describe('partTwo', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './example.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partTwo(input)).toEqual(230)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partTwo(input)).toEqual(4105235)
    })
  })
})
