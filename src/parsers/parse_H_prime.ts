import { Lexer } from "../Lexer.js";
import { LexerEnum, ParserReturn, reservedWords, reservedWordMap } from "../Utils.js";
import { parse_F, parse_H_prime } from "./index.js";

export default (lexer: Lexer): ParserReturn => {
    const lexerResult = lexer.next();
    if (lexerResult) {
        const [token, reservedWord] = lexerResult
        const isReserved = (token == LexerEnum.FUNC && reservedWords.includes(reservedWord))
        if (isReserved) {
            const F = parse_F(lexer)

            // Só precisamos fazer a recursão
            const H_prime = parse_H_prime(lexer)

            return reservedWordMap[reservedWord](F);
        }

        lexer.putBack()
        return null;
    }
    return null;
}