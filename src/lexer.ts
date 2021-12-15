import { Token, TokenType } from './token'
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
  private get peekChar(): string {
    return this.input[this.readPosition]
  }

  private skipWhitespace() {
    // consume the next character if it is a whitespace
    while (isWhiteSpace(this.peekChar)) {
      this.readChar()
    }
  }

  private readIdentifier() {
    const position = this.position
    while (isLetter(this.peekChar)) {
      this.readChar()
    }
    // position + 1 is meant to splice the string till that position
    return this.input.slice(position, this.position + 1)
  }

  private readNumber() {
    const position = this.position
    while (isDigit(this.peekChar)) {
      this.readChar()
    }
    // position + 1 is meant to splice the string till that position
    return this.input.slice(position, this.position + 1)
  }

  private getIdentifierToken(): Token {
    const literal = this.readIdentifier()
    switch (literal) {
      case 'let': {
        return new Token(TokenType.LET, literal)
      }

      case 'fn': {
        return new Token(TokenType.FUNCTION, literal)
      }

      case 'true': {
        return new Token(TokenType.TRUE, literal)
      }

      case 'false': {
        return new Token(TokenType.FALSE, literal)
      }

      case 'if': {
        return new Token(TokenType.IF, literal)
      }

      case 'else': {
        return new Token(TokenType.ELSE, literal)
      }

      case 'return': {
        return new Token(TokenType.RETURN, literal)
      }

      default: {
        return new Token(TokenType.IDENT, literal)
      }
    }
  }

  private getNumberToken(): Token {
    const literal = this.readNumber()
    return new Token(TokenType.INT, literal)
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
        if (this.peekChar === '=') {
          this.readChar()
          return new Token(TokenType.EQ, '==')
        }
        return new Token(TokenType.ASSIGN, this.char)
      }

      case '+': {
        return new Token(TokenType.PLUS, this.char)
      }

      case '-': {
        return new Token(TokenType.MINUS, this.char)
      }

      case '!': {
        if (this.peekChar === '=') {
          this.readChar()
          return new Token(TokenType.NOT_EQ, '!=')
        }
        return new Token(TokenType.BANG, this.char)
      }

      case '*': {
        return new Token(TokenType.ASTERISK, this.char)
      }

      case '/': {
        return new Token(TokenType.SLASH, this.char)
      }

      case '<': {
        if (this.peekChar === '=') {
          this.readChar()
          return new Token(TokenType.LT_EQ, '<=')
        }
        return new Token(TokenType.LT, this.char)
      }

      case '>': {
        if (this.peekChar === '=') {
          this.readChar()
          return new Token(TokenType.GT_EQ, '>=')
        }
        return new Token(TokenType.GT, this.char)
      }

      case '(': {
        return new Token(TokenType.LPAREN, this.char)
      }

      case ')': {
        return new Token(TokenType.RPAREN, this.char)
      }

      case '{': {
        return new Token(TokenType.LBRACE, this.char)
      }

      case '}': {
        return new Token(TokenType.RBRACE, this.char)
      }

      case ',': {
        return new Token(TokenType.COMMA, this.char)
      }

      case ';': {
        return new Token(TokenType.SEMICOLON, this.char)
      }

      case null: {
        return new Token(TokenType.EOF, '')
      }

      default: {
        if (isLetter(this.char)) {
          return this.getIdentifierToken()
        }

        if (isDigit(this.char)) {
          return this.getNumberToken()
        }

        return new Token(TokenType.ILLEGAL, this.char)
      }
    }
  }
}
