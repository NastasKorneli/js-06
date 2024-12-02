//import mongoose from 'mongoose';
import { Schema, SchemaTypes as Types, model } from 'mongoose';

// const { Types} = Schema;

// Es wird wird ein Schema (Bauplan) mit den passenden Datentypen definiert
const userSchema = new Schema({
  firstName: Types.String,
  lastName: Types.String,
});

export default model('User', userSchema);

/*
Schema ist ein Bauplan der Datenbank. Es wird verwendet, um den Datentyp des Feldes zu definieren und einige Einschränkungen für die Daten festzulegen.

Ein Modell ist eine Klasse, mit der wir Dokumente erstellen. In Mongoose ist jedes Dokument eine Instanz seines Modells.
*/
