import { Lexer, ParserReturn } from "../Lexer.js";
import { parse_F, parse_G_prime } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const F = parse_F(lexer)
    const G_prime = parse_G_prime(lexer)

    return G_prime == null ? F : Math.pow(F as number, G_prime as number);
}