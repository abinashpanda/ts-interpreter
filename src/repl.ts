import * as readline from 'readline'
import { stdin as input, stdout as output } from 'process'
import chalk from 'chalk'
import { Lexer } from './lexer'
import { Token, TokenType } from './types/token'

function question(rl: readline.Interface, question: string): Promise<string> {
  return new Promise((resolve) => rl.question(question, resolve))
}

function getTokens(command: string): Token[] {
  const lexer = new Lexer(command)

  const tokens: Token[] = []

  let token = lexer.nextToken()
  while (token.tokenType !== TokenType.EOF) {
    tokens.push(token)
    token = lexer.nextToken()
  }

  return tokens
}

async function main() {
  const rl = readline.createInterface({ input, output })
  // eslint-disable-next-line no-console
  console.log(chalk.green('Welcome to the Monkey REPL!'))
  while (true) {
    const command = await question(rl, '>> ')
    const tokens = getTokens(command)
    // eslint-disable-next-line no-console
    console.log(tokens)
  }
}

main()
