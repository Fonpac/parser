import { Lexer } from "../Lexer.js"
import { LexerEnum, ParserReturn } from "../Utils.js";
import { parse_H, parse_G_prime, } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const lexerResult = lexer.next();
    if (lexerResult) {
        const [token, operator] = lexerResult

        const isOperator = (token == LexerEnum.OPERATOR && ["^"].includes(operator))
        if (isOperator) {
            const H = parse_H(lexer)

            // Só precisamos fazer a recursão
            const G_prime = parse_G_prime(lexer)

            return H;
        }

        lexer.putBack()
        return null;
    }
    return null;
}