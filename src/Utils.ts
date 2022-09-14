export type ParserReturn = number | string | null | void;

export enum LexerEnum {
    OPEN_PAR = 1,
    CLOSE_PAR = 2,
    OPERATOR = 3,
    FUNC = 4,
    NUM = 5
}

export const whiteSpaces = [" ", "\t", "\n", "\r"]
export const operators = ["+", "/", "*", "^"]

export const SymbolMap: Record<string, LexerEnum> = {
    ...operators.reduce((obj, op,) => ({ ...obj, [op]: LexerEnum.OPERATOR }), {}),
    ")": LexerEnum.CLOSE_PAR,
    "(": LexerEnum.OPEN_PAR
}

export const numRe = RegExp(/[+-]?(\d+(\.\d*)?|\.\d+)(e\d+)?/g);
export const reservedWords = ['sin', 'cos', 'log', 'sqrt']
export const reservedWordRe = RegExp(/^(sin|cos|log|sqrt)/gmi);

export const reservedWordMap: Record<string, Function> = {
    'sin': (num: number) => Math.sin(num),
    'cos': (num: number) => Math.cos(num),
    'log': (num: number) => Math.log(num),
    'sqrt': (num: number) => Math.sqrt(num),
}