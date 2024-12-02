//const mongoose = require("mongoose");
//const ProjectShema = new mongoose.Schema();

// https://mongoosejs.com/docs/schematypes.html

import { Schema, model } from 'mongoose';

const { Types } = Schema;

const ProjectSchema = new Schema(
  {
    title: {
      type: Types.String,
      required: true,
    },
    description: {
      type: Types.String,
      required: true,
    },
    photo: {
      type: Types.String,
      required: false,
    },
    username: {
      type: Types.String,
      required: true,
    },
    categories: [
      {
        type: Types.ObjectId,
        ref: 'Category',
        required: true,
      },
    ],
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Project", ProjectSchema);
export default model('Project', ProjectSchema);
