import { Identifier, LetStatement, Program } from './ast'
import { Token, TokenType } from './token'

describe('ast', () => {
  it('returns toString() correctly', () => {
    const program = new Program([
      new LetStatement(
        new Token(TokenType.LET, 'let'),
        new Identifier(new Token(TokenType.IDENT, 'myVar'), 'myVar'),
        new Identifier(new Token(TokenType.IDENT, 'anotherVar'), 'anotherVar'),
      ),
    ])
    expect(program.toString()).toBe('let myVar = anotherVar;')
  })
})
