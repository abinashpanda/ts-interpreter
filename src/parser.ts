import { Token, TokenType } from './token'
import { Lexer } from './lexer'
import { LetStatement, Program, Statement, Identifier, Expression, ReturnStatement } from './ast'

export class Parser {
  private currentToken: Token
  private peekToken: Token
  private readonly lexer: Lexer

  constructor(private readonly input: string) {
    this.lexer = new Lexer(input)
    this.currentToken = this.lexer.nextToken()
    this.peekToken = this.lexer.nextToken()
  }

  nextToken() {
    this.currentToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  private currentTokenIs(tokenType: TokenType): boolean {
    return this.currentToken.tokenType === tokenType
  }

  private peekTokenIs(tokenType: TokenType): boolean {
    return this.peekToken.tokenType === tokenType
  }

  /**
   * Expects the peekToken to be of the tokenType provided.
   * If the expectation is met, the peekToken is consumed, meaning
   * the currentToken is set to the peekToken.
   */
  private expectPeek(tokenType: TokenType): boolean {
    if (this.peekTokenIs(tokenType)) {
      this.nextToken()
      return true
    }
    return false
  }

  parseStatement(): Statement {
    switch (this.currentToken.tokenType) {
      case TokenType.LET: {
        return this.parseLetStatement()
      }

      case TokenType.RETURN: {
        return this.parseReturnStatement()
      }

      default: {
        throw new Error(`Unexpected token: ${this.currentToken.tokenType}`)
      }
    }
  }

  parseLetStatement(): LetStatement {
    const statementToken = this.currentToken

    if (!this.expectPeek(TokenType.IDENT)) {
      throw new Error(`Expected identifier. Got ${this.peekToken.tokenType}`)
    }

    // the current token would be the identifier as the expectPeek() method
    // consumes the peekToken if the expectation is met
    const name = new Identifier(this.currentToken, this.currentToken.literal)

    if (!this.expectPeek(TokenType.ASSIGN)) {
      throw new Error(`Expected '='. Got ${this.peekToken.tokenType}`)
    }

    // @TODO: Parse expression
    // Right now we are skipping the part till we reach the semicolon
    while (this.currentToken.tokenType !== TokenType.SEMICOLON) {
      this.nextToken()
    }

    // @TODO: Add the parsed expression from above
    return new LetStatement(statementToken, name, new Expression())
  }

  parseReturnStatement(): ReturnStatement {
    const statementToken = this.currentToken

    this.nextToken()

    // @TODO: Parse expression
    // Right now we are skipping the part till we reach the semicolon
    while (this.currentToken.tokenType !== TokenType.SEMICOLON) {
      this.nextToken()
    }

    // @TODO: Add the parsed expression from above
    return new ReturnStatement(statementToken, new Expression())
  }

  parseProgram(): Program {
    const program = new Program([])

    while (this.currentToken.tokenType !== TokenType.EOF) {
      const statement = this.parseStatement()
      program.statements.push(statement)
      this.nextToken()
    }

    return program
  }
}
