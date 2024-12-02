import { Schema, SchemaTypes as Types, model } from 'mongoose';

// Es wird ein Schema (Bausplan) mit dem passenden Datentypen definiert
const TodoSchema = new Schema(
  {
    text: {
      type: Types.String,
      required: true,
      trim: true,
      validate: {
        validator: (value) => {
          const regex = new RegExp(/[^#_<>]{2,500}/);
          return value.length >= 2 && regex.test(value);
        },
        message: (props) => `${props.value} ist kein gültiger Text`,
      },
    },
    category: {
      type: Types.ObjectId,
      ref: 'TodoCategory',
      required: false,
    },
    done: {
      type: Types.Boolean,
      required: true,
    },
    important: {
      type: Types.Boolean,
      required: true,
    },
    reminder: {
      type: Types.Boolean,
      required: true,
    },
    dueUntil: {
      type: Types.Date,
      default: Date.now,
    },
    repeatMode: {
      daily: {
        type: Types.Boolean,
        required: false,
        trim: true,
      },
      weekly: {
        type: Types.Boolean,
        required: false,
        trim: true,
      },
      monthly: {
        type: Types.Boolean,
        required: false,
        trim: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model('Todo', TodoSchema);
