import { Schema, SchemaTypes as Types, model } from 'mongoose';

const productSchema = new Schema(
  {
    code: {
      type: Types.String,
      required: [true, 'Code ist erforderlich'],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[a-zA-Z0-9]+$/.test(v); // Erlaubt nur alphanumerische Zeichen
        },
        message: (props) => `${props.value} ist kein gültiger Code!`,
      },
    },
    shortDescription: {
      type: Types.String,
      required: [true, 'Kurzbeschreibung ist erforderlich'],
    },
    tagline: {
      type: Types.String,
      required: [true, 'Tagline ist erforderlich'],
    },
    quantity: {
      type: Types.Number,
      required: [true, 'Menge ist erforderlich'],
      validate: {
        validator: function (v) {
          return v > 0; // Muss eine positive Zahl sein
        },
        message: (props) => `${props.value} ist keine gültige Menge!`,
      },
    },
    price: {
      type: Types.Number,
      required: [true, 'Preis ist erforderlich'],
      validate: {
        validator: function (v) {
          return v > 0; // Muss eine positive Zahl sein
        },
        message: (props) => `${props.value} ist kein gültiger Preis!`,
      },
    },
    stockWarn: {
      type: Types.Boolean,
      required: [true, 'Lagerwarnung ist erforderlich'],
    },
  },
  {
    timestamps: true, // Fügt createdAt und updatedAt Zeitstempel hinzu
  }
);

export default model('Product', productSchema);
