import { Parser } from './parser'
import { LetStatement, Program, ReturnStatement } from './ast'

describe('parser', () => {
  describe('parses let statements correctly', () => {
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

  describe('parses incorrect let statements and throws error', () => {
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

  describe('parses return statements correctly', () => {
    it('parses simple return statements correctly', () => {
      const input = `return 5;
      return 10;
      return 993322;`
      const parser = new Parser(input)

      const program = parser.parseProgram()

      const statements = program.statements
      expect(statements.length).toBe(3)

      for (const statement of statements) {
        expect(statement).toBeInstanceOf(ReturnStatement)
        expect(statement.tokenLiteral()).toBe('return')
      }
    })
  })
})
