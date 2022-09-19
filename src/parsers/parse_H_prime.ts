import { Lexer } from "../Lexer.js";
import { LexerEnum, ParserReturn, reservedWords, reservedWordMap } from "../Utils.js";
import { parse_F, parse_H_prime } from "./index.js";

export default (lexer: Lexer): ParserReturn => {
    const lexerResult = lexer.next();
    if (lexerResult) {
        lexer.putBack()
        return null;
    }
    return null;
}