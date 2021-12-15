import { Lexer } from './lexer'
import { Token, TokenType } from './token'

describe('lexer', () => {
  it('returns next token correctly for single characters', () => {
    const lexer = new Lexer('=+(){},;')

    const output: Token[] = [
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.PLUS, '+'),
      new Token(TokenType.LPAREN, '('),
      new Token(TokenType.RPAREN, ')'),
      new Token(TokenType.LBRACE, '{'),
      new Token(TokenType.RBRACE, '}'),
      new Token(TokenType.COMMA, ','),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.EOF, ''),
    ]

    let nextToken = lexer.nextToken()
    let count = 0
    while (nextToken.tokenType !== TokenType.EOF) {
      expect(nextToken.tokenType).not.toBe(TokenType.ILLEGAL)
      expect(nextToken).toEqual(output[count])
      nextToken = lexer.nextToken()
      count += 1
    }
    expect(nextToken.tokenType).toBe(TokenType.EOF)
  })

  it('returns tokens correctly for simple source code', () => {
    const lexer = new Lexer(`let five = 5;
    let ten = 10;
    let add = fn(x, y) {
      x + y;
    };
    let result = add(five, ten);
    `)

    const output: Token[] = [
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'five'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.INT, '5'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'ten'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'add'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.FUNCTION, 'fn'),
      new Token(TokenType.LPAREN, '('),
      new Token(TokenType.IDENT, 'x'),
      new Token(TokenType.COMMA, ','),
      new Token(TokenType.IDENT, 'y'),
      new Token(TokenType.RPAREN, ')'),
      new Token(TokenType.LBRACE, '{'),
      new Token(TokenType.IDENT, 'x'),
      new Token(TokenType.PLUS, '+'),
      new Token(TokenType.IDENT, 'y'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.RBRACE, '}'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'result'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.IDENT, 'add'),
      new Token(TokenType.LPAREN, '('),
      new Token(TokenType.IDENT, 'five'),
      new Token(TokenType.COMMA, ','),
      new Token(TokenType.IDENT, 'ten'),
      new Token(TokenType.RPAREN, ')'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.EOF, ''),
    ]

    let nextToken = lexer.nextToken()
    let count = 0
    while (nextToken.tokenType !== TokenType.EOF) {
      expect(nextToken.tokenType).not.toBe(TokenType.ILLEGAL)
      expect(nextToken).toEqual(output[count])
      nextToken = lexer.nextToken()
      count += 1
    }
    expect(nextToken.tokenType).toBe(TokenType.EOF)
  })

  it('returns tokens correctly for source code with multiple operators', () => {
    const lexer = new Lexer(`let five = 5;
    let ten = 10;
    let add = fn(x, y) {
      x + y;
    };
    let result = add(five, ten);
    !-/*5;
    5 < 10 > 5;

    if (5 < 10) {
      return true;
    } else {
      return false;
    }

    10 == 10;
    10 != 9;
    1 <= 2;
    2 >= 1;
    `)

    const output: Token[] = [
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'five'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.INT, '5'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'ten'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'add'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.FUNCTION, 'fn'),
      new Token(TokenType.LPAREN, '('),
      new Token(TokenType.IDENT, 'x'),
      new Token(TokenType.COMMA, ','),
      new Token(TokenType.IDENT, 'y'),
      new Token(TokenType.RPAREN, ')'),
      new Token(TokenType.LBRACE, '{'),
      new Token(TokenType.IDENT, 'x'),
      new Token(TokenType.PLUS, '+'),
      new Token(TokenType.IDENT, 'y'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.RBRACE, '}'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.LET, 'let'),
      new Token(TokenType.IDENT, 'result'),
      new Token(TokenType.ASSIGN, '='),
      new Token(TokenType.IDENT, 'add'),
      new Token(TokenType.LPAREN, '('),
      new Token(TokenType.IDENT, 'five'),
      new Token(TokenType.COMMA, ','),
      new Token(TokenType.IDENT, 'ten'),
      new Token(TokenType.RPAREN, ')'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.BANG, '!'),
      new Token(TokenType.MINUS, '-'),
      new Token(TokenType.SLASH, '/'),
      new Token(TokenType.ASTERISK, '*'),
      new Token(TokenType.INT, '5'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.INT, '5'),
      new Token(TokenType.LT, '<'),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.GT, '>'),
      new Token(TokenType.INT, '5'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.IF, 'if'),
      new Token(TokenType.LPAREN, '('),
      new Token(TokenType.INT, '5'),
      new Token(TokenType.LT, '<'),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.RPAREN, ')'),
      new Token(TokenType.LBRACE, '{'),
      new Token(TokenType.RETURN, 'return'),
      new Token(TokenType.TRUE, 'true'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.RBRACE, '}'),
      new Token(TokenType.ELSE, 'else'),
      new Token(TokenType.LBRACE, '{'),
      new Token(TokenType.RETURN, 'return'),
      new Token(TokenType.FALSE, 'false'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.RBRACE, '}'),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.EQ, '=='),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.INT, '10'),
      new Token(TokenType.NOT_EQ, '!='),
      new Token(TokenType.INT, '9'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.INT, '1'),
      new Token(TokenType.LT_EQ, '<='),
      new Token(TokenType.INT, '2'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.INT, '2'),
      new Token(TokenType.GT_EQ, '>='),
      new Token(TokenType.INT, '1'),
      new Token(TokenType.SEMICOLON, ';'),
      new Token(TokenType.EOF, ''),
    ]

    let nextToken = lexer.nextToken()
    let count = 0
    while (nextToken.tokenType !== TokenType.EOF) {
      expect(nextToken.tokenType).not.toBe(TokenType.ILLEGAL)
      expect(nextToken).toEqual(output[count])
      nextToken = lexer.nextToken()
      count += 1
    }
    expect(nextToken.tokenType).toBe(TokenType.EOF)
  })
})
