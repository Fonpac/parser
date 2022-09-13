import { LexerEnum, numRe, reservedWordRe, SymbolMap, whiteSpaces } from "./Utils.js"


export class Lexer {
  public expression: string
  public current: number
  public previous: number

  constructor(expression: string) {
    this.expression = expression
    this.current = 0
    this.previous = -1
  }

  error(message?: string) {
    let errorMessage = `Error at ${this.current}: \n${this.expression.slice(
      this.current - 1,
      this.current + 10
    )}`

    if (!message) {
      errorMessage = `${message}\n${errorMessage}`
    }

    throw errorMessage
  }

  putBack() {
    this.current = this.previous
  }

  next(): [LexerEnum, string] | null {
    // Caso esteja no final da expressão
    if (this.current < this.expression.length) {
      // Pulando espaços em branco
      while (whiteSpaces.includes(this.expression[this.current])) {
        this.current++
      }

      // Setando a iteração e o currentChar
      this.previous = this.current
      const currentChar = this.expression[this.current]
      const proxChar = this.expression[this.current + 1] ?? null;
      this.current++

      // Checando por simbolos como  "(, ), +, /, *, ^"
      if (SymbolMap[currentChar]) {
        return [SymbolMap[currentChar], currentChar]
      }

      let sliced = this.expression.slice(this.current - 1)

      // Checando se o currentChar é um número
      const [matchNum] = sliced.slice().match(numRe)!
      // Checando se o currentChar não for um número ele é um operador de "-"
      if (!matchNum || (currentChar === '-' && !proxChar.match(numRe))) {
        if (currentChar == '-') {
          return [LexerEnum.OPERATOR, currentChar]
        }

        this.error()
      }

      // Se não for número pode ser palavra reservada
      if (!matchNum) {
        const [matchReserved] = sliced.slice().match(reservedWordRe)!
        if (matchReserved) {
          console.log([LexerEnum.OPERATOR, matchReserved])
          return [LexerEnum.OPERATOR, matchReserved]
        }
      }

      // Setando o current do lexer pra ser o final do currentChar
      this.current += matchNum.length - 1

      // Retornando o currentChar
      return [LexerEnum.NUM, matchNum.replace(" ", "")]
    }
    return null
  }
}
