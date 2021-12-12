import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '../problem'

describe('problem', () => {
  describe('partOne', () => {
    it('example input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(15)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(530)
    })
  })

  describe('partTwo', () => {
    it('example input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(1134)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(1019494)
    })
  })
})
