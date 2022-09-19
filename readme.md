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
# T = GT'
# T' = * GT' | / GT' | &
# G = HG'
# G' = ^ HG' | &
# H = FH'
# H' = H' | &
# F = ( E ) | num | func(E) | Id
# num = [+-]?([0-9]+(.[0-9]+)?|.[0-9]+)(e[0-9]+)+)?)
```