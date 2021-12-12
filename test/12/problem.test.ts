import fs from 'fs'
import path from 'path'
import { partOne, partTwo } from '@src/12/problem'

describe('problem', () => {
  describe('partOne', () => {
    it('example one input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example_one.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(10)
    })

    it('example two input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example_two.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(19)
    })

    it('example thre input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example_three.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(226)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partOne(input)).toEqual(5874)
    })
  })

  describe('partTwo', () => {
    it('example one input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example_one.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(36)
    })

    it('example two input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example_two.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(103)
    })

    it('example thre input', () => {
      const input = fs.readFileSync(path.join(__dirname, './example_three.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(3509)
    })

    it('puzzle input', () => {
      const input = fs.readFileSync(path.join(__dirname, './input.txt')).toString('utf-8')
      expect(partTwo(input)).toEqual(153592)
    })
  })
})
