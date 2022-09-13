import { Lexer } from "../Lexer.js";
import { ParserReturn } from "../Utils.js";
import { parse_G, parse_T_prime } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const G = parse_G(lexer)
    const T_prime = parse_T_prime(lexer)

    return T_prime == null ? G : (G as number) * (T_prime as number);
}