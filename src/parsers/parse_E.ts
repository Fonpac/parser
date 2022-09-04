import { Lexer, ParserReturn } from "../Lexer.js";
import { parse_T, parse_E_prime } from  "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const T = parse_T(lexer)
    const E_prime = parse_E_prime(lexer)
    
    return E_prime == null ? T : (T as number) + (E_prime as number);
}