import dns from 'node:dns';
import util from 'node:util';

// const IP_V = 4; // we use IP protocol version 4
const URL = 'de.webmasters-europe.org';

// const lookup = util.promisify(dns.lookup);

function lookup(url, ipVersion = 4) {
  return dns.promises.lookup(url, ipVersion);
}

// function lookup(url, ipVersion = 4) {
//   return new Promise((resolve, reject) => {
//     dns.lookup(url, ipVersion, (error, address) => {
//       if (error) {
//         reject(error);
//       } else {
//         resolve({ address, family: ipVersion });
//       }
//     });
//   });
// }

lookup(URL)
  .then((data) => console.log(`IP address`, data))
  .catch((error) => console.log('error: could not lookup host: ', error));

// Übung 14: Das Telefonbuch des Internets
// Vielleicht hast du einmal die Webseite www.nodejs.com besucht? Dann hat dein Computer die so genannte IP-Adresse des Servers www.nodejs.com herausgefunden.

// Ähnlich wie ein Telefonbuch ordnet das Domain Name System (DNS) jedem Server (Host) eine eindeutige IP-Adresse zu, unter der er über das Internet erreichbar ist.

// Die Node.js-API bietet eine Funktion, um Namen im DNS nachzuschlagen: dns.lookup(…).

// So geht's:

// const dns = require('dns')
// const IP_V = 4 // we use IP protocol version 4
// const URL = 'de.webmasters-europe.org';
// ​
// dns.lookup(URL, IP_V, (error, address) => {
//   if (error) {
//     console.log('error: could not lookup host');
//   } else {
//     console.log('IP address = ' + address);
//   }
// });
// ​
// Codebeispiel 123

// Wenn du dieses Programm ausführst (der Rechner muss dazu mit dem Internet verbunden sein), erhältst du die Ausgabe:

// IP address = 104.20.23.46
// Codebeispiel 124

// Am Callback erkennst du, dass dns.lookup(…) genau wie fs.readFile(…) eine asynchrone Funktion ist. Das ist auch gut so, schließlich könnte eine Suche im DNS je nach Internetverbindung länger dauern oder fehlschlagen.

// Die Übung besteht nun darin, obiges Beispiel so umzuschreiben, dass der Aufruf von dns.lookup(…) in eine Wrapper-Funkion verpackt wird.

// Es sollen 3 verschiedene Lösungen erstellt werden:

// 1. Ausführliche Variante mit eigenem Promise-Objekt als Ummantelung

// 2. Kurze Variante mit Promises-Unterobjekt (dns.promises)

// 3. Promisify-Variante mit util.promisify(…)
