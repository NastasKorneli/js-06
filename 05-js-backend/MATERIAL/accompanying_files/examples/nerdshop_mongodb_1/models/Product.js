import { Schema, SchemaTypes as Types, model } from 'mongoose';

const productSchema = new Schema(
  {
    code: {
      type: Types.String,
      required: true,
    },
    shortDescription: {
      type: Types.String,
      required: true,
    },
    tagline: {
      type: Types.String,
      required: true,
    },
    quantity: {
      type: Types.Number,
      required: true,
    },
    price: {
      type: Types.Number,
      required: true,
    },
    stockWarn: {
      type: Types.Boolean,
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

const Product = model('Product', productSchema);

export default Product;
