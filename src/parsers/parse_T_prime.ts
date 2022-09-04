import { Lexer, LexerEnum, ParserReturn, operators } from "../Lexer.js"
import { parse_F, parse_T_prime } from  "./index.js"

export default (lexer: Lexer): ParserReturn => {
    console.log("PARSE T PRIME", lexer.expression)
    const lexerResult = lexer.next();
    if (lexerResult) {
        const [token, operator] = lexerResult
    
        console.log(token, operator)
        const isMultiplicationOrDivision = token == LexerEnum.OPERATOR && ["*", "/"].includes(operator)
        if (isMultiplicationOrDivision) {
            const F = parse_F(lexer)
    
            // Só precisamos fazer a recursão
            const T_prime = parse_T_prime(lexer)
    
            return operator === "*" ? F : 1 / (F as number)
        }
    
        lexer.putBack()
        return null;
    }
    return null;
}