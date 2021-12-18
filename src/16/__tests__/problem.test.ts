import fs from 'fs'
import path from 'path'
import { convertHexToBinary, partOne, partTwo } from '../problem'

describe('problem', () => {
  describe('#convertHexToBinary', () => {
    it('should convert correctly', () => {
      expect(convertHexToBinary('D2FE28')).toEqual('110100101111111000101000')
    })
  })

  describe.only('partOne', () => {
    it('example 1', () => {
      const input = '8A004A801A8002F478'
      expect(partOne(input)).toEqual(16)
    })

    it('example 1', () => {
      const input = '620080001611562C8802118E34'
      expect(partOne(input)).toEqual(12)
    })

    it('example 1', () => {
      const input = 'C0015000016115A2E0802F182340'
      expect(partOne(input)).toEqual(23)
    })

    it('example 1', () => {
      const input = 'A0016C880162017C3686B18A3D4780'
      expect(partOne(input)).toEqual(31)
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
