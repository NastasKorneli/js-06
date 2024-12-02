# Escape–Notation (Backslash Maskierung)

Neben gewöhnlichen, druckbaren Zeichen gibt es Sonderzeichen, die mittels [Escape-Notation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Regular_expressions/Character_escapeg) kodiert werden können:

| Code                 | Ausgabe                           |
| -------------------- | --------------------------------- |
| `\0`                 | das NULL-Zeichen                  |
| `\'`                 | einfaches Anführungszeichen       |
| `\"`                 | doppeltes Anführungszeichen       |
| `\\`                 | Rückwärtsschrägstrich (backslash) |
| `\n`                 | Zeilenumbruch (new line)          |
| `\r`                 | Zeilenanfang (carriage return)    |
| `\v`                 | vertikaler Tabulator              |
| `\t`                 | Tabulator                         |
| `\b`                 | Backspace                         |
| `\f`                 | Seitenvorschub (form feed)        |
| `\uXXXX`             | Unicode-Codepoint                 |
| `\u{X}`…`\u{XXXXXX}` | Unicode-Codepoint                 |
| `\xXX`               | Latin-1-Zeichen                   |
