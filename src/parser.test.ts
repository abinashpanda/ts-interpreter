import { Parser } from './parser'
import { LetStatement, Program } from './ast'

describe('parser', () => {
  describe('parses simple program correctly', () => {
    let parser: Parser
    let program: Program

    beforeEach(() => {
      const input = `let x = 5;
    let y = 10;
    let foobar = 838383;
    `

      parser = new Parser(input)
      program = parser.parseProgram()
    })

    it('parses input correctly', () => {
      expect(program).not.toBeNull()
    })

    it('parses statements correctly', () => {
      const statements = program.statements
      expect(statements.length).toBe(3)
      for (const statement of statements) {
        expect(statement.tokenLiteral()).toBe('let')
      }
    })

    it('parses identifiers correctly', () => {
      const statements = program.statements

      const expectedIdentifiers = ['x', 'y', 'foobar']

      for (const [index, indentifier] of expectedIdentifiers.entries()) {
        const statement = statements[index]
        expect(statement).toBeInstanceOf(LetStatement)
        expect((<LetStatement>statement).name.value).toBe(indentifier)
      }
    })

    it('parses expressions correctly', () => {})
  })

  describe('parses incorrect program and throws error', () => {
    it('throws correct error', () => {
      const input = 'let = 10;'
      const parser = new Parser(input)
      expect(() => {
        parser.parseProgram()
      }).toThrowError('Expected identifier. Got =')
    })

    it('throws correct error when = is replaced with ==', () => {
      const input = 'let x == 10;'
      const parser = new Parser(input)
      expect(() => {
        parser.parseProgram()
      }).toThrowError("Expected '='. Got ==")
    })
  })
})
