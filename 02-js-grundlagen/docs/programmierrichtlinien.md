# Programmierrichtlinien (https://github.com/airbnb/javascript)

- Schreibe immer genau eine Anweisung in genau eine Zeile.
- Setze beim Beenden einer Anweisung das Semikolon. (eslint: semi)
- Verwende im Normalfall einfache Anführungszeichen zur Begrenzung von Strings. (eslint: single)
- Verwende Klammern, um Zweifel über die Auswertungsreihenfolge von Ausdrücken auszuräumen oder wenn du der Meinung bist, dass der Code dadurch lesbarer sein könnte.
- Schreibe Konstanten, die der Konfiguration dienen, komplett in Großbuchstaben und verwende den Underscore \_ zur Worttrennung. (SCREAMING_SNAKE_CASE- Schreibweise)
- Deklariere Konstanten, die der Konfiguration dienen, am Anfang deines Codes.

## if - Verzweigung

- Nach dem Schlüsselwort if oder else folgt genau ein Leerzeichen.
- Die öffnende geschweifte Klammer { des Rumpfes befindet sich in der gleichen Zeile wie das Schlüsselwort.
- Nach der öffnenden Klammer des Rumpfes folgt ein Zeilenumbruch.
- Die Anweisungen innerhalb des Rumpfes werden jeweils um 2 Leerzeichen eingerückt.
- Die schließende geschweifte Klammer } des Rumpfes befindet sich auf einer eigenen Zeile und ist linksbündig zum ersten Schlüsselwort.
- **Ausnahme:** Enthält der Rumpf nur eine einzige Anweisung, so dürfen die Zeilenumbrüche und die geschweiften Klammern entfallen.

## Funktionen

- Zwischen dem Bezeichner und der öffnenden runden Klammer darf kein Leerzeichen stehen.
- Nach jedem Komma nach einem Argument muss ein Leerzeichen folgen.

## Funktionsdefinition:

- Zwischen den runden Klammern und dem Pfeil sowie zwischen dem Pfeil und der öffnenden geschweiften Klammer steht genau ein Leerzeichen.
- Anweisungen innerhalb der Funktion sind um 2 Leerzeichen eingerückt.
- Die schließende geschweifte Klammer steht in einer neuen Zeile.
- Nach jedem Komma nach einem Parameter muss ein Leerzeichen folgen.

## Funktionsbezeichner

- Funktionsbezeichner sind Verben bzw. beginnen mit einem Verb. Bevorzuge den Imperativ!
- Funktionsbezeichner beginnen mit einem Kleinbuchstaben (a bis z) lower-Camel-Case-Schreibweise
