# Parser

## Build Setup
```bash
# install dependencies
npm install
```

## Development
```bash
# run
npm run dev
```

## Definition

```
# Language definition:
#
# E = TE'
# E' = +TE' | - TE' | &
# T = FT'
# T' = * FT' | / FT' | &
# F = ( E ) | num
# num = [+-]?([0-9]+(.[0-9]+)?|.[0-9]+)(e[0-9]+)+)?)
```