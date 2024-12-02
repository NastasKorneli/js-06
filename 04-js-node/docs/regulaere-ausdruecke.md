# Reguläre Ausdrücke

## Links

- <https://emailregex.com/>
- <https://regexr.com/>
- <https://regex101.com/>
- <https://www.mediaevent.de/javascript/Javascript-Regulaere-Ausdruecke-1.html>
- <https://www.mediaevent.de/javascript/Javascript-Regulaere-Ausdruecke-2.html>

| Zeichen |  Basiszeichen                                  |
| ------- | ---------------------------------------------- |
| `\w`    | Buchstabe, Ziffer oder Unterstrich             |
| `\W`    | Ein Sonderzeichen                              |
| `\d`    | Eine Ziffer zwischen 0 bis 9                   |
| `\D`    | Ein Zeichen, das keine Ziffer ist              |
| `\s`    | Ein Weißraum (Leerzeichen, Zeilenumbruch usw.) |
| `\S`    | Jedes Zeichen außer Weißraum                   |
| `\b`    | Wortgrenze                                     |
| `\B`    | keine Wortgrenze                               |

| Zeichen | Metazeichen                          |
| ------- | ------------------------------------ |
| `.`     | findet alle Zeichen außer Zeilenende |
| `^`     | Anfang eines Strings                 |
| `$`     | Ende eines Strings                   |
| &vert;  | Alternativen                         |
| `()`    | Teile des Suchmusters abgrenzen      |
| `[]`    | Zeichenklassen                       |
| `{}`    | Replikatoren                         |

| Zeichen       | Zeichenklassen                     |
| ------------- | ---------------------------------- |
| `[xyz]`       | beliebiger Buchstabe x, y oder z   |
| `[^xyz]`      | jeder Buchstabe außer x, y oder z  |
| `[0-9]`       | jede Ziffer zwischen 0 bis 9       |
| `[a-z]`       | jeder kleine Buchstabe von a bis z |
| `[A-Za-z0-9]` | alle Buchstaben und Ziffern        |
| `[a-zß-ü]`    | alle Kleinbuchstaben und Umlaute   |

| Zeichen | Replikatoren                         |
| ------- | ------------------------------------ |
| `{n,m}` | mindestens n mal, höchstens m mal    |
| `{n,}`  | mindestens n mal                     |
| `{n}`   | genau n mal                          |
| `*`     | 0 mal oder öfter, äquivalent zu {0,} |
| `+`     | 1 mal oder öfter, äquivalent zu {1,} |
| `?`     | 0 oder 1 mal, äquivalent zu {0,1}    |
