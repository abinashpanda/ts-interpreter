import { Parser } from './parser'
import { ExpressionStatement, Identifier, IntegerLiteral, LetStatement, Program, ReturnStatement } from './ast'

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

  describe('parses expressions correctly', () => {
    it('parses identifier expression correctly', () => {
      const input = 'foobar;'
      const parser = new Parser(input)
      const program = parser.parseProgram()

      const statements = program.statements
      expect(statements.length).toBe(1)

      const expressionStatement = statements[0]
      expect(expressionStatement).toBeInstanceOf(ExpressionStatement)

      const expression = (<ExpressionStatement>expressionStatement).expression
      expect(expression).toBeInstanceOf(Identifier)

      const identifier = <Identifier>expression
      expect(identifier.tokenLiteral()).toBe('foobar')
      expect(identifier.value).toBe('foobar')
    })

    it('parses integer expression correctly', () => {
      const input = '5;'
      const parser = new Parser(input)
      const program = parser.parseProgram()
      const statements = program.statements

      expect(statements[0]).toBeInstanceOf(ExpressionStatement)

      const expressionStatement = <ExpressionStatement>statements[0]
      expect(expressionStatement.expression).toBeInstanceOf(IntegerLiteral)
      const expression = <IntegerLiteral>expressionStatement.expression
      expect(expression.value).toBe(5)
      expect(expression.tokenLiteral()).toBe('5')
    })
  })
})
