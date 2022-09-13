import { Lexer } from "../Lexer.js";
import { LexerEnum, ParserReturn, reservedWords } from "../Utils.js";
import { parse_H, parse_H_prime } from "./index.js";

export default (lexer: Lexer): ParserReturn => {
    const lexerResult = lexer.next();
    if (lexerResult) {
        const [token, reservedWord] = lexerResult
        const isReserved = (token == LexerEnum.OPERATOR && reservedWords.includes(reservedWord))
        if (isReserved) {
            const H = parse_H(lexer, reservedWord)

            // Só precisamos fazer a recursão
            const H_prime = parse_H_prime(lexer)

            return H;
        }

        lexer.putBack()
        return null;
    }
    return null;
}