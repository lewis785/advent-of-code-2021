import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '@src/02/problem'

describe('dayTwo', () => {
  describe('partOne', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './example.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partOne(input)).toEqual(150)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partOne(input)).toEqual(1989265)
    })
  })

  describe('partTwo', () => {
    it('example input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './example.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partTwo(input)).toEqual(900)
    })

    it('puzzle input', () => {
      const input = fs
        .readFileSync(path.join(__dirname, './input.txt'))
        .toString('utf-8')
        .split('\n')
      expect(partTwo(input)).toEqual(2089174012)
    })
  })
})
