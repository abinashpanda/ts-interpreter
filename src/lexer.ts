import { Token, TokenType } from 'types/token'

export class Lexer {
  constructor(
    private readonly input: string,
    private position: number = 0,
    private readPosition: number = 0,
    private char: string | null = null,
  ) {}

  private readChar() {
    if (this.readPosition >= this.input.length) {
      return null
    }
    this.char = this.input[this.readPosition]
    this.position = this.readPosition
    this.readPosition += 1
  }

  *nextToken(): Generator<Token> {
    this.readChar()

    let nextToken: Token
    switch (this.char) {
      case '=': {
        nextToken = { tokenType: TokenType.ASSIGN, literal: this.char }
        break
      }

      case '+': {
        nextToken = { tokenType: TokenType.PLUS, literal: this.char }
        break
      }

      case '(': {
        nextToken = { tokenType: TokenType.LPAREN, literal: this.char }
        break
      }

      case ')': {
        nextToken = { tokenType: TokenType.RPAREN, literal: this.char }
        break
      }

      case '{': {
        nextToken = { tokenType: TokenType.LBRACE, literal: this.char }
        break
      }

      case '}': {
        nextToken = { tokenType: TokenType.RBRACE, literal: this.char }
        break
      }

      case ',': {
        nextToken = { tokenType: TokenType.COMMA, literal: this.char }
        break
      }

      case ';': {
        nextToken = { tokenType: TokenType.SEMICOLON, literal: this.char }
        break
      }

      case null: {
        nextToken = { tokenType: TokenType.EOF, literal: '' }
        break
      }

      default: {
        throw new Error(`unrecognized character: ${this.char}`)
      }
    }

    yield nextToken

    this.readChar()
  }
}
