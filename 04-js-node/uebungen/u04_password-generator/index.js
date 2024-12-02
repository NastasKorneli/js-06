const crypto = require('crypto');

const PASSWORD_LENGTH = 10;
const s = '23456789abcdefghjkmnpqrstuvwxyzABCDEFGHJKMNPQRSTUVWXYZ!.,;#$%/+*';

const buf = crypto.randomBytes(PASSWORD_LENGTH);

console.log(buf);

const bufferArray = Array.from(buf);

console.log(bufferArray); // random 10 stelliges Array mit Werten von 0-255  []
console.log(s.length); // => 64

const password = bufferArray.map((byte) => s.charAt(byte % s.length)).join('');

console.log(password);

// Übung 4: Passwortgenerator
// Was macht der Code?

// Der Titel verrät es schon. Versuche dennoch, das Programm zu verstehen! Benutze die Dokumentation der Standardbibliothek, um nachzuschlagen, was crypto.randomBytes(…) genau macht!

// Bonusfrage: Warum sind in den Zeichen «1», «i» und «l» nicht enthalten, genau so wenig wie «0» und «o»?
