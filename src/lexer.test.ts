import { Lexer } from './lexer'
import { Token, TokenType } from 'types/token'

describe('lexer', () => {
  it('returns next token correctly for single characters', () => {
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

    const nextToken = lexer.nextToken()
    let count = 0
    for (const token of nextToken) {
      expect(token.tokenType).not.toBe(TokenType.ILLEGAL)
      expect(token).toEqual(output[count])
      count += 1
    }
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
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'five' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.INT, literal: '5' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'ten' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'add' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.FUNCTION, literal: 'fn' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.IDENT, literal: 'x' },
      { tokenType: TokenType.COMMA, literal: ',' },
      { tokenType: TokenType.IDENT, literal: 'y' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.LBRACE, literal: '{' },
      { tokenType: TokenType.IDENT, literal: 'x' },
      { tokenType: TokenType.PLUS, literal: '+' },
      { tokenType: TokenType.IDENT, literal: 'y' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.RBRACE, literal: '}' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'result' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.IDENT, literal: 'add' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.IDENT, literal: 'five' },
      { tokenType: TokenType.COMMA, literal: ',' },
      { tokenType: TokenType.IDENT, literal: 'ten' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.EOF, literal: '' },
    ]

    const nextToken = lexer.nextToken()
    let count = 0
    for (const token of nextToken) {
      expect(token.tokenType).not.toBe(TokenType.ILLEGAL)
      expect(token).toEqual(output[count])
      count += 1
    }
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
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'five' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.INT, literal: '5' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'ten' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'add' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.FUNCTION, literal: 'fn' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.IDENT, literal: 'x' },
      { tokenType: TokenType.COMMA, literal: ',' },
      { tokenType: TokenType.IDENT, literal: 'y' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.LBRACE, literal: '{' },
      { tokenType: TokenType.IDENT, literal: 'x' },
      { tokenType: TokenType.PLUS, literal: '+' },
      { tokenType: TokenType.IDENT, literal: 'y' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.RBRACE, literal: '}' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.LET, literal: 'let' },
      { tokenType: TokenType.IDENT, literal: 'result' },
      { tokenType: TokenType.ASSIGN, literal: '=' },
      { tokenType: TokenType.IDENT, literal: 'add' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.IDENT, literal: 'five' },
      { tokenType: TokenType.COMMA, literal: ',' },
      { tokenType: TokenType.IDENT, literal: 'ten' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.BANG, literal: '!' },
      { tokenType: TokenType.MINUS, literal: '-' },
      { tokenType: TokenType.SLASH, literal: '/' },
      { tokenType: TokenType.ASTERISK, literal: '*' },
      { tokenType: TokenType.INT, literal: '5' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.INT, literal: '5' },
      { tokenType: TokenType.LT, literal: '<' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.GT, literal: '>' },
      { tokenType: TokenType.INT, literal: '5' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.IF, literal: 'if' },
      { tokenType: TokenType.LPAREN, literal: '(' },
      { tokenType: TokenType.INT, literal: '5' },
      { tokenType: TokenType.LT, literal: '<' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.RPAREN, literal: ')' },
      { tokenType: TokenType.LBRACE, literal: '{' },
      { tokenType: TokenType.RETURN, literal: 'return' },
      { tokenType: TokenType.TRUE, literal: 'true' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.RBRACE, literal: '}' },
      { tokenType: TokenType.ELSE, literal: 'else' },
      { tokenType: TokenType.LBRACE, literal: '{' },
      { tokenType: TokenType.RETURN, literal: 'return' },
      { tokenType: TokenType.FALSE, literal: 'false' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.RBRACE, literal: '}' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.EQ, literal: '==' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.INT, literal: '10' },
      { tokenType: TokenType.NOT_EQ, literal: '!=' },
      { tokenType: TokenType.INT, literal: '9' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.INT, literal: '1' },
      { tokenType: TokenType.LT_EQ, literal: '<=' },
      { tokenType: TokenType.INT, literal: '2' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.INT, literal: '2' },
      { tokenType: TokenType.GT_EQ, literal: '>=' },
      { tokenType: TokenType.INT, literal: '1' },
      { tokenType: TokenType.SEMICOLON, literal: ';' },
      { tokenType: TokenType.EOF, literal: '' },
    ]

    const nextToken = lexer.nextToken()
    let count = 0
    for (const token of nextToken) {
      expect(token.tokenType).not.toBe(TokenType.ILLEGAL)
      expect(token).toEqual(output[count])
      count += 1
    }
  })
})
