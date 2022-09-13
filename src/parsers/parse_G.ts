import { Lexer } from "../Lexer.js";
import { ParserReturn } from "../Utils.js";
import { parse_H, parse_G_prime } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const H = parse_H(lexer)
    const G_prime = parse_G_prime(lexer)

    return G_prime == null ? H : Math.pow(H as number, G_prime as number);
}