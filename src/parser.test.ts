import { Lexer } from './lexer'
import { Parser } from './parser'
import { LetStatement, Program } from './ast'

describe('parser', () => {
  describe('parses simple program correctly', () => {
    let lexer: Lexer
    let parser: Parser
    let program: Program

    beforeEach(() => {
      const input = `let x = 5;
    let y = 10;
    let foobar = 838383;
    `

      lexer = new Lexer(input)
      parser = new Parser(lexer)
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
})
