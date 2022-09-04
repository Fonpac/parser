import { Lexer, LexerEnum, ParserReturn } from "../Lexer.js"
import { parse_T, parse_E_prime } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    console.log("PARSE E PRIME")
    const lexerResult = lexer.next();
    if (lexerResult) {
        const [token, operator] = lexerResult
    
        if (token == LexerEnum.OPERATOR) {
            if (!["+", "-"].includes(operator)) {
                lexer.error(`Unexpected token: '${operator}'.`)
            }
    
            const T = parse_T(lexer)
    
            // Não precisamos do resultado só da recursão
            const E_prime = parse_E_prime(lexer)
    
            return operator == "+" ? T : -1 * (T as number);
        }

        lexer.putBack()
        return null
    }
}