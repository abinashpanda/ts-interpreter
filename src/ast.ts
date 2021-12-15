import { Token } from './token'

export interface Node {
  tokenLiteral(): string
}

export class Statement implements Node {
  public tokenLiteral(): string {
    throw new Error('Method not implemented.')
  }
}

export class Expression implements Node {
  public tokenLiteral(): string {
    throw new Error('Method not implemented.')
  }
}

class Identifier implements Expression {
  constructor(private readonly token: Token, public value: string) {}

  public tokenLiteral(): string {
    return this.token.literal
  }
}

export class LetStatement implements Statement {
  constructor(private readonly token: Token, public name: Identifier, public value: Expression) {}

  public tokenLiteral(): string {
    return this.token.literal
  }
}

export class Program {
  constructor(public statements: Statement[]) {}

  public tokenLiteral(): string {
    if (this.statements.length > 0) {
      return this.statements[0].tokenLiteral()
    }
    return ''
  }
}
