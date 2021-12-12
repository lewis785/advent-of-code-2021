import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '../problem'

describe('dayTwo', () => {
  describe('partOne', () => {
    it('example input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(37)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(349812)
    })
  })

  describe('partTwo', () => {
    it('example input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(168)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(99763899)
    })
  })
})
