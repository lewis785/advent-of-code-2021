import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '../problem'

describe('problem', () => {
  describe('partOne', () => {
    it('example one input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(40)
    })

    it('example two input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example2.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(8)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(702)
    })
  })
  describe('partTwo', () => {
    it('example input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(315)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(2955)
    })
  })
})
