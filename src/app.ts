import { Lexer } from "./Lexer.js"
import { parse_E } from './parsers/index.js'

const parse = (expression: string) => {
  const lexer = new Lexer(expression)

  return parse_E(lexer)
}

const init = () => {
  const expressions = [
    "2 ^ 2",
    "5 ^ (1+1)",
    "1 + 1",
    "2 * 3",
    "5 / 4",
    "2 * 3 + 1",
    "1 + 2 * 3",
    "(2 * 3) + 1",
    "2 * (3 + 1)",
    "(2 + 1) * 3",
    "-2 + 3",
    "5 + (-2)",
    "5 * -2",
    "-1 - -2",
    "-1 - 2",
    "4 - 5",
    "3 - ((8 + 3) * -2)",
    "2.01e2 - 200",
    "sin(45)",
    "sin(cos(log(10)))",
    "cos(45)",
    "log(45)",
    "sqrt(45)"
  ]

  for (let expression of expressions) {
    console.log(`Expression: ${expression}\t Result: ${parse(expression)}`)
  }
}

init()
