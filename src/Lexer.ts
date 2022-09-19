import { LexerEnum, numRe, reservedWordRe, SymbolMap, symbolTable, whiteSpaces, wordRegex } from "./Utils.js"


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

      if (currentChar === '=') {
        return [LexerEnum.OPERATOR, currentChar];
      }

      // Checando por simbolos como  "(, ), +, /, *, ^"
      if (SymbolMap[currentChar]) {
        return [SymbolMap[currentChar], currentChar]
      }

      let sliced = this.expression.slice(this.current - 1)

      // Se não for número pode ser palavra reservada
      const matchReserved = sliced?.slice()?.match(reservedWordRe)!
      if (matchReserved) {
        this.current += matchReserved[0].length - 1;
        return [LexerEnum.FUNC, matchReserved[0]]
      }

      // var prob
      const matchWord = sliced?.slice()?.match(wordRegex)!
      if (matchWord && Boolean(matchWord[0].length)) {
        this.current += matchWord[0].length - 1;
        return [LexerEnum.VAR, matchWord[0]]
      }

      // Checando se o currentChar é um número
      const matchNum = sliced.slice().match(numRe)!
      // Checando se o currentChar não for um número ele é um operador de "-"
      if (!matchNum || (currentChar === '-' && !proxChar.match(numRe))) {
        if (currentChar == '-') {
          return [LexerEnum.OPERATOR, currentChar]
        }

        this.error()
      }

      // Setando o current do lexer pra ser o final do currentChar
      this.current += matchNum[0].length - 1

      // Retornando o currentChar
      return [LexerEnum.NUM, matchNum[0].replace(" ", "")]
    }
    return null
  }
}
