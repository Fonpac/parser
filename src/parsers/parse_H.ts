import { Lexer } from "../Lexer.js";
import { ParserReturn, reservedWordMap } from "../Utils.js";
import { parse_F, parse_H_prime } from "./index.js"

export default (lexer: Lexer): ParserReturn => {
    const F = parse_F(lexer)
    const H_prime = parse_H_prime(lexer)

    return H_prime == null ? F : H_prime;
}