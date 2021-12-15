import { Token } from './token'

export interface Node {
  tokenLiteral(): string
  toString(): string
}

export class Statement implements Node {
  tokenLiteral(): string {
    throw new Error('Method not implemented.')
  }

  toString(): string {
    throw new Error('Method not implemented.')
  }
}

export class Expression implements Node {
  tokenLiteral(): string {
    throw new Error('Method not implemented.')
  }

  toString(): string {
    throw new Error('Method not implemented.')
  }
}

export class Identifier implements Expression {
  constructor(private readonly token: Token, private readonly identifierValue: string) {}

  tokenLiteral(): string {
    return this.token.literal
  }

  toString(): string {
    return this.identifierValue
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

  tokenLiteral(): string {
    return this.token.literal
  }

  toString(): string {
    return `${this.tokenLiteral()} ${this.nameIdentifier.value} = ${this.valueExpression.toString()};`
  }

  public get name() {
    return this.nameIdentifier
  }

  public get value() {
    return this.valueExpression
  }
}

export class ReturnStatement implements Statement {
  constructor(private readonly token: Token, private readonly valueExpression: Expression) {}

  tokenLiteral(): string {
    return this.token.literal
  }

  toString(): string {
    return `${this.tokenLiteral()} ${this.valueExpression.toString()};`
  }

  public get returnValue() {
    return this.valueExpression
  }
}

export class ExpressionStatement implements Statement {
  constructor(private readonly token: Token, private readonly expression: Expression) {}

  tokenLiteral(): string {
    return this.token.literal
  }

  toString(): string {
    return this.expression.toString()
  }
}

export class Program implements Node {
  constructor(private readonly programStatements: Statement[]) {}

  tokenLiteral(): string {
    if (this.programStatements.length > 0) {
      return this.programStatements[0].tokenLiteral()
    }
    return ''
  }

  toString(): string {
    return this.programStatements.map((statement) => statement.toString()).join('\n')
  }

  public get statements() {
    return this.programStatements
  }
}
