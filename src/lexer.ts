import { Token, TokenType } from 'types/token'
import { isDigit, isLetter, isWhiteSpace } from 'utils'

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
  *nextToken(): Generator<Token> {
    this.skipWhitespace()
    this.readChar()

    while (this.char !== null) {
      switch (this.char) {
        case '=': {
          if (this.peekChar() === '=') {
            this.readChar()
            yield {
              tokenType: TokenType.EQ,
              literal: '==',
            }
            break
          }
          yield { tokenType: TokenType.ASSIGN, literal: this.char }
          break
        }

        case '+': {
          yield { tokenType: TokenType.PLUS, literal: this.char }
          break
        }

        case '-': {
          yield { tokenType: TokenType.MINUS, literal: this.char }
          break
        }

        case '!': {
          if (this.peekChar() === '=') {
            this.readChar()
            yield {
              tokenType: TokenType.NOT_EQ,
              literal: '!=',
            }
            break
          }
          yield { tokenType: TokenType.BANG, literal: this.char }
          break
        }

        case '*': {
          yield { tokenType: TokenType.ASTERISK, literal: this.char }
          break
        }

        case '/': {
          yield { tokenType: TokenType.SLASH, literal: this.char }
          break
        }

        case '<': {
          if (this.peekChar() === '=') {
            this.readChar()
            yield {
              tokenType: TokenType.LT_EQ,
              literal: '<=',
            }
            break
          }
          yield { tokenType: TokenType.LT, literal: this.char }
          break
        }

        case '>': {
          if (this.peekChar() === '=') {
            this.readChar()
            yield {
              tokenType: TokenType.GT_EQ,
              literal: '>=',
            }
            break
          }
          yield { tokenType: TokenType.GT, literal: this.char }
          break
        }

        case '(': {
          yield { tokenType: TokenType.LPAREN, literal: this.char }
          break
        }

        case ')': {
          yield { tokenType: TokenType.RPAREN, literal: this.char }
          break
        }

        case '{': {
          yield { tokenType: TokenType.LBRACE, literal: this.char }
          break
        }

        case '}': {
          yield { tokenType: TokenType.RBRACE, literal: this.char }
          break
        }

        case ',': {
          yield { tokenType: TokenType.COMMA, literal: this.char }
          break
        }

        case ';': {
          yield { tokenType: TokenType.SEMICOLON, literal: this.char }
          break
        }

        default: {
          if (isLetter(this.char)) {
            yield this.getIdentifierToken()
            break
          }

          if (isDigit(this.char)) {
            yield this.getNumberToken()
            break
          }

          yield { tokenType: TokenType.ILLEGAL, literal: this.char }
        }
      }

      this.skipWhitespace()
      this.readChar()
    }

    yield { tokenType: TokenType.EOF, literal: '' }
  }
}
