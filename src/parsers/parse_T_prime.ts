import { Lexer } from "../Lexer.js"
import { LexerEnum, ParserReturn } from "../Utils.js";
import { parse_F, parse_G, parse_T_prime } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const lexerResult = lexer.next();
    if (lexerResult) {
        const [token, operator] = lexerResult

        const isMultiplicationOrDivision = token == LexerEnum.OPERATOR && ["*", "/"].includes(operator)
        if (isMultiplicationOrDivision) {
            const G = parse_G(lexer)

            // Só precisamos fazer a recursão
            const T_prime = parse_T_prime(lexer)

            return operator === "*" ? G : 1 / (G as number)
        }

        lexer.putBack()
        return null;
    }
    return null;
}