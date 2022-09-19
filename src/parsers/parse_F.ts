import { Lexer } from "../Lexer.js";
import { LexerEnum, ParserReturn, reservedWordMap, symbolTable } from "../Utils.js";
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

        if (token === LexerEnum.FUNC) {
            const E = parse_E(lexer)

            return reservedWordMap[value](E);
        }

        // xxx = 10
        if (token === LexerEnum.VAR) {
            const lexerResult = lexer.next()
            if (lexerResult && lexerResult[1] === '=') {
                const E = parse_E(lexer)
                symbolTable[value] = E as number;
                return null
            } else {
                lexer.putBack();
                return symbolTable[value];
            }
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