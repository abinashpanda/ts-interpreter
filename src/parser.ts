import { Token, TokenType } from './token'
import { Lexer } from './lexer'
import {
  LetStatement,
  Program,
  Statement,
  Identifier,
  Expression,
  ReturnStatement,
  ExpressionStatement,
  IntegerLiteral,
} from './ast'

export type PrefixParseFunction = () => Expression
export type InfixParseFunction = (expression: Expression) => Expression

/**
 * Enum representing the operator and the value represents the precendence of the operator.
 */
enum Operator {
  LOWEST = 1,
  EQUALS = 2,
  LESSGREATER = 3,
  SUM = 4,
  PRODUCT = 5,
  PREFIX = 6,
  CALL = 7,
}

type PrefixParseFunctions = {
  [key in TokenType]?: PrefixParseFunction
}

type InfixParseFunctinos = {
  [key in TokenType]?: InfixParseFunction
}

export class Parser {
  private currentToken: Token
  private peekToken: Token
  private readonly lexer: Lexer
  private prefixParseFunctions: PrefixParseFunctions = {}
  private infixParseFunctions: InfixParseFunctinos = {}

  constructor(private readonly input: string) {
    this.lexer = new Lexer(input)
    this.currentToken = this.lexer.nextToken()
    this.peekToken = this.lexer.nextToken()

    this.registerPrefix(TokenType.IDENT, this.parseIdentifier.bind(this))
    this.registerPrefix(TokenType.INT, this.parseIntegerLiteral.bind(this))
  }

  private registerPrefix(tokenType: TokenType, parseFunction: PrefixParseFunction) {
    this.prefixParseFunctions[tokenType] = parseFunction
  }

  private registerInfix(tokenType: TokenType, parseFunction: InfixParseFunction) {
    this.infixParseFunctions[tokenType] = parseFunction
  }

  /**
   * Method to parse the input program.
   *
   * @returns Program parsed from the input
   */
  parseProgram(): Program {
    const program = new Program([])

    while (this.currentToken.tokenType !== TokenType.EOF) {
      const statement = this.parseStatement()
      program.statements.push(statement)
      this.nextToken()
    }

    return program
  }

  private parseStatement(): Statement {
    switch (this.currentToken.tokenType) {
      case TokenType.LET: {
        return this.parseLetStatement()
      }

      case TokenType.RETURN: {
        return this.parseReturnStatement()
      }

      default: {
        return this.parseExpressionStatement()
      }
    }
  }

  private parseLetStatement(): LetStatement {
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

  private parseReturnStatement(): ReturnStatement {
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

  private parseExpressionStatement(): ExpressionStatement {
    const statement = new ExpressionStatement(this.currentToken, this.parseExpression(Operator.LOWEST))

    // @TODO: Check if we need to consume the peekToken using nextToken()
    // as we are doing it in the expectPeek() method
    this.expectPeek(TokenType.SEMICOLON)
    // if (this.expectPeek(TokenType.SEMICOLON)) {
    //   this.nextToken()
    // }

    return statement
  }

  private parseExpression(precendence: Operator): Expression {
    const prefix = this.prefixParseFunctions[this.currentToken.tokenType]
    if (!prefix) {
      throw new Error(`No prefix parse function for ${this.currentToken.tokenType}`)
    }
    return prefix()
  }

  private parseIdentifier(): Identifier {
    return new Identifier(this.currentToken, this.currentToken.literal)
  }

  private parseIntegerLiteral(): IntegerLiteral {
    const value = parseInt(this.currentToken.literal)
    if (isNaN(value)) {
      throw new Error(`Invalid integer literal: ${this.currentToken.literal}`)
    }
    return new IntegerLiteral(this.currentToken, value)
  }

  private nextToken() {
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
}
