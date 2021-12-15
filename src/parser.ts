import { Token } from './token'
import { Lexer } from './lexer'
import { Program } from './ast'

export class Parser {
  private currentToken: Token
  private peekToken: Token

  constructor(private readonly lexer: Lexer) {
    this.currentToken = this.lexer.nextToken()
    this.peekToken = this.lexer.nextToken()
  }

  nextToken() {
    this.currentToken = this.peekToken
    this.peekToken = this.lexer.nextToken()
  }

  parseProgram(): Program {
    throw new Error('Method not implemented.')
  }
}
