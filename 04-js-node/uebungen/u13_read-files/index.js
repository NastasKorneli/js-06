import fs from 'node:fs'; // Modul aus der Standardbib

const getFileContent = (path, encoding = 'utf-8') => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, encoding, (error, data) => {
      if (error) {
        reject(error);
      }

      resolve(data);
    });
  });
};

Promise.all([
  getFileContent('files/file01.txt'),
  getFileContent('files/file02.txt'),
  getFileContent('files/file03.txt'),
  getFileContent('files/file04.txt'),
  getFileContent('files/file05.txt'),
  getFileContent('files/file06.txt'),
])
  .then((data) => console.log(data))
  .catch((err) => console.log(new Error(`Something went wrong: ${err}`)));
// .catch((err) => console.error(`Something went wrong: ${err}`));

// Übung 13: Sechs Dateien einlesen

// Erstelle die Dateien file01.txt … file06.txt und lies sie, wie soeben beschrieben, mit getFileContent(…) aus Codebeispiel 117 ein.

// Was passiert, wenn eine Datei fehlt? Überprüfe die Fehlerbehandlung. Erweitere die Fehlermeldung so, dass ausgegeben wird, welche Dateien nicht gelesen werden konnten!
