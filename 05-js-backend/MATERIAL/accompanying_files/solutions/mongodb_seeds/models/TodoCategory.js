import { Schema, model, SchemaTypes as Types } from 'mongoose';
import slugify from 'slugify';

const TodoCategorySchema = new Schema(
  {
    name: {
      type: Types.String, // Home Office
      required: true,
      trim: true,
      validator: (value) => {
        const regex = new RegExp(/^[a-zA-Zß-ü0-9]{2,50}$/);
        return value.length >= 2 && regex.test(value);
      },
    },
    slug: {
      type: Types.String, // home-office
      default() {
        return slugify(this.name.toLowerCase());
      },
    },
  },
  { timestamps: true }
);

TodoCategorySchema.pre('findOneAndUpdate', async function (next) {
  this._update.slug = slugify(this._update.name.toLowerCase());
  next();
});

export default model('TodoCategory', TodoCategorySchema);
