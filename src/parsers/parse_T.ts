import { Lexer, ParserReturn } from "../Lexer.js";
import { parse_F, parse_T_prime } from  "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const F = parse_F(lexer)
    const T_prime = parse_T_prime(lexer)

    return T_prime == null ? F : (F as number) * (T_prime as number);
}