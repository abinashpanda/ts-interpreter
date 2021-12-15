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

export class Identifier implements Expression {
  constructor(private readonly token: Token, private readonly identifierValue: string) {}

  public tokenLiteral(): string {
    return this.token.literal
  }

  public get value() {
    return this.identifierValue
  }
}

export class LetStatement implements Statement {
  constructor(
    private readonly token: Token,
    private readonly nameIdentifier: Identifier,
    private readonly valueExpression: Expression,
  ) {}

  public tokenLiteral(): string {
    return this.token.literal
  }

  public get name() {
    return this.nameIdentifier
  }

  public get value() {
    return this.valueExpression
  }
}

export class ReturnStatement implements Statement {
  constructor(private readonly token: Token, private readonly returnValueExpression: Expression) {}

  public tokenLiteral(): string {
    return this.token.literal
  }

  public get returnValue() {
    return this.returnValueExpression
  }
}

export class Program {
  constructor(private readonly programStatements: Statement[]) {}

  public tokenLiteral(): string {
    if (this.programStatements.length > 0) {
      return this.programStatements[0].tokenLiteral()
    }
    return ''
  }

  public get statements() {
    return this.programStatements
  }
}
