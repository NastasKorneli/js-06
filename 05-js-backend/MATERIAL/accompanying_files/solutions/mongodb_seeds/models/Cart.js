//const mongoose = require("mongoose");
//const ProjectShema = new mongoose.Schema();

// https://mongoosejs.com/docs/schematypes.html

import { Schema, model } from 'mongoose';

const CartSchema = new Schema(
  {
    userId: {
      type: String,
      required: true
    },
    products: [
      {
        productId: {
          type: String
        },
        quantity: {
          type: Number,
          default: 1
        }
      }
    ]
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Cart", CartSchema);
export default model('Cart', CartSchema);
