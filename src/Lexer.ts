export enum LexerEnum {
  OPEN_PAR = 1,
  CLOSE_PAR = 2,
  OPERATOR = 3,
  NUM = 4
}

export const whiteSpaces = [" ", "\t", "\n", "\r"]
export const operators = ["+", "/", "*", "^"]
export type ParserReturn = number | string | null | void;

const SymbolMap: Record<string, LexerEnum> = {
  ...operators.reduce((obj, op,) => ({...obj, [op]: LexerEnum.OPERATOR}), {}),
  ")": LexerEnum.CLOSE_PAR,
  "(": LexerEnum.OPEN_PAR
}

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
        while(whiteSpaces.includes(this.expression[this.current])) {
          this.current++
        }
        
        // Setando a iteração e o currentChar
        this.previous = this.current
        const currentChar = this.expression[this.current]
        const proxChar = this.expression[this.current + 1] ?? null;
        this.current++
  
        // Checando por simbolos como  "(, ), +, /, *"
        if (SymbolMap[currentChar]) {
          return [SymbolMap[currentChar], currentChar]
        }
  
        // Checando se o currentChar é um número
        const numRe = RegExp(/[+-]?(\d+(\.\d*)?|\.\d+)(e\d+)?/g);
        const [match] = this.expression.slice(this.current - 1).match(numRe)!

        // Checando se o currentChar não for um número ele é um operador de "-"
        if (!match|| (currentChar === '-' && !proxChar.match(numRe))) {
          if (currentChar == '-') {
            return [LexerEnum.OPERATOR, currentChar]
          }
    
          this.error()
        }
  
        // Setando o current do lexer pra ser o final do currentChar
        this.current += match.length - 1
  
        // Retornando o currentChar
        return [LexerEnum.NUM, match.replace(" ", "")]
      }
      return null
    }
}
