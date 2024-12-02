import { Schema, model } from 'mongoose';
import slugify from 'slugify';

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      default() {
        return slugify(this.name.toLowerCase());
      },
    },
  },
  { timestamps: true }
);

CategorySchema.pre('findOneAndUpdate', async function (next) {
  this._update.slug = slugify(this._update.name.toLowerCase());
  next();
});

// module.exports = mongoose.model("Category", CategorySchema);
export default model('Category', CategorySchema);
