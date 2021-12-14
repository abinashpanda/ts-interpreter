/**
 * Helper function to check if the input string is a valid letter or not.
 * underscore is also considered as a valid letter at it can be used for variable naming
 */
export function isLetter(input: string): boolean {
  // include underscore
  return /[a-zA-Z_]/.test(input)
}

export function isWhiteSpace(input: string): boolean {
  return input === ' ' || input === '\t' || input === '\n' || input === '\r'
}

export function isDigit(input: string): boolean {
  return /[0-9]/.test(input)
}
