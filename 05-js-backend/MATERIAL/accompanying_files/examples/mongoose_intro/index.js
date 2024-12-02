// https://mongoosejs.com/docs/

import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import User from './models/User.schema.js';

dotenv.config();

// Verbindung zu MongoDB Server erstellen
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connect to MongoDB');
  })
  .catch((error) => {
    console.log('Es gab einen Fehler bei der Verbindung zu MongoDB: ', error);
  });

// (async () => {
//   try {
//     await mongoose.connect(process.env.MONGODB_URI, {
//       dbName: 'gfn_test',
//     });
//     console.log('Conntect to MongoDB');
//   } catch (error) {
//     console.log('Es gab einen Fehler bei der Verbindung zu MongoDB: ', error);
//   }
// })();

// Methode 1:
// MODEL.create()
// Einen User erstellen
const createUser = async () => {
  try {
    await User.create({
      firstName: 'Max',
      lastName: 'Mustermann',
    });
    console.log('User created');
  } catch (error) {
    console.log('Failed to create User:', error);
  } finally {
    mongoose.disconnect(); // Verbindung beenden
  }
};

// Methode 2:
// const obj = new MODEL() - neue Instanz erstellen
// obj.save()
// Einen User erstellen
const createUser2 = async () => {
  const user = new User({
    firstName: 'Max',
    lastName: 'Mustermann',
  });

  try {
    await user.save();
    console.log('User created');
  } catch (error) {
    console.log('Failed to create User:', error);
  } finally {
    mongoose.disconnect(); // Verbindung beenden
  }
};

// Funktionsaufrufe
// createUser();
// createUser2();

/*
Mongoose: https://mongoosejs.com/

Mongoose: Elegante Art und Weise Objektmodellierung für MongoDB zu implementieren

Mongoose bietet eine unkomplizierte, schema-basierte Lösung zur Modellierung der Anwendungsdaten, indem sie die Interaktion mit der MongoDB-Datenbank vereinfacht und strukturiert. 

Es ermöglicht Entwicklern, MongoDB-Schemata zu definieren, Modelle zu erstellen und Datenbankoperationen wie Speichern, Abfragen und Aktualisieren von Dokumenten einfach durchzuführen.

===== INSTALLATION =====
Mongoose Installation (wir brauchen KEIN "npm install mongodb" mehr mit Mongoose)

npm install mongoose

====== Um Environment Variables zu nutzen ======
npm install dotenv
*/
