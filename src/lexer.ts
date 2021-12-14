import { Token, TokenType } from './types/token'
import { isDigit, isLetter, isWhiteSpace } from './utils'

export class Lexer {
  constructor(
    private readonly input: string,
    private position: number = 0,
    private readPosition: number = 0,
    private char: string | null = null,
  ) {}

  private readChar() {
    if (this.readPosition >= this.input.length) {
      this.char = null
      return
    }

    this.char = this.input[this.readPosition]
    this.position = this.readPosition
    this.readPosition += 1
  }

  /**
   * @returns the next character without consuming it
   */
  private peekChar(): string {
    return this.input[this.readPosition]
  }

  private skipWhitespace() {
    // consume the next character if it is a whitespace
    while (isWhiteSpace(this.peekChar())) {
      this.readChar()
    }
  }

  private readIdentifier() {
    const position = this.position
    while (isLetter(this.peekChar())) {
      this.readChar()
    }
    // position + 1 is meant to splice the string till that position
    return this.input.slice(position, this.position + 1)
  }

  private readNumber() {
    const position = this.position
    while (isDigit(this.peekChar())) {
      this.readChar()
    }
    // position + 1 is meant to splice the string till that position
    return this.input.slice(position, this.position + 1)
  }

  private getIdentifierToken(): Token {
    const literal = this.readIdentifier()
    switch (literal) {
      case 'let': {
        return { tokenType: TokenType.LET, literal }
      }

      case 'fn': {
        return { tokenType: TokenType.FUNCTION, literal }
      }

      case 'true': {
        return { tokenType: TokenType.TRUE, literal }
      }

      case 'false': {
        return { tokenType: TokenType.FALSE, literal }
      }

      case 'if': {
        return { tokenType: TokenType.IF, literal }
      }

      case 'else': {
        return { tokenType: TokenType.ELSE, literal }
      }

      case 'return': {
        return { tokenType: TokenType.RETURN, literal }
      }

      default: {
        return { tokenType: TokenType.IDENT, literal }
      }
    }
  }

  private getNumberToken(): Token {
    const literal = this.readNumber()
    return { tokenType: TokenType.INT, literal }
  }

  /**
   * Returns a generator containing the next token. The generator ends when
   * it encounters the end of the input.
   */
  nextToken(): Token {
    this.skipWhitespace()
    this.readChar()

    switch (this.char) {
      case '=': {
        if (this.peekChar() === '=') {
          this.readChar()
          return {
            tokenType: TokenType.EQ,
            literal: '==',
          }
        }
        return { tokenType: TokenType.ASSIGN, literal: this.char }
      }

      case '+': {
        return { tokenType: TokenType.PLUS, literal: this.char }
      }

      case '-': {
        return { tokenType: TokenType.MINUS, literal: this.char }
      }

      case '!': {
        if (this.peekChar() === '=') {
          this.readChar()
          return {
            tokenType: TokenType.NOT_EQ,
            literal: '!=',
          }
        }
        return { tokenType: TokenType.BANG, literal: this.char }
      }

      case '*': {
        return { tokenType: TokenType.ASTERISK, literal: this.char }
      }

      case '/': {
        return { tokenType: TokenType.SLASH, literal: this.char }
      }

      case '<': {
        if (this.peekChar() === '=') {
          this.readChar()
          return {
            tokenType: TokenType.LT_EQ,
            literal: '<=',
          }
        }
        return { tokenType: TokenType.LT, literal: this.char }
      }

      case '>': {
        if (this.peekChar() === '=') {
          this.readChar()
          return {
            tokenType: TokenType.GT_EQ,
            literal: '>=',
          }
        }
        return { tokenType: TokenType.GT, literal: this.char }
      }

      case '(': {
        return { tokenType: TokenType.LPAREN, literal: this.char }
      }

      case ')': {
        return { tokenType: TokenType.RPAREN, literal: this.char }
      }

      case '{': {
        return { tokenType: TokenType.LBRACE, literal: this.char }
      }

      case '}': {
        return { tokenType: TokenType.RBRACE, literal: this.char }
      }

      case ',': {
        return { tokenType: TokenType.COMMA, literal: this.char }
      }

      case ';': {
        return { tokenType: TokenType.SEMICOLON, literal: this.char }
      }

      case null: {
        return { tokenType: TokenType.EOF, literal: '' }
      }

      default: {
        if (isLetter(this.char)) {
          return this.getIdentifierToken()
        }

        if (isDigit(this.char)) {
          return this.getNumberToken()
        }

        return { tokenType: TokenType.ILLEGAL, literal: this.char }
      }
    }
  }
}
