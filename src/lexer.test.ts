import { Lexer } from './lexer'
import { Token, TokenType } from 'types/token'

describe('lexer', () => {
  it('returns next token correctly', () => {
    const lexer = new Lexer('=+(){},;')

    const output: Token[] = [
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.PLUS, literal: '+' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.LBRACE, literal: '{' },
      { tokenType: TokenType.RBRACE, literal: '}' },
      { tokenType: TokenType.COMMA, literal: ',' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.EOF, literal: '' },
    ]

    const token = lexer.nextToken()
    const count = 0
    while (token.next()) {}
  })
})
