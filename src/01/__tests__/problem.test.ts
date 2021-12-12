import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '../problem'

describe('dayOne', () => {
  describe('partOne', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './example.txt'))
        .toString('utf-8')
        .split('\n')
        .map((value) => parseInt(value))
      expect(partOne(input)).toEqual(7)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString('utf-8')
        .split('\n')
        .map((value) => parseInt(value))
      expect(partOne(input)).toEqual(1462)
    })
  })

  describe('partTwo', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './example.txt'))
        .toString('utf-8')
        .split('\n')
        .map((value) => parseInt(value))
      expect(partTwo(input)).toEqual(5)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString('utf-8')
        .split('\n')
        .map((value) => parseInt(value))
      expect(partTwo(input)).toEqual(1497)
    })
  })
})
