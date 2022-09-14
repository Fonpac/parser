import { Lexer } from "../Lexer.js";
import { LexerEnum, ParserReturn } from "../Utils.js";
import { parse_E } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const lexerResult = lexer.next()

    if (lexerResult) {
        const [token, value] = lexerResult

        if (token == LexerEnum.OPEN_PAR) {
            const E = parse_E(lexer)

            const lexerResult = lexer.next()
            if (lexerResult && lexerResult[0] != LexerEnum.CLOSE_PAR) {
                lexer.error("Unbalanced parenthesis.")
            }

            return E
        }

        if(token === LexerEnum.FUNC){
            const E = parse_E(lexer)

            const lexerResult = lexer.next()
            if (lexerResult && lexerResult[0] != LexerEnum.CLOSE_PAR) {
                lexer.error("Unbalanced parenthesis.")
            }

            return E
        }

        if (token == LexerEnum.NUM) {
            if (isNaN(+value)) {
                return value
            }

            return +value
        }

        throw `Unexpected token: ${value}.`
    }

    throw `Unexpected end of source.`
}