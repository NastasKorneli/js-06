import moment from 'moment';

const date = moment().format('DD.MM.YY');
const nextSaturday = moment().day('Monday').format('DD.MM.YYYY');

console.log(moment.months());

console.log(date); // => 20.11.24
console.log(nextSaturday); // => 23.11.2024

// reines JS
// Date Object - https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date

const myDate = new Date();
console.log(myDate); // => 2024-11-20T10:41:56.779Z - https://en.wikipedia.org/wiki/ISO_8601

console.log(myDate.getMonth()); //=> 0 - 11 -> 10 für November
console.log(myDate.getFullYear()); //=> 2024

// Übung 9: Warten auf das Wochenende

// In dieser Übung soll ein Programm geschrieben werden, das die Frage »Welches Datum hat der kommende Samstag?« beantwortet.

// Mit dem moment-Modul kann das Datum leicht ermittelt werden. Der folgende Aufruf gibt das Datum als String in der Form Tag.Monat.Jahr zurück:

// Installiere das moment-Modul mit npm und schreib ein kurzes Programm, dass das gesuchte Datum ausgibt! Vergiss die entsprechende require(…)-Anweisung nicht, um das Modul einzubinden.
